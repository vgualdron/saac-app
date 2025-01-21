import { defineStore, acceptHMRUpdate } from 'pinia'
import authApi from '../api/auth/authApi'

export const useCommonStore = defineStore('common', {
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'common',
        storage: localStorage,
      },
    ],
  },
  state: () => ({
    user: {},
    isLoggedIn: false,
    status: false,
    responseMessages: [],
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    async signIn(payload) {
      try {
        this.isLoggedIn = true
        this.status = true
        this.user = await authApi.signIn(payload)
      } catch (error) {
        if (error.message !== 'Network Error') {
          this.isLoggedIn = false
          this.status = false
          this.responseMessages = error.response.data.message
        } else {
          this.responseMessages = [
            {
              text: 'Error de red',
              detail: 'Intente conectarse a otra red de internet',
            },
          ]
        }
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCommonStore, import.meta.hot))
}
