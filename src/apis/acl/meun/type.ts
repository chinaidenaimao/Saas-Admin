
export interface permissionData{
   "ID": number,
    "children": string[]
    "code": string
    "createTime": {
      "time.Time": string
    },
    "id": number,
    "level": number,
    "name": string,
    "pid": 0,
    "select": true,
    "status": string,
    "toCode": string,
    "type": number,
    "updateTime": {
      "time.Time": string
    }
}
export interface saveMenuData{
  "code": string,
  "level": number,
  "name": string,
  "pid": number,
  "type": number
}
export interface ResponseData<T>{
  code: number
  msg: string
  ok: boolean
  data:T
}
export interface updateMenuData{
  "code": string,
  "id": number,
  "level": number,
  "name": string,
  "pid": number
} 
