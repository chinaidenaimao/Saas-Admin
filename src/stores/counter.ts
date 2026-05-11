import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { userInfoReponseData} from '@/apis/user/type'
import {constantRoute} from '@/router/router'
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
    router: [],
    buttons: [],
    roles: [],
    name: '',
    avatar: '',
  })
  // 菜单列表
  const menuList=ref(constantRoute)
  // 是否折叠菜单
  const isCollapse=ref(false)
  return {token,user,menuList,isCollapse}
})
