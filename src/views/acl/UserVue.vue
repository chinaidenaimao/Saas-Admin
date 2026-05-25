<template>
  <div>
  <el-card style="margin-bottom: 10px;">
    <el-form class="userinfo">
        <el-form-item label="用户名" prop="username" html-for="search-username" style="margin-bottom: 5px; margin-top: 5px;">
            <el-input id="search-username" placeholder="请输入用户名" style="width: 200px;" v-model="searchForm.username"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 5px; margin-top: 5px;">
            <el-button type="primary" @click="searchUser">搜索</el-button>
            <el-button  @click="resetSearch">重置</el-button>
        </el-form-item>
    </el-form>
  </el-card>
  <el-card>
    <div  style="margin-bottom: 10px;">
      <el-button type="primary"  @click="addUser" v-has="'btn.User.add'">添加用户</el-button>
      <el-button type="danger" disabled v-has="'btn.User.remove'">删除用户 </el-button>
    </div>
    <div style="margin-bottom: 12px;">
      <el-table :data="formData" style="width: 100%" border>
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
            <el-table-column  label="更新时间" prop="updateTime" width="180" align="center">
          </el-table-column>
            <el-table-column label="操作" fixed="right" min-width="300" align="center">
              <template #default="scope">
                <el-button type="primary" @click="toAssignRole(scope.row.id, scope.row.username)" v-has="'btn.User.assgin'">
                  <el-icon> <User/></el-icon> 分配角色</el-button>
                <el-button type="primary"  @click="editUser(scope.row)" v-has="'btn.User.update'">
                  <el-icon> <Edit/></el-icon> 编辑</el-button>
                <el-button type="primary" @click="deleteUser(scope.row.id)" v-has="'btn.User.remove'">
                  <el-icon> <Delete/></el-icon> 删除</el-button>
              </template>
          </el-table-column>
      </el-table>
    </div>
     <el-pagination v-model:current-page="pageInfo.current" v-model:page-size="pageInfo.size" :page-sizes="[5, 7, 9, 11]"
            :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="pageInfo.total" @current-change="getHasUser(searchForm.username)"
            @size-change="getHasUser(searchForm.username)" />
  </el-card>
  <el-drawer
    v-model="drawer"
    size="600px"
    direction="rtl"
    :before-close="handleClose"
  >
  <template #header>
    <span>{{ addForm.id ? '编辑用户' : '添加用户' }}</span>
  </template>
  <el-form ref="addFormRef" :model="addForm" label-width="90px" :rules="rules">
    <el-form-item label="用户名" prop="username" html-for="add-username" style=" margin-top: 10px;">
        <el-input id="add-username" placeholder="请输入用户名" style="width: 400px;" v-model="addForm.username"></el-input>
    </el-form-item>
    <el-form-item label="用户昵称" prop="name" html-for="add-name" style=" margin-top: 10px;">
        <el-input id="add-name" placeholder="请输入用户昵称" style="width: 400px;" v-model="addForm.name"></el-input>
    </el-form-item>
    <el-form-item label="用户密码" prop="password" html-for="add-password" style=" margin-top: 10px;" v-if="!addForm.id">
        <el-input id="add-password" type="password" placeholder="请输入用户密码" style="width: 400px;" v-model="addForm.password"></el-input>
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
    direction="rtl"
    :before-close="closeDrawer2"
  >
  <template #header>
    <span>分配角色</span>
  </template>
  <el-form ref="assignRoleFormRef" :model="assignRoleData" label-width="80px">
    <el-form-item label="用户名" html-for="assign-username" style=" margin-top: 10px;">
        <el-input id="assign-username" style="width: 400px;" :model-value="assignUser.username" disabled></el-input>
    </el-form-item>
    <el-form-item label="角色列表" html-for="assign-roles">
            <el-checkbox
          v-model="checkAll"
          :indeterminate="isIndeterminate"
          @change="handleCheckAllChange"
        >
          全选
        </el-checkbox>
        <el-checkbox-group
          id="assign-roles"
          v-model="checkedCities"
          @change="handleCheckedCitiesChange"
        >
          <el-checkbox v-for="item in assignRoleData.allRolesList" :key="item.id" :label="item.id" :value="item.id">
      {{ item.roleName }}
    </el-checkbox>
  </el-checkbox-group>
    </el-form-item>
  </el-form>
  <template #footer>
    <div>
      <el-button  @click="closeDrawer2">取消</el-button>
      <el-button type="primary" @click="commitAssignRole">提交</el-button>
    </div>
  </template>
  </el-drawer>
  </div>
</template>

<script setup lang="ts">
import type { assignRoles, page, userlist } from '@/apis/acl/user/type'
import { getUserList, updateUser, saveUser, removeUserById, toAssignRole as toAssignRoleApi, doAssignRole } from '@/apis/acl/user'
import { nextTick, onMounted, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { CheckboxValueType } from 'element-plus'

// 分页信息
const pageInfo = ref<page>({
  total: 0,
  size: 5,
  current: 1,
  pages: 0,
})
// 用户列表
const formData = ref<userlist[]>([])
// 搜索用户
const searchForm = ref({
  username: '',
})
// 分配角色数据
const assignRoleData = ref<{ assignRoles: assignRoles[]; allRolesList: assignRoles[] }>({
  assignRoles: [],
  allRolesList: [],
})
const assignUser = ref({
  userId: 0,
  username: '',
})
const assignRoleFormRef = ref()
const drawer = ref(false)
const drawer2 = ref(false)
// 表单
const addFormRef = ref()
const addForm = ref({
  id: 0,
  name: '',
  password: '',
  username: '',
})
const rules = {
  name: [{ required: true, message: '请输入用户昵称', trigger: 'blur' }],
  password: [{ required: true, message: '请输入用户密码', trigger: 'blur' }],
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
}
// 多选框
const checkAll = ref(false)
const isIndeterminate = ref(true)
const checkedCities = ref<number[]>([])

// 获取用户列表
const getHasUser = async (username?: string) => {
  const res = await getUserList(pageInfo.value.current, pageInfo.value.size, username)
  pageInfo.value.total = res.data.total
  formData.value = res.data.records
}
// 搜索
const searchUser = () => {
  pageInfo.value.current = 1
  getHasUser(searchForm.value.username)
}
// 重置
const resetSearch = () => {
  searchForm.value.username = ''
  pageInfo.value.current = 1
  getHasUser()
}
// 添加用户
const addUser = () => {
  drawer.value = true
  addForm.value = { id: 0, name: '', password: '', username: '' }
  nextTick(() => {
    addFormRef.value?.clearValidate()
  })
}
// 编辑用户
const editUser = (user: userlist) => {
  drawer.value = true
  addForm.value = {
    id: user.id,
    username: user.username,
    name: user.name,
    password: '',
  }
  nextTick(() => {
    addFormRef.value?.clearValidate()
  })
}
// 提交表单（新增/编辑）
const handleSubmitForm = async () => {
  try {
    await addFormRef.value.validate()
  } catch {
    return
  }
  try {
    if (addForm.value.id) {
      await updateUser({
        id: addForm.value.id,
        username: addForm.value.username,
        name: addForm.value.name,
      })
    } else {
      await saveUser({
        username: addForm.value.username,
        name: addForm.value.name,
        password: addForm.value.password,
      })
    }
    ElMessage.success('操作成功')
    drawer.value = false
    getHasUser()
  } catch {
    ElMessage.error('操作失败')
  }
}
// 分配角色
const toAssignRole = async (id: number, username: string) => {
  assignUser.value.userId = id
  assignUser.value.username = username
  const res = await toAssignRoleApi(id)
  assignRoleData.value.allRolesList = res.data.allRolesList
  assignRoleData.value.assignRoles = res.data.assignRoles
  checkedCities.value = res.data.assignRoles.map((item) => item.id)
  checkAll.value = res.data.assignRoles.length === res.data.allRolesList.length
  isIndeterminate.value = res.data.assignRoles.length > 0 && res.data.assignRoles.length < res.data.allRolesList.length
  drawer2.value = true
}
// 全选
const handleCheckAllChange = (val: CheckboxValueType) => {
  checkedCities.value = val ? assignRoleData.value.allRolesList.map((item) => item.id) : []
  isIndeterminate.value = false
}
const handleCheckedCitiesChange = (value: CheckboxValueType[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === assignRoleData.value.allRolesList.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < assignRoleData.value.allRolesList.length
}
// 提交分配角色
const commitAssignRole = async () => {
  try {
    await doAssignRole({
      userId: assignUser.value.userId,
      roleIdList: checkedCities.value as number[],
    })
    ElMessage.success('分配角色成功')
    getHasUser()
    closeDrawer2()
  } catch {
    ElMessage.error('分配角色失败')
  }
}
// 删除用户
const deleteUser = async (id: number) => {
  try {
    await ElMessageBox.confirm('确认删除吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    await removeUserById(id)
    ElMessage.success('删除成功')
    getHasUser()
  } catch {
    // 用户取消或删除失败
  }
}
// 关闭分配角色抽屉
const closeDrawer2 = () => {
  checkedCities.value = []
  checkAll.value = false
  isIndeterminate.value = true
  assignUser.value.userId = 0
  assignUser.value.username = ''
  drawer2.value = false
}
// 关闭添加/编辑抽屉
const handleClose = () => {
  ElMessageBox.confirm('确认关闭吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    drawer.value = false
  })
}

onMounted(() => {
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
