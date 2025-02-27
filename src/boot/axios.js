// import { boot } from 'quasar'
import { defineBoot } from '#q-app/wrappers'
import { useCommonStore } from 'src/stores/common'
import axios from 'axios'
import { Notify } from 'quasar'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
  baseURL: `${process.env.URL_API}`,
  timeout: 10000,
  withCredentials: true,
})
export default defineBoot(({ app }) => {
  const commonStore = useCommonStore()

  // Interceptor para añadir el token en cada petición
  api.interceptors.request.use((config) => {
    const common = localStorage.getItem('common')
    let token = null

    if (common) {
      const commonParse = JSON.parse(common)
      const user = commonParse.user
      if (user && user.data) {
        token = user.data.token
      }
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  // Interceptor para manejar errores de respuesta
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        Notify.create({
          message: 'No hay una sesi\u00f3n activa, vuelve a iniciar sesión, por favor.',
          icon: 'close',
          color: 'orange',
          timeout: 5000,
          textColor: 'white',
          progress: true,
          onDismiss() {
            commonStore.logout() // Cierra sesión en Pinia
            window.location.reload(true)
          },
        })
      }
      return Promise.reject(error)
    },
  )

  // Hacer que Axios esté disponible en toda la app
  app.config.globalProperties.$axios = api
  app.config.globalProperties.$api = api
})

export { api }
