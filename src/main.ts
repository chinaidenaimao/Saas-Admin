import { createApp } from 'vue'
import { createPinia } from 'pinia'
// 引入element
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入全局样式
import './style/index.css'
import App from './App.vue'
import router from './router'
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.mount('#app')
