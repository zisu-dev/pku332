import { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw = {
  path: '/dorm',
  name: 'dorm',
  component: () => import('@/pages/Dorm.vue'),
  children: [
    {
      path: '',
      name: 'dorm-index',
      component: () => import('@/pages/dorm/Index.vue')
    },
    {
      path: 'data',
      name: 'dorm-data',
      component: () => import('@/pages/dorm/Data.vue')
    }
  ]
}

export default route
