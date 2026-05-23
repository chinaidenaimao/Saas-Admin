<template>
  <div>
    <el-table style="width: 100%"
      :data="menuList"
      row-key="id"
      show-overflow-tooltip
      border
    >
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="code" label="编码" />
      <el-table-column prop="level" label="层级" width="100" align="center">
        <template #default="{ row }">
          <el-tag v-if="row.level === 1">一级菜单</el-tag>
          <el-tag v-else-if="row.level === 2" type="success">二级菜单</el-tag>
          <el-tag v-else-if="row.level === 3" type="warning">三级菜单</el-tag>
          <el-tag v-else type="danger">按钮</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="修改时间" />
      <el-table-column label="操作" width="350" align="center">
        <template #default="{ row }">
          <el-button type="primary" :disabled="row.level === 4" @click="addMenu(row)">
            {{ row.level === 3 ? '添加功能' : '添加菜单' }}
          </el-button>
          <el-button type="primary" :disabled="row.level === 1" @click="edit(row)">编辑</el-button>
          <el-button type="primary" :disabled="row.level === 1" @click="dodeleteMenu(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加/编辑菜单对话框 -->
    <el-dialog v-model="dialogVisible" :title="menuData.id ? '更新菜单' : '添加菜单'" width="500px" :before-close="handleClose">
      <el-form ref="menuFormRef" :model="menuData" :rules="menuRules" label-width="80px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="menuData.name" placeholder="请输入菜单名称" />
        </el-form-item>
        <el-form-item label="编码" prop="code">
          <el-input v-model="menuData.code" placeholder="请输入权限数值" />
        </el-form-item>
        <el-form-item v-if="menuData.id" label="层级">
          <el-tag v-if="menuData.level === 1">一级菜单</el-tag>
          <el-tag v-else-if="menuData.level === 2" type="success">二级菜单</el-tag>
          <el-tag v-else-if="menuData.level === 3" type="warning">三级菜单</el-tag>
          <el-tag v-else type="danger">按钮</el-tag>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getPermission, updateMenu, deleteMenu, saveMenu } from '@/apis/acl/meun'
import type { Permisstion, PermisstionList, saveMenuData } from '@/apis/acl/meun/type'

const menuList = ref<PermisstionList>([])
const dialogVisible = ref(false)
const menuFormRef = ref()

const menuData = ref<saveMenuData & { id?: number }>({
  id: undefined,
  code: '',
  level: 0,
  name: '',
  pid: 0,
})

const menuRules = {
  name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
  code: [{ required: true, message: '请输入权限数值', trigger: 'blur' }],
}

// 获取菜单列表
const getmenuList = async () => {
  const res = await getPermission()
  if (res.ok) {
    menuList.value = res.data
  }
}

// 新增菜单
const addMenu = (row: Permisstion) => {
  menuData.value = {
    id: undefined,
    code: '',
    level: row.level + 1,
    name: '',
    pid: row.id!,
  }
  dialogVisible.value = true
}

// 重置表单数据
const resetForm = () => {
  menuData.value = {
    id: undefined,
    code: '',
    level: 0,
    name: '',
    pid: 0,
  }
  menuFormRef.value?.clearValidate()
}

// 关闭对话框
const handleClose = () => {
  dialogVisible.value = false
  resetForm()
}

// 编辑菜单
const edit = (row: Permisstion) => {
  menuData.value = {
    id: row.id,
    code: row.code,
    level: row.level,
    name: row.name,
    pid: row.pid,
  }
  dialogVisible.value = true
}

// 保存菜单（新增或编辑）
const save = async () => {
  await menuFormRef.value.validate()
  if (menuData.value.id) {
    const res = await updateMenu({
      id: menuData.value.id,
      code: menuData.value.code,
      level: menuData.value.level,
      name: menuData.value.name,
      pid: menuData.value.pid,
    })
    if (res.ok) {
      ElMessage.success('更新成功')
      handleClose()
      getmenuList()
    }
  } else {
    const res = await saveMenu({
      code: menuData.value.code,
      level: menuData.value.level,
      name: menuData.value.name,
      pid: menuData.value.pid,
    })
    if (res.ok) {
      ElMessage.success('添加成功')
      handleClose()
      getmenuList()
    }
  }
}

// 删除菜单
const dodeleteMenu = async (row: Permisstion) => {
  try {
    await ElMessageBox.confirm(`确定要删除"${row.name}"吗？删除后不可恢复`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    const res = await deleteMenu(row.id!)
    if (res.ok) {
      ElMessage.success('删除成功')
      getmenuList()
    }
  } catch {
    // 用户取消
  }
}

onMounted(() => {
  getmenuList()
})
</script>

<style scoped></style>
