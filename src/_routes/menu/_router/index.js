const routes = [
  {
    path: '/menu',
    component: () => import("@/_routes/menu/_root"),
    redirect: '/menu/automationrule',
    children: [
      {
        path: 'automationrule',
        component: () => import("@/_routes/menu/AutomationRule"),
      },
      {
        path: 'test',
        component: () => import("@/_routes/menu/Test"),
      },
    ]
  },
]

export default routes
