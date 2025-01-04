import { defineStore, acceptHMRUpdate } from 'pinia'
import authApi from '../api/auth/authApi'

export const useCommonStore = defineStore('common', {
  persist: {
    enabled: true, // Habilitar persistencia
    strategies: [
      {
        key: 'common', // Clave para guardar el estado en localStorage
        storage: localStorage, // Puedes usar localStorage o sessionStorage
      },
    ],
  },
  state: () => ({
    status: false,
    responseMessages: [],
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    async signIn(payload) {
      try {
        this.status = await authApi.signIn(payload)
      } catch (error) {
        console.log(error)
        this.status = error
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCommonStore, import.meta.hot))
}
