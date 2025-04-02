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
    creditLines: [],
    configurations: [],
    categories: [],
    shops: [],
    isLoggedIn: false,
    status: false,
    responseMessages: [],
    statement: {},
  }),
  getters: {},
  actions: {
    resetStore() {
      this.$reset()
    },
    setUserPhoto(url) {
      this.user.data.user.user_url_photo_proile = url
    },
    setUserUpdatePassword(value) {
      this.user.data.user.update_password = value
    },
    setCompleteData(value) {
      this.user.data.user.completed_fields = value
    },
    setUserUpdatePhoto(value) {
      this.user.data.user.update_photo = value
    },
    setUserCompletedFields(value) {
      this.user.data.user.completed_fields = value
    },
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
    logout() {
      this.isLoggedIn = false
      this.status = true
      this.user = null
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
    async completeDataUser(payload) {
      try {
        this.status = true
        const response = await commonApi.completeDataUser(payload)
        this.responseMessages = response.data.message
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
    async completeDataSaac(payload) {
      try {
        this.status = true
        const response = await commonApi.completeDataSaac(payload)
        this.responseMessages = response.data.message
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
    async getCreditLines() {
      try {
        this.status = true
        const response = await commonApi.getCreditLines()
        if (response && response.data && response.data.data) {
          this.creditLines = response.data.data
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
    async getConfigurations() {
      try {
        this.status = true
        const response = await commonApi.getConfigurations()
        if (response && response.data && response.data.data) {
          this.configurations = response.data.data
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
    async getCategories() {
      try {
        this.status = true
        const response = await commonApi.getCategories()
        if (response && response.data && response.data.data) {
          this.categories = response.data.data
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
    async getShops() {
      try {
        this.status = true
        const response = await commonApi.getShops()
        if (response && response.data && response.data.data) {
          this.shops = response.data.data
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
    async sendPqr(payload) {
      try {
        this.status = true
        const response = await commonApi.sendPqr(payload)
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
    async changePassword(payload) {
      try {
        this.status = true
        const response = await commonApi.changePassword(payload)
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
    async getStatement(document) {
      try {
        this.status = true
        const response = await commonApi.getStatement(document)
        if (response && response.data) {
          this.statement = response.data
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
