import https from '@/utils/https'
import type { userListResponseData ,responseData} from './type'
enum API {
  //获取全部角色列表
  ALLUSER_URL = '/admin/acl/role',
  //新增角色
  ADDROLE_URL = '/admin/acl/role/save',
  //删除角色
  DELETEROLE_URL = '/admin/acl/role/remove',
  //更新角色
  UPDATEROLE_URL = '/admin/acl/role/update',
}
// 获取角色列表
export const getAllUser = (page:number,limit:number,roleName?:string) => {
  return https.get(API.ALLUSER_URL+'/'+page+'/'+limit,{params:{roleName}}) as Promise<userListResponseData>
} 
// 新增角色
export const addRole = (data: {
  "remark": string,
  "roleName": string
}) => {
  return https.post(API.ADDROLE_URL, data) as Promise<responseData<string>>
}
// 删除角色
export const deleteRole = (id:string) => {
  return https.delete(API.DELETEROLE_URL+'/'+id) as Promise<responseData<string>>
}
// 更新角色
export const updateRole = (data: {
  "id": number,
  "remark": string,
  "roleName": string
}) => {
  return https.put(API.UPDATEROLE_URL, data) as Promise<responseData<string>>
}
