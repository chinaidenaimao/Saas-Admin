<template>
  <el-card style="margin-bottom: 10px;">
    <el-form ref="form" class="userinfo">
        <el-form-item label="用户名" prop="username" style="margin-bottom: 5px; margin-top: 5px;">
            <el-input  placeholder="请输入用户名" style="width: 200px;" v-model="searchform.username"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 5px; margin-top: 5px;">
         <template #default>
            <el-button type="primary" @click="searchUser">搜索</el-button>
            <el-button  @click="resetSearch">重置</el-button>
         </template>
        </el-form-item>
    </el-form>
  </el-card>
  <el-card>
    <div  style="margin-bottom: 10px;">
      <el-button type="primary"  @click="adduser">添加用户</el-button>
      <el-button type="danger"  disabled="">删除用户</el-button>
    </div>
    <div style="margin-bottom: 12px;">
      <el-table :data="formdata" style="width: 100%" border>
          <el-table-column type="index" label="序号" width="100" align="center">
          </el-table-column>
            <el-table-column label="id" prop="id" width="180" align="center">
          </el-table-column>
            <el-table-column  label="用户名" prop="username" width="150" align="center">
          </el-table-column>
            <el-table-column  label="用户名称" prop="name" width="180" align="center">
          </el-table-column>
            <el-table-column  label="用户角色" prop="roleName" width="180" align="center">
          </el-table-column>
            <el-table-column  label="创建时间" prop="createTime" width="180" align="center">
          </el-table-column>
            <el-table-column  label="更新时间" prop="updateTime" width="180 " align="center">
          </el-table-column>
            <el-table-column label="操作" fixed="right" min-width="300" align="center">
              <template #default="scope">
                <el-button type="primary" >
                  <el-icon> <User/></el-icon> 分配角色</el-button>
                <el-button type="primary"  @click="editUser(scope.row)">
                  <el-icon> <Edit/></el-icon>  编辑</el-button>
                <el-button type="primary" @click="deleteUser(scope.row.id)">
                  <el-icon> <Delete/></el-icon> 删除</el-button>
              </template>
          </el-table-column>
      </el-table>
    </div>
     <el-pagination v-model:current-page="pageinfo.current" v-model:page-size="pageinfo.size" :page-sizes="[5, 7, 9, 11]"
            :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="pageinfo.total" @current-change="getHasUser(searchform.username)"
            @size-change="getHasUser(searchform.username)" />
  </el-card>
  <el-drawer
    v-model="drawer"
    size="600px"
    :direction="direction"
    :before-close="handleClose"
  >
  <template #title>
    <span>添加用户</span>
  </template>
  <el-form ref="addformref" :model="addform" label-width="90px" :rules="rules">
    <el-form-item label="用户姓名" prop="username" style=" margin-top: 10px;">
        <el-input  placeholder="请输入用户姓名" style="width: 400px;" v-model="addform.username"></el-input>
    </el-form-item>
    <el-form-item label="用户昵称" prop="name" style=" margin-top: 10px;">
        <el-input  placeholder="请输入用户昵称" style="width: 400px;" v-model="addform.name"></el-input>
    </el-form-item>
    <el-form-item label="用户密码" prop="password" style=" margin-top: 10px;" v-if="!addform.id">
        <el-input  placeholder="请输入用户密码" style="width: 400px;" v-model="addform.password"></el-input>
    </el-form-item>
    <el-form-item label="">
      <el-button type="primary" @click="handleSubmitForm">提交</el-button>
      <el-button @click="drawer = false">取消</el-button>
    </el-form-item>
  </el-form>
  </el-drawer>
    <el-drawer
    v-model="drawer2"
    size="600px"
    :direction="direction"
    :before-close="handleClose"
  >
  </el-drawer>
</template>

<script setup lang="ts">
import type { assignRoles,page,userlist } from '@/apis/acl/user/type'
import { getUserList,updateUser,saveUser,removeUserById,assignRole,doAssignRole } from '@/apis/acl/user'
import { nextTick, onMounted, ref } from 'vue'
import {  ElMessage, ElMessageBox } from 'element-plus'
// 分页信息
const pageinfo = ref<page>({
  total: 0,
  size: 5,
  current: 1,
  pages: 0,
})
// 用户列表
const formdata = ref<userlist[]>([
  { createTime: '',
    updateTime: '',
    id: 0,
    username: '',
    roleName: '',
    password: '',
    name: '',
    phone: '',}
])
// 搜索用户
const searchform = ref({
  username: '',
})
const searchUser=async()=>{
  getHasUser(searchform.value.username)
}
// 重置
const resetSearch=()=>{
  searchform.value.username=''
  getHasUser()
}
// 添加用户
const adduser=()=>{
  drawer.value = true
  Object.assign(addform.value,{
    id:0,
    "name": '',
    "password": '',
    "username": ''
  })
  nextTick(() => {
        addformref.value.clearValidate('username');
        addformref.value.clearValidate('name');
        addformref.value.clearValidate('password');
    })
}
//// 编辑用户
const editUser=(user: userlist)=>{
  console.log(user)
  drawer.value = true
  addform.value.name=user.name
  addform.value.username=user.username
  addform.value.password=user.password
  addform.value.id=user.id
  nextTick(() => {
        addformref.value.clearValidate('username');
        addformref.value.clearValidate('name');
    })
}
// 删除用户
const deleteUser=async(id:number)=>{
  try{
    ElMessageBox.confirm('确认删除吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async () => {
      try{
        await removeUserById(id)
        ElMessage.success('删除成功')
        getHasUser()
      }
      catch{
        ElMessage.error('删除失败')
      }
    })
  }
  catch{
    ElMessage.error('删除操作已取消')
  }
}
// 分抽屉状态
const drawer = ref(false)
const drawer2 = ref(false)
const direction = ref('rtl')
const handleClose = () => {
  ElMessageBox.confirm('确认关闭吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    drawer.value = false
    addform.value.id=0
    addform.value.name=''
    addform.value.password=''
    addform.value.username=''
  })
}
// 分配查询用户
const getHasUser=async(username?:string)=>{
  const res=await getUserList(pageinfo.value.current,pageinfo.value.size,username)
  console.log(res.data)
  pageinfo.value.total=res.data.total
  formdata.value=res.data.records
}
// 抽屉提交表单
const addformref=ref()
const addform=ref({
  id:0,
  "name": '',
  "password": '',
  "username": ''
})
const rules = ref({
  name: [{ required: true, message: '请输入用户姓名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入用户密码', trigger: 'blur' }],
  username: [{ required: true, message: '请输入用户昵称', trigger: 'blur' }],
})
// 提交表单
const handleSubmitForm=async()=>{
  addformref.value.validate().then(async ()=>{
      if(addform.value.id)
  {
    await updateUser({
      id:addform.value.id,
      username:addform.value.username,
      name:addform.value.name,
    })
  }
  else
  {
     await saveUser({
      username:addform.value.username,
      name:addform.value.name,
      password:addform.value.password,
    })
  }

    ElMessage.success('操作成功')
    drawer.value=false
    getHasUser()
    addform.value.id=0
    addform.value.name=''
    addform.value.password=''
    addform.value.username=''
  },()=>{
    return
  })
}
onMounted(()=>{
  getHasUser()
})
</script>

<style scoped>
.userinfo{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
