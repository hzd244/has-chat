import { Login, SendCode, User } from '@/api/interface/index'
import http from '@/api'

/**
 * 登录
 */
export const login = (params: Login.ReqLogin) => {
  return http.post('/login', params)
}

/**
 * 注册
 */
export const register = (params: Login.ReqLogin) => {
  return http.post('/register', params)
}

/**
 * 发送邮箱验证码
 */
export const sendEmailCode = (params: SendCode.ReqSendCode) => {
  return http.post('/sendVerificationCode', params)
}

/**
 * 检验验证码
 */
export const checkEmailCode = (params: SendCode.ReqCheckCode) => {
  return http.post('/checkVerificationCode', params)
}

/**
 * 随机获取一位用户
 */
export const getRandomUser = () => {
  return http.post('/getRandomUser')
}

/**
 * 获取用户列表
 */
export const getUserList = (params: User.ReqUserList) => {
  return http.post('/userList', params)
}
