<template>
  <div>
  <el-card style="margin-bottom: 10px;">
    <el-form class="userinfo" >
        <el-form-item label="角色名称" prop="roleName" html-for="search-roleName" style="margin-bottom: 5px; margin-top: 5px;">
            <el-input id="search-roleName" placeholder="请输入角色名称" style="width: 200px;" v-model="searchForm.roleName"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 5px; margin-top: 5px;">
            <el-button type="primary" @click="searchRole">搜索</el-button>
            <el-button  @click="resetSearch">重置</el-button>
        </el-form-item>
    </el-form>
  </el-card>
  <el-card>
    <div  style="margin-bottom: 10px;">
      <el-button type="primary"  @click="openDrawer(undefined)">添加角色</el-button>
      <el-button type="danger" disabled>删除角色</el-button>
    </div>
    <div style="margin-bottom: 12px;">
      <el-table :data="assignRoleData" style="width: 100%" border>
          <el-table-column type="index" label="序号" width="100" align="center">
          </el-table-column>
            <el-table-column label="id" prop="id" width="250" align="center">
          </el-table-column>
            <el-table-column  label="角色名称" prop="roleName" width="250" align="center">
          </el-table-column>
            <el-table-column  label="创建时间" prop="createTime" width="250" align="center">
          </el-table-column>
            <el-table-column  label="更新时间" prop="updateTime" width="250" align="center">
          </el-table-column>
            <el-table-column label="操作" fixed="right" min-width="300" align="center">
              <template #default="scope">
                <el-button type="primary" >
                  <el-icon> <User/></el-icon> 分配角色</el-button>
                <el-button type="primary"  @click="openDrawer(scope.row)">
                  <el-icon> <Edit/></el-icon>  编辑</el-button>
                <el-button type="primary" @click="deleteUser(scope.row.id)">
                  <el-icon> <Delete/></el-icon> 删除</el-button>
              </template>
          </el-table-column>
      </el-table>
    </div>
     <el-pagination v-model:current-page="pageInfo.current" v-model:page-size="pageInfo.size" :page-sizes="[5, 7, 9, 11]"
            :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="pageInfo.total" @current-change="getAllRole"
            @size-change="getAllRole" />
  </el-card>
   <el-drawer
    v-model="drawer"
    size="600px"
    direction="rtl"
    :before-close="handleClose"
  >
  <template #header>
    <span>{{ updateForm.id ? '编辑角色' : '添加角色' }}</span>
  </template>
  <el-form ref="updateFormRef" :model="updateForm" label-width="90px" :rules="rules">
    <el-form-item label="角色名称" prop="roleName" html-for="update-roleName" style=" margin-top: 10px;">
        <el-input id="update-roleName" placeholder="请输入角色名称" style="width: 400px;" v-model="updateForm.roleName"></el-input>
    </el-form-item>
    <el-form-item label="">
      <el-button type="primary" @click="handleSubmitForm">提交</el-button>
      <el-button @click="drawer = false">取消</el-button>
    </el-form-item>
  </el-form>
  </el-drawer>

  <el-drawer
    v-model="drawer2"
    size="500px"
    direction="rtl"
    :before-close="closeDrawer2"
  >
  <template #header>
    <span>分配角色权限</span>
  </template>
  <div>
    <el-tree
      ref="treeRef"
      :data="menuData"
      show-checkbox
      node-key="id"
      :default-checked-keys="checkedKeys"
      :props="{ label: 'name', children: 'children' }"
      default-expand-all
    />
  </div>
  <template #footer>
    <div style="display: flex; justify-content: flex-end;">
      <el-button @click="drawer2 = false">取消</el-button>
      <el-button type="primary" @click="handleAssignSubmit">确定</el-button>
    </div>
  </template>
  </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getAllUser ,deleteRole,updateRole,addRole} from '@/apis/acl/drole'
import type { page,assignRoles} from '@/apis/acl/drole/type'
// 分页信息
const pageInfo = ref<page>({
  total: 0,
  size: 5,
  current: 1,
  pages: 0,
})
const drawer=ref(false)
const rules = ref({
  roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
})
const updateFormRef=ref()
// 分配角色数据
const assignRoleData = ref<assignRoles[]>([])
// 更新角色数据
const updateForm = ref({
  id: 0,
  remark: '',
  roleName: '',
})
// 搜索表单
const searchForm = ref({
  roleName: '',
})
// 获取所有角色
const getAllRole = async () => {
  const res = await getAllUser(pageInfo.value.current, pageInfo.value.size,searchForm.value.roleName)
  console.log(res)
  if (res.ok) {
    assignRoleData.value = res.data.records
    pageInfo.value.total = res.data.total
    pageInfo.value.pages = res.data.pages
    pageInfo.value.current = res.data.current
    pageInfo.value.size = res.data.size
  }
}
// 搜索角色
const searchRole = async () => {
  pageInfo.value.current = 1
  pageInfo.value.total = 0
  pageInfo.value.pages = 0
  pageInfo.value.size = 5
  getAllRole()
}
// 重置搜索
const resetSearch = () => {
    pageInfo.value.current = 1
    pageInfo.value.total = 0
    pageInfo.value.pages = 0
    pageInfo.value.size = 5
  searchForm.value.roleName = ''
  getAllRole()
}

// 删除角色
const deleteUser = async (id:string) => {
  const res = await deleteRole(id)
  if (res.ok) {
    getAllRole()
  }
}
// 更新角色
const updateUser = async () => {
  const res = await updateRole(updateForm.value)
  if (res.ok) {
    getAllRole()
  }
}
// 打开抽屉
const openDrawer = (row:assignRoles|undefined) => {
  if (!row) {
    updateForm.value = {
      id: 0,
      remark: '',
      roleName: '',
    }
    drawer.value = true
    return
  }
  updateForm.value = {...row}
  drawer.value = true
}
// 关闭抽屉
const handleClose = () => {
  drawer.value = false
  updateForm.value = {
    id: 0,
    remark: '',
    roleName: '',
  }
}
// 提交表单
const handleSubmitForm = async () => {
  await updateFormRef.value.validate()
  if (updateForm.value.id) {
    updateUser()
  } else {
    addRole(updateForm.value)
  }
  handleClose()
  getAllRole()
}
onMounted(() => {
  getAllRole()
})
</script>

<style scoped>
.userinfo{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
