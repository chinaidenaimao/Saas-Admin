export interface CategoryFormdata {
  id:number
  name:string
}
export interface CategoryFormdata1 {
  id:number
  name:string
  category1Id:number
}
export interface CategoryFormdata2 {
  id:number
  name:string
  category2Id:number
}
export interface ResponseData<T> {
  code: number
  msg: string
  ok: boolean
  data: T
}
//属性值对象的ts类型
export interface AttrValue {
  id?: number
  valueName: string
  attrId?: number
  flag?: boolean
}
export interface Attr {
  id?: number
  attrName: string
  categoryId: number | string
  categoryLevel: number
  attrValueList: AttrValue[]
}
