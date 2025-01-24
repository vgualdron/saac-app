import { defineStore, acceptHMRUpdate } from 'pinia'
import commonApi from '../api/common/commonApi'

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
    companies: [],
    departments: [],
    cities: [],
    isLoggedIn: false,
    status: false,
    responseMessages: [],
  }),
  getters: {},
  actions: {
    async signIn(payload) {
      try {
        this.isLoggedIn = true
        this.status = true
        this.user = await commonApi.signIn(payload)
      } catch (error) {
        this.isLoggedIn = false
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
    async signUp(payload) {
      try {
        this.status = true
        this.user = await commonApi.signUp(payload)
        this.responseMessages = this.user.data.message
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
    async getCompanies() {
      try {
        this.status = true
        const response = await commonApi.getCompanies()
        if (response && response.data && response.data.data) {
          this.companies = response.data.data
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
    async getDepartments() {
      try {
        this.status = true
        const response = await commonApi.getDepartments()
        if (response && response.data && response.data.data) {
          this.departments = response.data.data
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
    async getCities() {
      try {
        this.status = true
        const response = await commonApi.getCities()
        if (response && response.data && response.data.data) {
          this.cities = response.data.data
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
  import.meta.hot.accept(acceptHMRUpdate(useCommonStore, import.meta.hot))
}
