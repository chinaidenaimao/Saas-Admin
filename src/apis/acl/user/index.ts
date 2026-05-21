import https from '@/utils/https'
import type { userListResponseData, responseData,assignRoles } from './type'
enum API {
  // 用户列表
  USER_LIST_URL = '/admin/acl/user',
  // 保存用户
  USER_SAVE_URL = '/admin/acl/user/save',
  // 更新用户
  USER_UPDATE_URL = '/admin/acl/user/update',
  // 批量删除用户
  USER_BATCH_REMOVE_URL = '/admin/acl/user/batchRemove',
  // 给用户分配角色
  USER_DO_ASSIGN_ROLE_URL = '/admin/acl/user/doAssignRole',
  // 删除用户
  USER_REMOVE_URL = '/admin/acl/user/remove',
  // 用户角色分配
  USER_TO_ASSIGN_ROLE_URL = '/admin/acl/user/toAssign',
}
/**
 * 获取用户列表
 * @param page 页码
 * @param limit 每页数量
*/
export const getUserList = (page: number, limit: number,username?:string) =>
  https.get(API.USER_LIST_URL+'/'+page+'/'+limit,{params:{username}}) as Promise<userListResponseData>
/**
 * 更新用户
 * @param data 更新用户数据
*/
export const updateUser = (data: {
  "id": number,
  "name": string,
  "username": string
}) =>
  https.put(API.USER_UPDATE_URL,data) as Promise<responseData<string>>
/**
 * 保存用户
 * @param data 保存用户数据
*/
export const saveUser = (data: {
  "name": string,
  "password": string,
  "username": string
}) =>
  https.post(API.USER_SAVE_URL,data) as Promise<responseData<string>>
/**
 * 批量删除用户
 * @param adminId 用户id列表
*/
export const removeUser = (adminId: number[]) =>
  https.delete(API.USER_BATCH_REMOVE_URL,{data:adminId}) as Promise<responseData<string>>
/**
 * 给用户分配角色
 * @param data 给用户分配角色数据
*/
export const doAssignRole = (data: {
  "userId": number,
  "roleIdList": number[]
}) =>
  https.post(API.USER_DO_ASSIGN_ROLE_URL,data) as Promise<responseData<string>>
/**
 * 删除用户
 * @param adminId 用户id
*/
export const removeUserById = (adminId: number) =>
  https.delete(API.USER_REMOVE_URL+'/'+adminId) as Promise<responseData<string>>
/**
 * 给用户分配角色
 * @param data 给用户分配角色数据
*/
export const toAssignRole = (data:number) =>
  https.get(API.USER_TO_ASSIGN_ROLE_URL+'/'+data) as Promise<responseData<{assignRoles:assignRoles[],allRolesList:assignRoles[]}>>
