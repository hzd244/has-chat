import http from '@/api'

/**
 * 上传文件
 */
export const uploadFile = (params: any) => {
  return http.post('/uploadFile', params)
}
