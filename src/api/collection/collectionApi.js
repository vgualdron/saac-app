import { http } from '../../helpers/http'

export default {
  getCollections: (document) =>
    http({
      url: `${process.env.URL_API}/collection/${document}`,
      method: 'GET',
    }),
}
