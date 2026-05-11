// 路由鉴权
import router from '@/router'
// 进度条业务
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 登录token
  const token = localStorage.getItem('token')
  // 登录后跳转首页
  nprogress.start()
  if (token) {
    if (to.name !== 'login') {
      next()
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
router.afterEach((to, from) => {
  // 隐藏进度条
  nprogress.done()
})
