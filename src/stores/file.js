import { defineStore, acceptHMRUpdate } from 'pinia'
import fileApi from '../api/file/fileApi'

export const useFileStore = defineStore('file', {
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'file',
        storage: localStorage,
      },
    ],
  },
  state: () => ({
    file: {},
    statusesToday: [],
    status: false,
    responseMessages: [],
  }),
  getters: {},
  resetStore() {
    this.$reset()
  },
  actions: {
    async getFile(payload) {
      const response = await fileApi.get(payload)
      return response.data
    },
    async listStatusesToday() {
      try {
        const response = await fileApi.listStatusesToday()
        if (response && response.data && response.data.data) {
          this.statusesToday = response.data.data
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
    async saveFile(payload) {
      try {
        this.status = true
        const response = await fileApi.save(payload)
        if (response && response.data && response.data.data) {
          this.file = response.data.data
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
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFileStore, import.meta.hot))
}
