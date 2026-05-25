import type { App } from "vue";
import pinia from '@/stores'
import { useUserStore } from '@/stores/counter'
const userStore=useUserStore(pinia)
export const isHas=(app:App,)=>{
  app.directive('has',{
    // 挂载完毕时触发
    mounted(el, binding) {
      if(!userStore.user.buttons.includes(binding.value)){
        el.parentElement?.removeChild(el)
      }
    }
  })
}
