import axios from 'axios'
import store from '@/store'
// 创建一个axios
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net'
})

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  const { token } = store.state
  // 请求发起会经过这里
  if (token) {
    // console.log(`Bearer ${token}`)
    config.headers.Authorization = `Bearer ${token}`
  }
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
export default request
