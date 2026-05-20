# CLAUDE.md - 项目上下文

## 项目概述

这是一个基于 Vue 3 + TypeScript + Vite 的 SaaS 后台管理系统前端项目。使用 Element Plus 作为 UI 框架，Pinia 管理状态，Vue Router 管理路由，Axios 处理 HTTP 请求。

## 技术栈

- **框架**: Vue 3.5 (Composition API + `<script setup>`)
- **语言**: TypeScript 5.8
- **构建工具**: Vite 7.6
- **UI 库**: Element Plus 2.13 + @element-plus/icons-vue
- **状态管理**: Pinia 3.0
- **路由**: Vue Router 4.5
- **HTTP**: Axios 1.15 (封装在 `src/utils/https.ts`)
- **样式**: SCSS + Element Plus CSS 变量
- **Mock**: Mock.js 1.1
- **进度条**: NProgress

## 项目结构

```
src/
├── apis/                    # API 接口层
│   ├── user/                # 用户认证 API (登录/用户信息/退出)
│   │   ├── index.ts         # reqLogin, reqUserInfo, reqLogout
│   │   └── type.ts          # LoginRequest, ResponseData, loginResponseData, userInfoReponseData
│   └── acl/                 # 权限管理 API
│       ├── user/            # ACL 用户管理 (CRUD)
│       │   ├── index.ts     # getAclUserList, saveAclUser, updateAclUser, deleteAclUser, getAssignRoles, doAssignRoles
│       │   └── type.ts      # AclUser, aclUserListData, RoleData 等
│       └── meun/            # 菜单权限管理 (注意: 文件名 meun 是 typo, 应为 menu)
│           ├── index.ts     # getPermission, saveMenu, updateMenu, deleteMenu
│           └── type.ts      # permissionData, saveMenuData, updateMenuData
├── apis/product/            # 商品管理 API
│   ├── goods/               # 品牌管理 (Trademark)
│   │   ├── index.ts         # getListList, getListPage, saveTrademark, updateTrademark, deleteTrademark
│   │   └── type.ts          # TrademarkList, TrademarkListPage
│   └── category/            # 分类/属性管理
│       ├── index.ts         # getCategoryfirst/second/third, getAttrInfoList, saveAttrInfo, deleteAttrInfo
│       └── type.ts          # CategoryFormdata, Attr, AttrValue
├── components/              # 公共组件
│   ├── HeaderNav.vue        # 顶部导航栏
│   └── SideMenu.vue         # 侧边菜单
├── layout/                  # 布局组件
│   ├── LayoutIndex.vue      # 主布局 (侧边栏 + 顶栏 + 内容区)
│   └── MainVue.vue          # 内容区域 (router-view)
├── router/                  # 路由配置
│   ├── index.ts             # createRouter 实例
│   └── router.ts            # constantRoute 路由表定义
├── stores/                  # Pinia 状态管理
│   ├── index.ts             # createPinia 实例
│   └── counter.ts           # useCounterStore (demo), useUserStore (用户状态/菜单/折叠)
├── views/                   # 页面组件
│   ├── LoginVue.vue         # 登录页
│   ├── HomeVue.vue          # 首页
│   ├── 404Vue.vue           # 404 页
│   ├── screen/
│   │   └── ScreenVue.vue    # 数据大屏
│   ├── acl/                 # 权限管理页面
│   │   ├── UserVue.vue      # 用户管理
│   │   ├── RoleVue.vue      # 角色管理
│   │   └── RolePermissionVue.vue  # 菜单权限
│   └── product/             # 商品管理页面
│       ├── GoodsVue.vue     # 品牌管理
│       ├── AttrVue.vue      # 商品属性
│       ├── SpuVue.vue       # 商品 SPU
│       └── SkuVue.vue       # 商品 SKU
├── style/                   # 全局样式
│   ├── index.scss           # 入口样式
│   └── Variable.scss        # SCSS 变量 (全局自动引入)
├── types/                   # 全局类型声明
│   ├── index.ts             # re-export user types
│   ├── user.d.ts            # 用户相关类型声明
│   └── nprogress.d.ts       # NProgress 类型声明
├── utils/
│   └── https.ts             # Axios 封装 (拦截器、错误处理)
├── assets/images/           # 静态资源
├── main.ts                  # 应用入口
├── App.vue                  # 根组件
├── setting.ts               # 全局配置 (title)
├── permisstion.ts           # 路由鉴权守卫 (前置/后置)
└── env.d.ts                 # 环境变量类型声明
```

## 路由结构

```
/login              → 登录页
/home               → 首页 (Layout 内)
/screen             → 数据大屏
/acl                → 权限管理 (Layout 内)
  /acl/user         → 用户管理
  /acl/role         → 角色管理
  /acl/role/permission → 菜单权限
/product            → 商品管理 (Layout 内)
  /product/goods    → 品牌管理
  /product/attr     → 商品属性
  /product/spu      → 商品 SPU
  /product/sku      → 商品 SKU
/404                → 404 页
/:pathMatch(.*)*    → 重定向到 404
```

## 环境配置

| 变量 | development | production | test |
|------|-------------|------------|------|
| VITE_BASE_URL | /api | /prod-api | /test-api |
| VITE_API_URL | http://127.0.0.1:10086 | http://sph-api.atguigu.cn | http://sph-api.atguigu.cn |
| VITE_APP_TITLE | SaaS管理系统 | SaaS管理系统 | SaaS管理系统 |

开发环境 Vite proxy 会将 `/api` 代理到 `VITE_API_URL`。

## API 请求规范

- 所有 API 请求通过 `src/utils/https.ts` 封装的 Axios 实例
- Token 从 `localStorage.getItem('token')` 获取，通过请求头 `token` 传递
- 响应拦截器自动处理 code !== 200 的错误
- 每个 API 模块使用 `enum API` 定义接口路径
- 返回值使用 TypeScript 泛型 `Promise<ResponseData<T>>`

## Store (Pinia) 状态

- `useUserStore`: token, user (router/buttons/roles/name/avatar), menuList, isCollapse, isRefresh
- `useCounterStore`: 演示用 counter

## 路由鉴权 (permisstion.ts)

- 前置守卫: 检查 token，获取用户信息，无 token 跳转登录
- 后置守卫: NProgress 进度条结束
- 用户信息存储在 `userStore.user`

## 常用命令

```bash
pnpm dev          # 启动开发服务器 (自动打开浏览器)
pnpm build        # 类型检查 + 构建
pnpm build:prod   # 生产模式构建
pnpm build:test   # 测试模式构建
pnpm lint         # ESLint 修复
pnpm format       # Prettier 格式化
```

## 注意事项

- 菜单权限目录 `src/apis/acl/meun/` 文件名是 typo (应为 menu)
- SCSS 变量 `Variable.scss` 通过 vite.config 自动注入，无需手动引入
- API 模块的 `type.ts` 文件各自定义了 `ResponseData` 接口，未统一到 `src/types/`
- 路由守卫中 token 存储在 localStorage
