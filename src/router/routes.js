const routes = [
  {
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
    children: [{ path: '', name: 'Iniciar Sesión', component: () => import('pages/Login.vue') }],
  },
  {
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
