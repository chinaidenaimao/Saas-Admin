import type { RouteRecordRaw } from 'vue-router'
// 常量路由
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
        meta: {
          title: '首页',
          hidden: false,
          icon: 'HomeFilled',
        },
      }
    ],
  },
  {
    path:"/screen",
    name:"screen",
    component: () => import('@/views/screen/ScreenVue.vue'),
    meta: {
      title: '数据大屏',
      hidden: false,
      icon: 'Monitor',
    },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404Vue.vue'),
    meta: {
      title: '404',
      hidden: true,
      icon: 'DocumentDelete',
    },
  },
  {
    path:'/:pathMatch(.*)*',
    redirect:'/404',
    name:'notFound',
    meta:{
      hidden:true,
    }
  },
  {
    path:'/acl',
    name:'acl',
    component: () => import('@/layout/LayoutIndex.vue'),
    meta: {
      title: '权限管理',
      hidden: false,
      icon: 'Lock',
    },
    children:[
      {
      path:'/acl/user',
      name:'user',
      component: () => import('@/views/acl/UserVue.vue'),
      meta: {
        title: '用户管理',
        hidden: false,
        icon: 'User',
      },
    },
    {
      path:'/acl/role',
      name:'role',
      component: () => import('@/views/acl/RoleVue.vue'),
      meta: {
        title: '角色管理',
        hidden: false,
        icon: 'UserFilled',
      },

    },
    {
      path:'/acl/role/permission',
      name:'permission',
      component: () => import('@/views/acl/RolePermissionVue.vue'),
      meta: {
        title: '菜单权限',
        hidden: false,
        icon: 'Monitor',
      },
    }
  ]
  },
  {
    path:'/product',
    name:'product',
    component: () => import('@/layout/LayoutIndex.vue'),
    meta: {
      title: '商品管理',
      hidden: false,
      icon: 'Goods',
    },
    children:[
      {
        path:'/product/goods',
        name:'goods',
        component: () => import('@/views/product/GoodsVue.vue'),
        meta: {
          title: '品牌管理',
          hidden: false,
          icon: 'ShoppingCart',
        },
      },
      {
        path:'/product/attr',
        name:'attr',
        component: () => import('@/views/product/AttrVue.vue'),
        meta: {
          title: '商品属性',
          hidden: false,
          icon: 'ChromeFilled',
        },
      },
       {
        path:'/product/spu',
        name:'spu',
        component: () => import('@/views/product/SpuVue.vue'),
        meta: {
          title: '商品SPU',
          hidden: false,
          icon: 'Calendar',
        },
      },
       {
        path:'/product/sku',
        name:'sku',
        component: () => import('@/views/product/SkuVue.vue'),
        meta: {
          title: '商品SKU',
          hidden: false,
          icon: 'Orange',
        },
      }
    ]
  }
]
