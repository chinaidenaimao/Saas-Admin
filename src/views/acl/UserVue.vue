<template>
  <el-card style="margin-bottom: 10px;">
    <el-form ref="form" class="userinfo">
        <el-form-item label="用户名" prop="username" style="margin-bottom: 5px; margin-top: 5px;">
            <el-input  placeholder="请输入用户名" style="width: 200px;" ></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 5px; margin-top: 5px;">
         <template #default>
            <el-button type="primary" >登录</el-button>
            <el-button  >重置</el-button>
         </template>
        </el-form-item>
    </el-form>
  </el-card>
  <el-card>
    <div  style="margin-bottom: 10px;">
      <el-button type="primary" >添加用户</el-button>
      <el-button type="danger"  disabled="">删除用户</el-button>
    </div>
    <div style="margin-bottom: 12px;">
      <el-table :data="data" style="width: 100%" border>
          <el-table-column type="index" label="序号" width="100" align="center">
          </el-table-column>
            <el-table-column label="id" width="100" align="center">
          </el-table-column>
            <el-table-column  label="用户名" width="150" align="center">
          </el-table-column>
            <el-table-column  label="用户名称" width="150" align="center">
          </el-table-column>
            <el-table-column  label="用户角色" width="150" align="center">
          </el-table-column>
            <el-table-column  label="创建时间" width="150" align="center">
          </el-table-column>
            <el-table-column  label="更新时间" width="150 " align="center">
          </el-table-column>
            <el-table-column label="操作" fixed="right" align="center">
              <template #default>
                <el-button type="primary" >
                  <el-icon> <User/></el-icon> 分配角色</el-button>
                <el-button type="primary" >
                  <el-icon> <Edit/></el-icon> 编辑</el-button>
                <el-button type="primary" >
                  <el-icon> <Delete/></el-icon> 删除</el-button>
              </template>
          </el-table-column>
      </el-table>
    </div>
     <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[5, 7, 9, 11]"
            :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="100" @current-change="getHasUser"
            @size-change="handler" />
  </el-card>
</template>

<script setup lang="ts">


</script>

<style scoped>
.userinfo{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
