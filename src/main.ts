import { createApp } from 'vue'
import pinia from '@/stores'
// 引入element
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入全局图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 引入全局样式
import './style/index.scss'
import App from './App.vue'
import router from './router'
import '@/permisstion'
const app = createApp(App)
// 注册全局图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
