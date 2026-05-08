import { createRouter, createWebHistory } from 'vue-router'
import { constantRoute } from '@/router/router'
const router = createRouter({
  history: createWebHistory(),
  routes: constantRoute,
  scrollBehavior: () => ({ top: 0, left: 0 }),
})

export default router
