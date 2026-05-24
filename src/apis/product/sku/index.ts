import https from '@/utils/https'
import type { SkuResponseData, SkuInfoData, ResponseData } from './type'

enum API {
  SKU_URL = '/admin/product/list/',
  SALE_URL = '/admin/product/onSale/',
  CANCELSALE_URL = '/admin/product/cancelSale/',
  SKUINFO_URL = '/admin/product/getSkuInfo/',
  DELETESKU_URL = '/admin/product/deleteSku/',
}

export const reqSkuList = (page: number, limit: number) => {
  return https.get(API.SKU_URL + `${page}/${limit}`) as Promise<SkuResponseData>
}

export const reqSaleSku = (skuId: number) => {
  return https.get(API.SALE_URL + skuId) as Promise<ResponseData<string>>
}

export const reqCancelSale = (skuId: number) => {
  return https.get(API.CANCELSALE_URL + skuId) as Promise<ResponseData<string>>
}

export const reqSkuInfo = (skuId: number) => {
  return https.get(API.SKUINFO_URL + skuId) as Promise<SkuInfoData>
}

export const reqRemoveSku = (skuId: number) => {
  return https.delete(API.DELETESKU_URL + skuId) as Promise<ResponseData<string>>
}
