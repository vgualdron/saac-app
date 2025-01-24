import axios from 'axios'

export const http = ({ url, method, data }) => {
  let token = null
  const common = localStorage.getItem('common')
  if (common) {
    const commonParse = JSON.parse(common)
    const user = commonParse.user
    if (user && user.data) {
      token = user.data.token
    }
  }
  return axios({
    url,
    method,
    data,
    headers: {
      Authorization: token ? `Bearer ${token}` : null,
    },
  })
}

export default {}
