export interface ResponseData<T> {
  code: number
  msg: string
  ok: boolean
  data: T
}

export interface SkuAttr {
  id?: number
  attrId: number | string
  valueId: number | string
  attrName?: string
  valueName?: string
}

export interface SkuSaleAttr {
  id?: number
  saleAttrId: number | string
  saleAttrValueId: number | string
  saleAttrName?: string
  saleAttrValueName?: string
}

export interface SkuImage {
  id?: number
  imgUrl?: string
  imgName?: string
}

export interface SkuData {
  category3Id?: string | number
  spuId?: string | number
  tmId?: string | number
  skuName?: string
  price?: string | number
  weight?: string | number
  skuDesc?: string
  skuAttrValueList?: SkuAttr[]
  skuSaleAttrValueList?: SkuSaleAttr[]
  skuDefaultImg?: string
  isSale?: number
  id?: number
  skuImageList?: SkuImage[]
}

export type SkuResponseData = ResponseData<{
  records: SkuData[]
  total: number
  size: number
  current: number
  orders: []
  optimizeCountSql: boolean
  hitCount: boolean
  countId: null
  maxLimit: null
  searchCount: boolean
  pages: number
}>

export type SkuInfoData = ResponseData<SkuData>
