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
export const lazy_image = (app: App) => {
  app.directive('lazy-image', {
    mounted(el, binding) {
      if (binding.value) {
        // 保存 src，设置占位图
        el.dataset.src = binding.value;
        el.src = '';
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              el.src = el.dataset.src || binding.value;
              observer.unobserve(el);
            }
          });
        }, {
          rootMargin: '200px 0px'  // 提前 200px 加载
        });

        observer.observe(el);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (el as any)._lazyObserver = observer;  // 挂到元素上
      }
    },
    unmounted(el) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const observer = (el as any)._lazyObserver;
      if (observer) {
        observer.unobserve(el);
        observer.disconnect();
      }
    }
  });
};
