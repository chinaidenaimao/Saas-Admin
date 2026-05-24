import https from '@/utils/https'
import type {
  SkuInfoData, SkuData, SpuData, HasSpuResponseData,
  AllTradeMark, SpuHasImg, SaleAttrResponseData, HasSaleAttrResponseData,
  ResponseData,
} from './type'

enum API {
  HASSPU_URL = '/admin/product/',
  ALLTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
  IMAGE_URL = '/admin/product/spuImageList/',
  SPUHASSALEATTR_URL = '/admin/product/spuSaleAttrList/',
  ALLSALEATTR_URL = '/admin/product/baseSaleAttrList',
  ADDSPU_URL = '/admin/product/saveSpuInfo',
  UPDATESPU_URL = '/admin/product/updateSpuInfo',
  ADDSKU_URL = '/admin/product/saveSkuInfo',
  SKUINFO_URL = '/admin/product/findBySpuId/',
  REMOVESPU_URL = '/admin/product/deleteSpu/',
}

export const reqHasSpu = (page: number, limit: number, category3Id: string | number) => {
  return https.get(API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`) as Promise<HasSpuResponseData>
}

export const reqAllTradeMark = () => {
  return https.get(API.ALLTRADEMARK_URL) as Promise<AllTradeMark>
}

export const reqSpuImageList = (spuId: number) => {
  return https.get(API.IMAGE_URL + spuId) as Promise<SpuHasImg>
}

export const reqSpuHasSaleAttr = (spuId: number) => {
  return https.get(API.SPUHASSALEATTR_URL + spuId) as Promise<SaleAttrResponseData>
}

export const reqAllSaleAttr = () => {
  return https.get(API.ALLSALEATTR_URL) as Promise<HasSaleAttrResponseData>
}

export const reqAddOrUpdateSpu = (data: SpuData) => {
  if (data.id) {
    return https.post(API.UPDATESPU_URL, data) as Promise<ResponseData<string>>
  } else {
    return https.post(API.ADDSPU_URL, data) as Promise<ResponseData<string>>
  }
}

export const reqAddSku = (data: SkuData) => {
  return https.post(API.ADDSKU_URL, data) as Promise<ResponseData<string>>
}

export const reqSkuList = (spuId: number | string) => {
  return https.get(API.SKUINFO_URL + spuId) as Promise<SkuInfoData>
}

export const reqRemoveSpu = (spuId: number | string) => {
  return https.delete(API.REMOVESPU_URL + spuId) as Promise<ResponseData<string>>
}
