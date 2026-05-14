// 品牌列表
export interface TrademarkList {
  "ID": number ,
  "createTime": string,
  "id": number,
  "logoUrl": string,
  "tmName": string,
  "updateTime": string
}

export interface ResponseData<T> {
  code: number
  msg: string
  ok: boolean
  data: T
}
export interface TrademarkListPage {
  "records": TrademarkList[]
  "total": number,
  "size": number,
  "current": number,
  "searchCount": true,
  "pages": number
}
