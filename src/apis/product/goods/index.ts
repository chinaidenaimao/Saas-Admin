import https from '@/utils/https'
import type { TrademarkList ,ResponseData,TrademarkListPage} from './type'
enum GoodsApi {
  GetListList = '/admin/product/baseTrademark/getTrademarkList',
  GetListPage = '/admin/product/baseTrademark',
  saveTrademark='/admin/product/baseTrademark/save',
  update='/admin/product/baseTrademark/update',
  deleteTrademark='/admin/product/baseTrademark/remove'
}
export const getListList = () => {
  return https.get(GoodsApi.GetListList) as Promise<ResponseData<TrademarkList[]>>
}
export const getListPage = (page:number,limit:number) => {
  return https.get(GoodsApi.GetListPage+'/'+page+'/'+limit) as Promise<ResponseData<TrademarkListPage>>
}
export const saveTrademark = (data:{
  "logoUrl": string,
  "tmName": string
}) => {
  return https.post(GoodsApi.saveTrademark,data) as Promise<ResponseData<string>>
}
export const updateTrademark = (data:{
  "id": number,
  "logoUrl": string,
  "tmName": string
}) => {
  return https.put(GoodsApi.update,data) as Promise<ResponseData<string>>
}
export const deleteTrademark=(id:number)=>{
  return https.delete(GoodsApi.deleteTrademark+'/'+id) as Promise<ResponseData<string>>
}
