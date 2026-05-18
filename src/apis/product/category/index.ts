import https from '@/utils/https'
import type { CategoryFormdata1,CategoryFormdata2,ResponseData  ,CategoryFormdata,Attr} from './type'
enum CategoryApi {
  getCategoryfirst = '/admin/product/getCategory1',
  getCategorysecond = '/admin/product/getCategory2',
  getCategorythird = '/admin/product/getCategory3',
  attrInfoList = '/admin/product/attrInfoList',
  saveAttrInfo = '/admin/product/saveAttrInfo',
  deleteAttrInfo = '/admin/product/deleteAttr',
}
export const getCategoryfirst = async () => {
  return https.get(CategoryApi.getCategoryfirst) as Promise<ResponseData<CategoryFormdata[]>>
}
export const getCategorysecond = async (id:number) => {
  return https.get(CategoryApi.getCategorysecond + '/' + id) as Promise<ResponseData<CategoryFormdata1[]>>
}
export const getCategorythird = async (id:number) => {
  return https.get(CategoryApi.getCategorythird + '/' + id) as Promise<ResponseData<CategoryFormdata2[]>>
}
export const getAttrInfoList = async (c1Id:number,c2Id:number,c3Id:number) => {
  return https.get(CategoryApi.attrInfoList + '/' + c1Id + '/' + c2Id + '/' + c3Id) as Promise<ResponseData<Attr[]>>
}
export const saveAttrInfo = async (data:Attr) => {
  return https.post(CategoryApi.saveAttrInfo,data) as Promise<ResponseData<string>>
}
export const deleteAttrInfo = async (id:number) => {
  return https.delete(CategoryApi.deleteAttrInfo + '/' + id) as Promise<ResponseData<string>>
}
