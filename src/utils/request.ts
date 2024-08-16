import axios from 'axios'

const instance = axios.create()
// 请求队列
// const queue: { url: string, cancel: CancelTokenSource['cancel'] }[] = []

// 中断重复的请求，并从队列中移除
// function removeQueue(config: AxiosRequestConfig) {
//   for (let i = 0, size = queue.length; i < size; i++) {
//     const task = queue[i]
//     if (task.url === config.url) {
//       task.cancel()
//       queue.splice(i, 1)
//     }
//   }
// }

instance.interceptors.request.use((config) => {
  // removeQueue(config)
  config.headers.set('Access-Control-Allow-Origin', '*')
  // config.cancelToken = new axios.CancelToken((c) => {
  //   queue.push({ url: config.url, cancel: c })
  // })
  return config
}, (error) => {
  return Promise.reject(error)
})

// instance.interceptors.response.use((response) => {
//   removeQueue(response.config)
//   return response
// })

export default instance
