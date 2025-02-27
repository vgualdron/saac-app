import { api } from 'boot/axios'

export default {
  save: (data) => api.post('/file/create', data),

  get: (data) => api.post('/file/get', data),

  update: (data) => api.put(`/file/update/${data.id}`, data),

  delete: (id) => api.delete(`/file/delete/${id}`),
}
