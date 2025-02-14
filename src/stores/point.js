import { defineStore, acceptHMRUpdate } from 'pinia'
import pointApi from '../api/point/pointApi'

export const usePointStore = defineStore('point', {
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'point',
        storage: localStorage,
      },
    ],
  },
  state: () => ({
    points: [],
    status: false,
    responseMessages: [],
  }),
  getters: {},
  actions: {
    resetStore() {
      this.$reset()
    },
    async save(payload) {
      try {
        this.status = true
        const response = await pointApi.save(payload)
        if (response && response.data && response.data.message) {
          this.responseMessages = response.data.message
        }
      } catch (error) {
        this.status = false
        if (error.message !== 'Network Error') {
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
    async listByUserSession(status) {
      try {
        this.status = true
        const response = await pointApi.listByUserSession(status)
        if (response && response.data && response.data.data) {
          this.points = response.data.data
        }
      } catch (error) {
        this.status = false
        if (error.message !== 'Network Error') {
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
  import.meta.hot.accept(acceptHMRUpdate(usePointStore, import.meta.hot))
}
