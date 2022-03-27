import { RouteRecordRaw } from 'vue-router'

const tools = import.meta.glob('/src/pages/tools/*.vue')
const routes: RouteRecordRaw[] = Object.entries(tools).map(
  ([name, component]) => ({
    path: name.substring(10, name.length - 4).toLowerCase(),
    component
  })
)

export default routes
