<template>
  <div class="goods-container">
      <el-card >
        <div class="header">
          <el-button type="primary">
            <el-icon><Plus></Plus></el-icon>
            添加商品</el-button>
        </div>
        <el-table :data="tableData"  border style="width: 100%;"  >
            <el-table-column prop="id" label="序号" width="240" />
            <el-table-column prop="tmName" label="品牌名称" min-width="100" max-width="300" align="center" />
            <el-table-column prop="logoUrl" label="商品logo"  min-width="100" max-width="300" :lazy="true"  align="center">
              <template #default="scoped">
                <el-image :src="scoped.row.logoUrl" alt="" style="width: 100px; height: 100px;" fit="contain" />
              </template>
            </el-table-column>
            <el-table-column prop="address" label="品牌操作"  fixed="right"  align="center" >
              <template #default>
                <el-button type="primary"  style="margin-right: 20px;">编辑</el-button>
                <el-button type="danger" >删除</el-button>
              </template>
            </el-table-column>
      </el-table>
       <el-pagination
          style="margin-top: 20px;"
          :page-size="pageconfig.pageSize"
          v-model:current-page="pageconfig.currentPage"
          size="default"
          background
          layout="prev, pager, next"
          :total="pageconfig.total"
          class="mt-4"
        />
      </el-card>

  </div>
</template>

<script setup lang="ts">
import {ref,onMounted } from 'vue'
import { getListList } from '@/apis/product/goods'
import type { TrademarkList } from '@/apis/product/goods/type'
const tableData=ref<TrademarkList[]>([])
const getListData=async ()=>{
  const res=await getListList()
  console.log(res.data)
  tableData.value=res.data
}
const pageconfig=ref({
  currentPage:1,
  pageSize:10,
  total:100,
})
onMounted(()=>{
  getListData()
})
</script>

<style scoped>
.el-card {
  padding: 10px;
  .header{
    margin-bottom: 10px;
  }
}
</style>
