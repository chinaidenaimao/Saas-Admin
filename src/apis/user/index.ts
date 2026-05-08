import https from '@/utils/https'
import type {  LoginRequest, loginResponseData, userInfoReponseData } from './type'
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}
// 登录接口
export const reqLogin=(data: LoginRequest) =>
  https.post(API.LOGIN_URL, data) as Promise<loginResponseData>
// 获取用户信息接口
export const reqUserInfo = () => https.get(API.USERINFO_URL) as Promise<userInfoReponseData>
// 退出登录接口
export const reqLogout = () => https.post<unknown>(API.LOGOUT_URL) as Promise<unknown>
