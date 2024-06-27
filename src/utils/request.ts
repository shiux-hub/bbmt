import axios from 'axios'

const instance = axios.create()

instance.interceptors.request.use((config) => {
  config.headers.set('Access-Control-Allow-Origin', '*')
  return config
})

export default instance
