import { defineRouter } from '#q-app/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import routes from './routes'
import { useCommonStore } from '../stores/common'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

  Router.beforeEach((to, from, next) => {
    const commonStore = useCommonStore()
    // Verifica si la ruta requiere autenticación
    if (to.meta.requiresAuth && !commonStore.isLoggedIn) {
      // Redirige a la página de inicio de sesión si no está autenticado
      next('/')
    } else {
      if (
        commonStore.user &&
        commonStore.user.data &&
        commonStore.user.data.user &&
        !commonStore.user.data.user.completed_fields &&
        to.fullPath !== '/complete' &&
        to.fullPath !== '/logout'
      ) {
        next('/complete')
      } else {
        next()
      }
    }
  })

  return Router
})
