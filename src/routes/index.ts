import { createRouter, createWebHistory } from 'vue-router'
import tools from '@/routes/tools'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/pages/Index.vue')
    },
    {
      path: '/tools',
      name: 'tools',
      component: () => import('@/pages/Tools.vue')
    },
    ...tools
  ]
})

export default router

console.log(tools)
