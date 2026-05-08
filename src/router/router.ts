import type { RouteRecordRaw } from 'vue-router'
export const constantRoute: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/LoginVue.vue'),
    name: 'login',
    meta: {
      title: '登录',
      hidden: true,
      icon: 'Promotion',
    },
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/layout/LayoutIndex.vue'),
    meta: {
      title: '',
      hidden: false,
      icon: '',
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/HomeVue.vue'),
      },
    ],
  },
]
