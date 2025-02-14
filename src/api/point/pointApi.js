import { http } from '../../helpers/http'

export default {
  save: (data) =>
    http({
      url: `${process.env.URL_API}/point`,
      method: 'POST',
      data,
    }),
  listByUserSession: (data) =>
    http({
      url: `${process.env.URL_API}/point/by-user-session/${data}`,
      method: 'GET',
    }),
  list: (status) =>
    http({
      url: `${process.env.URL_API}/point/${status}`,
      method: 'GET',
    }),
  update: (data) =>
    http({
      url: `${process.env.URL_API}/point/${data.id}`,
      method: 'PUT',
      data,
    }),
  delete: (id) =>
    http({
      url: `${process.env.URL_API}/point/${id}`,
      method: 'DELETE',
    }),
}
