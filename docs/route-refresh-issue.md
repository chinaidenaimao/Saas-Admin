# 刷新页面路由丢失问题分析

## 背景

项目采用「动态路由」模式：异步路由（`asyncRoute`，如 `/acl/user`、`/product/goods`）不在 router 创建时注册，而是登录后根据用户权限动态添加。

## 关键代码位置

| 文件 | 作用 |
|------|------|
| `src/router/index.ts` | 创建 router 实例，初始只注册 `constantRoute` |
| `src/router/router.ts` | 定义三套路由：`constantRoute`、`asyncRoute`、`allRoute` |
| `src/stores/counter.ts` | `useUserStore`，包含 `getRouter()`、`filterRoute()` |
| `src/permisstion.ts` | `beforeEach` 路由守卫，鉴权 + 触发路由加载 |

## 初始化时序

```
main.ts 执行顺序：

1. import router from './router'     → 创建 router，仅含 constantRoute
2. import '@/permisstion'            → 注册 beforeEach 守卫（副作用导入）
3. app.use(router)                   → 将 router 安装到 Vue 应用
4. app.mount('#app')                 → 挂载应用，触发首次导航
```

守卫在步骤 2 注册，首次导航在步骤 4 触发。守卫一定会在导航之前注册好。

---

## 为什么刷新后路由丢失

假设用户在 `/acl/user` 页面刷新浏览器。

### 第一步：Router 解析 URL

```
当前 URL: /acl/user
Router 路由表: [/login, /, /screen, /404]   ← 只有 constantRoute

解析结果: 无匹配 → to.matched = []
```

Vue Router 4 在导航触发时**立即解析**目标 URL，这一步发生在守卫执行**之前**。此时异步路由还没注册，`/acl/user` 匹配不到任何路由。

### 第二步：beforeEach 守卫触发

```typescript
// permisstion.ts
router.beforeEach(async (to, from, next) => {
  // to.matched = []   ← 此时已是空数组
  // to.name = undefined
  // to.path = '/acl/user'

  const token = localStorage.getItem('token')  // 有 token

  if (token) {
    if (to.name !== 'login') {        // undefined !== 'login' → true，进入
      const userInfo = await reqUserInfo()
      userStore.user = userInfo.data
      userStore.getRouter()           // ← 这里才把异步路由加进 router
      next()                          // ← 这里放行
    }
  }
})
```

`getRouter()` 内部做了这些事：

```typescript
const getRouter = () => {
  // 根据用户权限过滤异步路由
  const asyncrouters = filterRoute(deepclone(asyncRoute), user.value.routes)
  // 更新菜单列表（侧边栏渲染用）
  menuList.value = [...constantRoute, ...asyncrouters, ...allRoute]
  // 动态注册路由到 router 实例
  menuList.value.forEach(item => {
    router.addRoute(item)
  })
}
```

### 第三步：next() 放行——问题所在

```
next() 放行的是第一步已经解析好的导航
→ 那个导航的 matched = []
→ 路由虽已通过 addRoute 注册，但本次导航不会重新匹配
→ router-view 渲染空白
→ 侧边栏有菜单（menuList 更新了），但页面内容为空
```

### 核心矛盾

```
Router 解析 URL（匹配路由）
       ↓
   【此时路由表不完整】
       ↓
   守卫执行（添加路由）
       ↓
   next() 放行 —— 用的是上面已过时的解析结果
```

**路由添加了，但本次导航用不上。**

---

## 修复方案：检测无匹配后重试导航

```typescript
// permisstion.ts
userStore.getRouter()

// 关键：检查当前导航是否匹配到了路由
if (!to.matched.length) {
  // 未匹配 → 重试导航，让 Router 用新路由表重新解析
  next({ path: to.path, replace: true })
  return
}
next()
```

### 修复后的完整流程

```
刷新 /acl/user
  │
  ├─ 1. Router 解析 → matched = []（路由表不完整）
  ├─ 2. 守卫触发 → getRouter() 添加路由
  ├─ 3. to.matched.length === 0 → true
  ├─ 4. next({ path: '/acl/user', replace: true })
  │      → 触发新导航，Router 重新解析
  │
  ├─ 5. Router 解析 → matched = [acl 路由] ✓（路由表现在完整了）
  ├─ 6. 守卫再次触发
  ├─ 7. to.matched.length > 0 → next() 正常放行
  └─ 8. 页面正常渲染 ✓
```

`replace: true` 确保不会在浏览器历史记录里留下多余条目。

---

## 为什么最初的「isRoutesAdded」方案会死循环

最初尝试用一个标记位来判断是否需要重试：

```typescript
// stores/counter.ts（错误方案）
export const useUserStore = defineStore('user', () => {
  let isRoutesAdded = false   // ← 关键：let 声明的原始值

  const getRouter = () => {
    // ...添加路由...
    isRoutesAdded = true      // ← 更新闭包中的变量
  }

  return { isRoutesAdded, getRouter }  // ← 返回给 Pinia store
})
```

```typescript
// permisstion.ts（错误方案）
const wasAdded = !userStore.isRoutesAdded   // 期望：第一次为 true，之后为 false
userStore.getRouter()
if (wasAdded) {
  next({ ...to, replace: true })
  return
}
next()
```

### 为什么 `userStore.isRoutesAdded` 永远是 `false`

这是 JavaScript 的**值传递**机制和 Pinia setup store 的行为共同导致的：

```
defineStore('user', () => {
  let isRoutesAdded = false          // ① 声明变量，值为 false
  ...
  return { isRoutesAdded, ... }     // ② 返回的是一个「快照」
})
```

Pinia setup store 的返回值中：
- `ref` / `reactive` → Pinia 会保持其响应式引用，修改会同步到 store
- **原始值**（`string`、`number`、`boolean`）→ 按值传递，store 拿到的是**初始值的副本**

```
闭包内的 isRoutesAdded 变量:  false → true  （getRouter 修改的是这个）
                                  ↑
                                  │ 没有关联
                                  ↓
store 上的 isRoutesAdded 属性:  false → false → false ... （永远是初始值）
```

### 死循环过程

```
第一次导航：
  wasAdded = !userStore.isRoutesAdded  → !false → true
  getRouter() 执行，闭包内 isRoutesAdded → true（但 store 上仍是 false）
  触发重试 → next({ ...to, replace: true })

第二次导航（重试）：
  wasAdded = !userStore.isRoutesAdded  → !false → true  ← 又是 true！
  getRouter() 再次执行
  又触发重试 → 第三次导航

第三次、第四次... → 无限循环 ↺
```

每次读取 `userStore.isRoutesAdded` 都是 `false`，所以 `wasAdded` 永远是 `true`，每次都会重试。

### 如果非要用标记位

把 `let` 改成 `ref` 就能正常工作：

```typescript
const isRoutesAdded = ref(false)   // ref 是响应式的

const getRouter = () => {
  // ...
  isRoutesAdded.value = true       // .value 修改
}
```

因为 Pinia 会自动 unwrap ref，`userStore.isRoutesAdded` 读取的是 `ref.value`，能正确反映变化。

但用 `to.matched.length === 0` 更直接——不依赖额外状态，直接利用 Vue Router 自身的信号来判断是否需要重试。

---

## 总结

| 问题 | 原因 | 解决 |
|------|------|------|
| 刷新后路由丢失 | `next()` 放行的是路由添加前就已解析的导航（`matched=[]`），新路由没被用上 | 检测 `to.matched.length === 0`，重试导航 |
| 标记位方案死循环 | `let` 原始值在 Pinia store 里不响应式，标记永远不变 | 改用 `to.matched` 自身状态判断 |
