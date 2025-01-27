import { http } from '../../helpers/http'

export default {
  session: () =>
    http({
      url: `${process.env.URL_API}/api/session/status`,
      method: 'GET',
    }),
  signIn: (data) =>
    http({
      url: `${process.env.URL_API}/auth/login`,
      method: 'POST',
      data,
    }),
  signUp: (data) =>
    http({
      url: `${process.env.URL_API}/auth/create`,
      method: 'POST',
      data,
    }),
  signOut: (data) =>
    http({
      url: `${process.env.URL_API}/auth/logout`,
      method: 'POST',
      data,
    }),
  getCompanies: () =>
    http({
      url: `${process.env.URL_API}/company`,
      method: 'GET',
    }),
  getDepartments: () =>
    http({
      url: `${process.env.URL_API}/department`,
      method: 'GET',
    }),
  getCities: () =>
    http({
      url: `${process.env.URL_API}/city`,
      method: 'GET',
    }),
  getCreditLines: () =>
    http({
      url: `${process.env.URL_API}/credit-line`,
      method: 'GET',
    }),
}
