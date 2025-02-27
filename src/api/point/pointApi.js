import { api } from 'boot/axios'

export default {
  save: (data) => api.post('/point', data),

  listByUserSession: (userId) => api.get(`/point/by-user-session/${userId}`),

  list: (status) => api.get(`/point/${status}`),

  update: (data) => api.put(`/point/${data.id}`, data),

  delete: (id) => api.delete(`/point/${id}`),
}
