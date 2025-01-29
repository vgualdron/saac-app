import { http } from '../../helpers/http'

export default {
  save: (data) =>
    http({
      url: `${process.env.URL_API}/file/create`,
      method: 'POST',
      data,
    }),
  get: (data) =>
    http({
      url: `${process.env.URL_API}/file/get`,
      method: 'POST',
      data,
    }),
  update: (data) =>
    http({
      url: `${process.env.URL_API}/file/update/${data.id}`,
      method: 'PUT',
      data,
    }),
  delete: (id) =>
    http({
      url: `${process.env.URL_API}/file/delete/${id}`,
      method: 'DELETE',
    }),
}
