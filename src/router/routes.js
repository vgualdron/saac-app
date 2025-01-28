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
    path: '/logout',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/LogoutPage.vue'),
        meta: { requiresAuth: true },
      },
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
  {
    path: '/simulator',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/SimulatorPage.vue'),
        meta: {
          name: 'Sumular crédito',
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: '/collections',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/CollectionsPage.vue'),
        meta: {
          name: 'Recaudos',
          requiresAuth: true,
        },
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
