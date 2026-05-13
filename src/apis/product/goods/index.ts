import https from '@/utils/https'
import type { TrademarkList ,ResponseData} from './type'
enum GoodsApi {
  GetListList = '/admin/product/baseTrademark/getTrademarkList',
}
export const getListList = () => {
  return https.get(GoodsApi.GetListList) as Promise<ResponseData<TrademarkList[]>>
}
