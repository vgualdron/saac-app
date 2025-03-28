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
    path: '/complete',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/CompletePage.vue'),
        meta: { requiresAuth: true },
      },
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
        component: () => import('src/pages/HomePage.vue'),
        meta: {
          name: 'Inicio',
          requiresAuth: true,
        },
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
          name: 'Simular crédito',
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: '/paid',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/PaidPage.vue'),
        meta: {
          name: 'Pagos',
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
          name: 'Estado de cuenta',
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: '/contact',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/ContactPage.vue'),
        meta: {
          name: 'Contacto',
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
