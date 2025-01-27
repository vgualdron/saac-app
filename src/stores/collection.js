import { defineStore, acceptHMRUpdate } from 'pinia'
import collectionApi from '../api/collection/collectionApi'

export const useCollectionStore = defineStore('collection', {
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'collection',
        storage: localStorage,
      },
    ],
  },
  state: () => ({
    collections: [],
    status: false,
    responseMessages: [],
  }),
  getters: {},
  resetStore() {
    this.$reset()
  },
  actions: {
    async getCollections(document) {
      try {
        this.status = true
        const response = await collectionApi.getCollections(document)
        if (response && response.data && response.data.data) {
          this.collections = response.data.data
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
  import.meta.hot.accept(acceptHMRUpdate(useCollectionStore, import.meta.hot))
}
