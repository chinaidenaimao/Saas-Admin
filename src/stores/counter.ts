import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { userInfoReponseData} from '@/apis/user/type'
import type { RouteRecordRaw } from 'vue-router'
import {constantRoute,asyncRoute,allRoute} from '@/router/router'
import router from '@/router'
import { deepclone } from '@/utils/deepclone'
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

export const useUserStore=defineStore('user',()=>{
  // 登录token
  const token=ref('')
  const user=ref<userInfoReponseData['data']>({
    routes: [],
    buttons: [],
    roles: [],
    name: '',
    avatar: '',
  })
  // 是否登录成功
  const isLogin=ref(false)
  // 菜单列表
  const menuList=ref(constantRoute)
  // 是否折叠菜单
  const isCollapse=ref(false)
  // 是否刷新
  const isRefresh=ref(false)
  // 过滤路由
  const filterRoute=(asyncRoutes:RouteRecordRaw[],roles:string[])=>{
    return asyncRoutes.filter(item=>{
      if(roles.includes(item.name as string)){
        if(item.children&&item.children.length>0){
          item.children=filterRoute(item.children,roles);
        }
        return true;
      }
      return false;
    })
  }
  // 路由鉴权
  const getRouter=()=>{
    const asyncrouters=filterRoute(deepclone(asyncRoute),user.value.routes);
    menuList.value=[...constantRoute,...asyncrouters,...allRoute];
    menuList.value.forEach(item=>{
      router.addRoute(item);
    })
  }
  return {token,user,menuList,isCollapse,isRefresh,filterRoute,getRouter,isLogin}
})
