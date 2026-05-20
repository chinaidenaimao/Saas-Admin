export interface responseData<T>{
  code: number
  msg: string
  data: T
  ok: boolean
}
export interface userlist {
        "createTime": string,
        "updateTime": string,
        "id": number,
        "username": string,
        "roleName": string,
        "password": string,
        "name": string,
        "phone": string
}
export interface page {
   "total": number,
    "size": number,
    "current": number,
    "pages": number
}
export interface userListResponseData {
  code: number
  msg: string
  data: {
    records: userlist[]
    "total": number,
    "size": number,
    "current": number,
    "pages": number
  }
  ok: boolean
}
export interface assignRoles {
  "createTime": string,
  "updateTime": string,
  "id": number,
  "roleName": string,
  "remark": string
}
