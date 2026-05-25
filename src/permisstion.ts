// 路由鉴权
import router from '@/router'
// 进度条业务
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
nprogress.configure({
  showSpinner: false,
})
import { reqUserInfo, reqLogout } from '@/apis/user/index'
// 引入用户store模块
import pinia from '@/stores'
import { useUserStore } from '@/stores/counter'
// 获取用户信息
const userStore = useUserStore(pinia)
// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  // 登录token
  const token = localStorage.getItem('token')
  // 登录后跳转首页
  nprogress.start()
  if (token) {
    if (to.name !== 'login') {
      // 登录成功后，将用户信息存储到store中
      try{
        const userInfo=await reqUserInfo()
        userStore.user=userInfo.data
        // 登录成功后，获取用户路由
        userStore.getRouter()
        // 刷新页面后首次导航未匹配到路由，重试一次
        if (!to.matched.length) {
          next({ path: to.path, replace: true })
          return
        }
        next()
      }catch(err){
          console.log(err)
          // 登录失败后，跳转登录页
          await reqLogout()
          // 清空token
          localStorage.removeItem('token')
          // 清空用户信息
          userStore.user= {
            routes: [],
            buttons: [],
            roles: [],
            name: '',
            avatar: '',
        }
        next({ name: 'login' })
      }
    } else {
      next({ name: 'home' })
    }
  }
  else {
    if (to.name !== 'login') {
      {
        next({ name: 'login' })
      }
    } else if (to.name === 'login') {
      next()
    }
  }
})

// 全局后置守卫
router.afterEach(() => {
  // 隐藏进度条
  nprogress.done()
})
