

const baseRoutes = [
    {
      path: '/',
      redirect: '/main'
    },
  {
    path: "/main",
    component: () => import("@/_routes/Main")
  },
  {
    path: "/eventbasedjob",
    component: () => import("@/_routes/EventBasedJob")
  },
]

// import tabsRoutes from '@/_routes/tabs/_router'
// const routes = baseRoutes.concat(tabsRoutes)

const routes = baseRoutes

import { createRouter, createWebHistory } from 'vue-router'
export default createRouter({
  history: createWebHistory(),
  routes,
})