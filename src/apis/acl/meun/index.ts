import https from '@/utils/https'
import type {permissionData,saveMenuData,ResponseData,updateMenuData} from './type'
enum API {
  //获取全部菜单与按钮的标识数据
  ALLPERMISSTION_URL = '/admin/acl/permission',
  //给某一级菜单新增一个子菜单
  ADDMENU_URL = '/admin/acl/permission/save',
  //更新某一个已有的菜单
  UPDATE_URL = '/admin/acl/permission/update',
  //删除已有的菜单
  DELETEMENU_URL = '/admin/acl/permission/remove/',
}
// 获取菜单列表
export const getPermission = () => {
  return https.get(API.ALLPERMISSTION_URL) as Promise<ResponseData<permissionData[]>>
}
// 新增菜单
export const saveMenu = (data: saveMenuData) => {
  return https.post(API.ADDMENU_URL, data) as Promise<ResponseData<string>>
}
// 删除菜单
export const deleteMenu = (data:string) => {
  return https.delete(API.DELETEMENU_URL+data) as Promise<ResponseData<string>>
}
// 更新菜单
export const updateMenu = (data: updateMenuData) => {
  return https.put(API.UPDATE_URL, data) as Promise<ResponseData<string>>
}
