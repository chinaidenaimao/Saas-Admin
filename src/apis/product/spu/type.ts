export interface ResponseData<T> {
  code: number
  msg: string
  ok: boolean
  data: T
}

export interface SpuData {
  category3Id: string | number
  id?: number
  spuName: string
  tmId: number | string
  description: string
  spuImageList: null | SpuImg[]
  spuSaleAttrList: null | SaleAttr[]
}

export type Records = SpuData[]

export type HasSpuResponseData = ResponseData<{
  records: Records
  total: number
  size: number
  current: number
  searchCount: boolean
  pages: number
}>

export interface Trademark {
  id: number
  tmName: string
  logoUrl: string
}

export type AllTradeMark = ResponseData<Trademark[]>

export interface SpuImg {
  id?: number
  imgName?: string
  imgUrl?: string
  createTime?: string
  updateTime?: string
  spuId?: number
  name?: string
  url?: string
}

export type SpuHasImg = ResponseData<SpuImg[]>

export interface SaleAttrValue {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrValueName: string
  saleAttrName?: string
  isChecked?: null
}

export type SpuSaleAttrValueList = SaleAttrValue[]

export interface SaleAttr {
  id?: number
  createTime?: null
  updateTime?: null
  spuId?: number
  baseSaleAttrId: number | string
  saleAttrName: string
  spuSaleAttrValueList: SpuSaleAttrValueList
  flag?: boolean
  saleAttrValue?: string
}

export type SaleAttrResponseData = ResponseData<SaleAttr[]>

export interface HasSaleAttr {
  id: number
  name: string
}

export type HasSaleAttrResponseData = ResponseData<HasSaleAttr[]>

export interface Attr {
  attrId: number | string
  valueId: number | string
}

export interface saleArr {
  saleAttrId: number | string
  saleAttrValueId: number | string
}

export interface SkuData {
  category3Id: string | number
  spuId: string | number
  tmId: string | number
  skuName: string
  price: string | number
  weight: string | number
  skuDesc: string
  skuAttrValueList?: Attr[]
  skuSaleAttrValueList?: saleArr[]
  skuDefaultImg: string
}

export type SkuInfoData = ResponseData<SkuData[]>

// skuForm 用到的扩展类型
export interface SkuFormAttr {
  id?: number
  attrName: string
  attrValueList: { id?: number; valueName: string }[]
  attrIdAndValueId?: string
}

export interface SkuFormSaleAttr {
  id?: number
  saleAttrName: string
  spuSaleAttrValueList: { id?: number; saleAttrValueName: string }[]
  saleIdAndValueId?: string
}
