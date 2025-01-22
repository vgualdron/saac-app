const routes = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', name: 'Iniciar Sesión', component: () => import('src/pages/LoginPage.vue') },
    ],
  },
  {
    path: '/register',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', name: 'Registrarse', component: () => import('src/pages/RegisterPage.vue') },
    ],
  },
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/Index.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
