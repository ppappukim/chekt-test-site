import menuRoutes from '@/_routes/menu/_router'

const routes = [
    {
      path: '/',
      redirect: '/menu'
    },
    ...menuRoutes,
]

import { createRouter, createWebHistory } from 'vue-router'
export default createRouter({
  history: createWebHistory(),
  routes,
})