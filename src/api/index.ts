import axios, {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'
import {
  showFullScreenLoading,
  tryHideFullScreenLoading,
} from '@/config/serviceLoading'
import { AxiosCanceler } from './helper/axiosCancel'
import { ResultData } from '@/api/interface'
import { GlobalStore } from '@/store'

const axiosCanceler = new AxiosCanceler()

const config = {
  baseURL: '/api',
  timeout: 10000,
  // 跨域时候允许携带凭证
  withCredentials: true,
}

class RequestHttp {
  service: AxiosInstance
  public constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config)

    this.service.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const globalStore = GlobalStore()
        // * 将当前请求添加到 pending 中
        axiosCanceler.addPending(config)
        // * 如果当前请求不需要显示 loading,在 api 服务中通过指定的第三个参数: { headers: { noLoading: true } }来控制不显示loading
        // config.headers!.noLoading || showFullScreenLoading()
        return {
          ...config,
          headers: {
            ...config.headers,
          },
        }
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      },
    )

    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        axiosCanceler.removePending(config)
        // tryHideFullScreenLoading()
        const res = response.data
        if (res?.code !== 200) {
          console.error(res.message)
          return res
        } else {
          return res
        }
      },
      (error: AxiosError) => {
        tryHideFullScreenLoading()
        console.error(error.message)
        return Promise.reject(error)
      },
    )
  }

  // * 常用请求方法封装
  get(url: string, params?: object, _object = {}): Promise<ResultData> {
    return this.service.get(url, { params, ..._object })
  }
  post(url: string, params?: object, _object = {}): Promise<ResultData> {
    return this.service.post(url, params, _object)
  }
  put(url: string, params?: object, _object = {}): Promise<ResultData> {
    return this.service.put(url, params, _object)
  }
  delete(url: string, params?: any, _object = {}): Promise<ResultData> {
    return this.service.delete(url, { params, ..._object })
  }
}

export default new RequestHttp(config)
