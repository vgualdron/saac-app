import { api } from 'boot/axios'

export default {
  session: () => api.get('/api/session/status'),

  signIn: (data) => api.post('/auth/login', data),

  signUp: (data) => api.post('/auth/create', data),

  signOut: (data) => api.post('/auth/logout', data),

  getCompanies: () => api.get('/company'),

  getDepartments: () => api.get('/department'),

  getCities: () => api.get('/city'),

  getCreditLines: () => api.get('/credit-line'),

  getConfigurations: () => api.get('/configuration'),

  getCategories: () => api.get('/category'),

  getShops: () => api.get('/shop'),

  sendPqr: (data) => api.post('/pqr', data),

  changePassword: (data) => api.put(`/user/update-profile/${data.id}`, data),

  getStatement: (document) => api.get(`/statement/${document}`),
}
