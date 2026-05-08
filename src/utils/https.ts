import axios from 'axios'
import type { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { ElMessage } from 'element-plus'
const https= axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
})

// 请求拦截器
https.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['token'] = token
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)
// 响应拦截器
https.interceptors.response.use(
  (res: AxiosResponse) => {
    const data = res.data
    const code = data.code
    if (code === 200) {
      return data
    }
    else
    {
      ElMessage.error(data.message || '请求失败')
        return Promise.reject(new Error(data.message))
    }
  },
  (error: AxiosError) => {
    let message = ''
    const status = error.response?.status || 500
    if (status === 401) {
      message = '登录过期，请重新登录'
    } else if (status === 403) {
      message = '没有权限，请联系管理员'
    } else if (status === 404) {
      message = '接口不存在'
    } else if (status === 500) {
      message = '服务器内部错误，请联系管理员'
    } else {
      message = '请求失败，请稍后重试'
    }
    ElMessage.error(message)
    return Promise.reject(error)
  },
)
export default https
