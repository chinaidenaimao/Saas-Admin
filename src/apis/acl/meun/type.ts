
export interface Permisstion {
  id?: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: string
  toCode: string
  type: number
  status: number
  level: number
  children?: PermisstionList
  select: boolean
}
export type PermisstionList = Permisstion[]
export interface saveMenuData{
  "code": string,
  "level": number,
  "name": string,
  "pid": number,
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
