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

]
export const asyncRoute: RouteRecordRaw[] = [{
    path:'/Acl',
    name:'Acl',
    component: () => import('@/layout/LayoutIndex.vue'),
    meta: {
      title: '权限管理',
      hidden: false,
      icon: 'Lock',
    },
    children:[
      {
      path:'/Acl/user',
      name:'User',
      component: () => import('@/views/acl/UserVue.vue'),
      meta: {
        title: '用户管理',
        hidden: false,
        icon: 'User',
      },
    },
    {
      path:'/Acl/role',
      name:'Role',
      component: () => import('@/views/acl/RoleVue.vue'),
      meta: {
        title: '角色管理',
        hidden: false,
        icon: 'UserFilled',
      },

    },
    {
      path:'/Acl/role/permission',
      name:'Permission',
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
    path:'/Product',
    name:'Product',
    component: () => import('@/layout/LayoutIndex.vue'),
    meta: {
      title: '商品管理',
      hidden: false,
      icon: 'Goods',
    },
    children:[
      {
        path:'/Product/goods',
        name:'Trademark',
        component: () => import('@/views/product/GoodsVue.vue'),
        meta: {
          title: '品牌管理',
          hidden: false,
          icon: 'ShoppingCart',
        },
      },
      {
        path:'/Product/attr',
        name:'Attr',
        component: () => import('@/views/product/AttrVue.vue'),
        meta: {
          title: '商品属性',
          hidden: false,
          icon: 'ChromeFilled',
        },
      },
       {
        path:'/Product/spu',
        name:'Spu',
        component: () => import('@/views/product/SpuVue.vue'),
        meta: {
          title: '商品SPU',
          hidden: false,
          icon: 'Calendar',
        },
      },
       {
        path:'/Product/sku',
        name:'Sku',
        component: () => import('@/views/product/SkuVue.vue'),
        meta: {
          title: '商品SKU',
          hidden: false,
          icon: 'Orange',
        },
      }
    ]
  }]
export const allRoute : RouteRecordRaw[] = [{
    path:'/:pathMatch(.*)*',
    redirect:'/404',
    name:'notFound',
    meta:{
      hidden:true,
    }
  },
  ]
