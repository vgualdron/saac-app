import { http } from '../../helpers/http'

export default {
  session: () =>
    http({
      url: `${process.env.URL_API}/api/session/status`,
      method: 'GET',
    }),
  signIn: (data) =>
    http({
      url: `https://micomercio.com.co/api-prestamos/public/index.php/api/auth/login`,
      method: 'POST',
      data,
    }),
  signOut: (data) =>
    http({
      url: `${process.env.URL_API}/api/auth/logout`,
      method: 'POST',
      data,
    }),
}
