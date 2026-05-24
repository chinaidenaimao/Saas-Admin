export interface ResponseData<T> {
  code: number
  msg: string
  ok: boolean
  data: T
}

export interface Attr {
  id?: number
  attrId: number | string
  valueId: number | string
}

export interface saleArr {
  id?: number
  saleAttrId: number | string
  saleAttrValueId: number | string
}

export interface SkuData {
  category3Id?: string | number
  spuId?: string | number
  tmId?: string | number
  skuName?: string
  price?: string | number
  weight?: string | number
  skuDesc?: string
  skuAttrValueList?: Attr[]
  skuSaleAttrValueList?: saleArr[]
  skuDefaultImg?: string
  isSale?: number
  id?: number
  skuImageList?: { id: number; imgUrl: string }[]
  skuSaleAttrValueList2?: { saleAttrName: string; saleAttrValueName: string }[]
  skuAttrValueList2?: { attrName: string; valueName: string }[]
}

export interface SkuResponseData extends ResponseData<{
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
}> {}

export interface SkuInfoData extends ResponseData<SkuData> {}

// SKU 详情中的扩展属性（后端返回带 name 字段）
export interface SkuDetailAttr {
  id?: number
  attrId: number | string
  valueId: number | string
  attrName?: string
  valueName?: string
}

export interface SkuDetailSaleAttr {
  id?: number
  saleAttrId: number | string
  saleAttrValueId: number | string
  saleAttrName?: string
  saleAttrValueName?: string
}

export interface SkuDetailImg {
  id?: number
  imgUrl?: string
  imgName?: string
}

export interface SkuDetailData extends SkuData {
  skuAttrValueList?: SkuDetailAttr[]
  skuSaleAttrValueList?: SkuDetailSaleAttr[]
  skuImageList?: SkuDetailImg[]
}
