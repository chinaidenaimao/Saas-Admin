<template>
  <div class="goods-container">
    <el-dialog
      v-model="dialogVisible"
      title="添加商品品牌"
      width="900"
      :before-close="handleClose"
      @closed="handleClose"
    >
      <el-form ref="RefForm" :model="goodsData" label-width="80px" :rules="rules">
        <el-form-item label="序号" v-if="goodsData.id">
          <el-input v-model="goodsData.id" placeholder="请输入序号" disabled></el-input>
        </el-form-item>
        <el-form-item label="品牌名称" prop="tmName">
          <el-input v-model="goodsData.tmName" placeholder="请输入品牌名称"></el-input>
        </el-form-item>
        <el-form-item label="商品logo" prop="logoUrl" >
           <el-upload
              class="avatar-uploader"
              action="/api/admin/product/fileUpload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :headers="uploadHeaders"
            >
              <img v-if="goodsData.logoUrl" :src="goodsData.logoUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="handleSubmitForm">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
      <el-card >
        <div class="header">
        <el-button type="primary" @click="handleAddClick" v-has="'btn.Trademark.add'">
            <el-icon><Plus></Plus></el-icon>
            添加品牌</el-button>
        </div>
        <el-table :data="tableData"  border style="width: 100%;"  >
            <el-table-column prop="id" label="序号" width="240" />
            <el-table-column prop="tmName" label="品牌名称" min-width="100" max-width="300" align="center" />
            <el-table-column prop="logoUrl" label="商品logo"  min-width="100" max-width="300" :lazy="true"  align="center">
              <template #default="scoped">
                <div style="display: flex; justify-content: center; align-items: center;">
                  <img v-lazy-image="scoped.row.logoUrl" alt="" style="width: 100px; height: 100px;" fit="contain"  :key="scoped.row.logoUrl"/>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="品牌操作"  fixed="right"  align="center" >
              <template #default="scoped">
                <el-button type="primary"  style="margin-right: 20px;" @click="handleAddClick(scoped.row)" v-has="'btn.Trademark.update'">编辑</el-button>
                <el-button type="danger" @click="deleteTrademarkdata(scoped.row.id)" v-has="'btn.Trademark.remove'">删除</el-button>
              </template>
            </el-table-column>
      </el-table>
       <el-pagination
          style="margin-top: 20px;"
           v-model:page-size="pageconfig.pageSize"
          v-model:current-page="pageconfig.currentPage"
          size="default"
          background
           layout="slot, sizes, prev, pager,next,->, jumper,"
          :total="pageconfig.total"
          class="mt-4"
          @change="getListPageData"
        >
          <template #default>
            共 {{ pageconfig.total }} 条
          </template>
        </el-pagination>
      </el-card>

  </div>
</template>

<script setup lang="ts">
import {ref,onMounted } from 'vue'
import { getListPage ,saveTrademark,updateTrademark,deleteTrademark} from '@/apis/product/goods'
import type { TrademarkList } from '@/apis/product/goods/type'
import { ElMessage ,ElMessageBox } from 'element-plus'
import type{UploadProps} from 'element-plus'
const tableData=ref<TrademarkList[]>([])
// 分页配置
const pageconfig=ref({
  currentPage:1,
  pageSize:5,
  total:0,
})
// 商品品牌数据
const goodsData=ref({
  id:0,
  tmName:'',
  logoUrl:'',
})
// 表单引用
const RefForm=ref()
// rules
const rules=ref({
  tmName:[{    required:true,
    message:'请输入品牌名称',
    trigger:'blur',
  }],
  logoUrl:[{
    required:true,
    message:'请上传商品logo',
    trigger:'change',
  }],
})
// 上传请求头
const uploadHeaders = {
  token: localStorage.getItem('token') || ''
}
// 弹窗是否显示
const dialogVisible=ref(false)
// 关闭窗口
const handleClose=()=>{
  dialogVisible.value=false
  goodsData.value={id:0,tmName:'',logoUrl:''}
}
// 添加商品
const handleAddClick=(data?:TrademarkList)=>{
  dialogVisible.value=true
  if(data){
    goodsData.value={id:data.id,tmName:data.tmName,logoUrl:data.logoUrl}
  }
}
// 分页查询商品品牌
const getListPageData=async ()=>{
  const res=await getListPage(pageconfig.value.currentPage,pageconfig.value.pageSize)
  tableData.value=res.data.records
  pageconfig.value.total=res.data.total
  pageconfig.value.currentPage=res.data.current
  pageconfig.value.pageSize=res.data.size
}
// 文件上传
const handleAvatarSuccess:UploadProps['onSuccess']=(res)=>{
  goodsData.value.logoUrl=res.data

}
// 上传前校验
const beforeAvatarUpload:UploadProps['beforeUpload']=(file)=>{
  if(file.type=='image/jpeg'||file.type=='image/png'||file.type=='image/gif'){
    if(file.size>1024*1024*5){
      ElMessage.error('图片大小不能超过5MB')
      return false
    }
    else{
      return true
    }
  }
  else{
     ElMessage.error('请上传jpg、png或gif格式的图片')
    return false
  }
}
// 删除商品品牌
 const deleteTrademarkdata = async (id: number) => {
    try {
      await ElMessageBox.confirm('确认删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
    } catch {
      return // 用户点了取消，直接返回
    }
    await deleteTrademark(id)
    ElMessage.success('删除成功')
    getListPageData()
  }
// 提交表单
const  handleSubmitForm=async()=>{
  RefForm.value.validate().then(async ()=>{
      if(goodsData.value.id)
  {
    await updateTrademark({
      id:Number(goodsData.value.id),
      logoUrl:goodsData.value.logoUrl,
      tmName:goodsData.value.tmName,
    })
  }
  else
  {
    await saveTrademark({
      logoUrl:goodsData.value.logoUrl,
      tmName:goodsData.value.tmName,
    })
  }
    ElMessage.success('操作成功')
    dialogVisible.value=false
    getListPageData()
  },()=>{
    return
  })
}

onMounted(()=>{
  // 初始化查询商品品牌
  getListPageData()
})
</script>

<style scoped lang="scss">
.el-card {
  padding: 10px;
    .header{
    margin-bottom: 10px;
  }
}
.dialog-footer{
  text-align: right;
}
.avatar-uploader,.el-upload {
  border: 1px dashed black;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: border-color 0.3s ease-in-out;
}

.avatar-uploader,.el-upload:hover {
  border-color: #409eff;
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar-uploader,.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
