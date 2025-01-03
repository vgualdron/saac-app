import { defineStore, acceptHMRUpdate } from 'pinia'
import authApi from '../api/auth/authApi'

export const useCommonStore = defineStore('common', {
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
        const response = await authApi.signIn(payload)
        this.state.status = response.data
        console.log(this.state.status)
        /* commit(types.mutations.SET_STATUS_SIGN, true)
        commit(types.mutations.SET_PERMISSIONS, response.data.permissions)
        commit(types.mutations.SET_MENU, response.data.menu)
        commit(types.mutations.SET_YARD, response.data.user.yard)
        commit(types.mutations.SET_CITY, response.data.user.city)
        commit(types.mutations.SET_CURRENT_YARD, response.data.user.currentYard)
        commit(types.mutations.SET_USER, response.data.user.user)
        commit(types.mutations.SET_DOCUMENT, response.data.user.document)
        commit(types.mutations.SET_NAME, response.data.user.name)
        commit(types.mutations.SET_TOKEN, response.data.token)
        commit(types.mutations.SET_ROLES, response.data.roles)
        commit(types.mutations.SET_ROLES_ARRAY, response.data.rolesArray) */
      } catch (error) {
        console.log(error)
        /* if (error.message !== 'Network Error') {
          commit(types.mutations.SET_STATUS_SIGN, false)
          commit(types.mutations.SET_RESPONSE_MESSAGES, error.response.data.message)
        } else {
          commit(types.mutations.SET_RESPONSE_MESSAGES, [
            {
              text: 'Error de red',
              detail: 'Intente conectarse a otra red de internet',
            },
          ])
        } */
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCommonStore, import.meta.hot))
}
