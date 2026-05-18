export interface LoginRequest {
  username: string
  password: string
}
export interface ResponseData {
  code: number
  msg: string
  ok: boolean
}
export interface loginResponseData extends ResponseData {
  data: string
}
export interface userInfoReponseData extends ResponseData {
  data: {
    router: string[]
    buttons: string[]
    roles: string[]
    name: string
    avatar: string
  }
}
