export interface responseData<T>{
  code: number
  msg: string
  data: T
  ok: boolean
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
    records: assignRoles[]
    "total": number,
    "size": number,
    "current": number,
    "pages": number
    "searchCount": boolean
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
