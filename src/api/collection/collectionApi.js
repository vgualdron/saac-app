import { api } from 'boot/axios'

export default {
  getCollections: (document) => api.get(`/collection/${document}`),
}
