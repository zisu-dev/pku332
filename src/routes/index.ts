import { createRouter, createWebHistory } from 'vue-router'
import tools from '@/routes/tools'
import dorm from '@/routes/dorm'

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
    {
      path: '/pubgnote',
      name: 'pubgnote',
      component: () => import('@/pages/PUBGNote.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/pages/Admin.vue')
    },
    dorm,
    ...tools
  ]
})

export default router
