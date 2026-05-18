<template>
  <div>
    <el-card class="search-card">
      <el-form ref="RefForm" :model="formdata" label-width="80px" >
        <el-form-item label="一级分类">
            <el-select v-model="formdata.first" placeholder="请选择一级分类"  @change="getCategorytwo(Number(formdata.first))">
                <el-option v-for="item in optionsdata?.first" :key="item.name" :label="item.name" :value="item.id">
                </el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="二级分类" >
            <el-select v-model="formdata.two" placeholder="请选择二级分类"  @change="getCategorythree(Number(formdata.two))">
                <el-option v-for="item in optionsdata?.two" :key="item.name" :label="item.name" :value="item.id">
                </el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="三级分类" >
            <el-select v-model="formdata.three" placeholder="请选择三级分类"  @change="getAttrInfoListdata">
                <el-option v-for="item in optionsdata?.three" :key="item.name" :label="item.name" :value="item.id">
                </el-option>
            </el-select>
          </el-form-item>
      </el-form>
    </el-card>
    <el-card class="attr-card" v-show="typeTable==0">
      <el-button type="primary" :disabled="!formdata.three" style="margin-bottom: 10px;" @click="typeTable=1">
        <el-icon>
          <Plus />
        </el-icon>
        <span>
          添加平台属性
        </span>
      </el-button>
      <el-table :data="tableData" style="width: 100%" border stripe>
        <template #empty>
          <div>暂无数据</div>
        </template>
          <el-table-column type="index" width="100" label="序号"  ></el-table-column>
          <el-table-column prop="attrName" width="300" label="属性名称"></el-table-column>
          <el-table-column width="width" label="属性值名称">
            <template #default="scope">
             <div class="tag" >
              <el-tag type="primary" v-for="value in scope.row.attrValueList" :key="value.valueName" style="margin-right: 10px; margin-bottom: 5px; margin-top: 5px;"> {{value.valueName}}</el-tag>
             </div>
            </template>
          </el-table-column>
          <el-table-column width="200" label="操作" align="center" fixed="right">
            <template #default="scope">
              <el-button type="primary" @click="handleEditClick(scope.row)">
                <el-icon>
                  <Edit />
                </el-icon>
              </el-button >
              <el-button type="danger" @click="handleDeleteClick(scope.row)">
                <el-icon>
                  <Delete />
                </el-icon>
              </el-button>
            </template>
          </el-table-column>
      </el-table>
    </el-card>
    <el-card class="attr-card" v-show="typeTable==1">
      <el-form ref="updataForm" :model="updataInfo" label-width="80px" class="attr-form" :rules="rules">
        <el-form-item label="属性名称" prop="attrName">
          <el-input v-model="updataInfo.attrName" placeholder="请输入属性名称"></el-input>
        </el-form-item>
        <el-form-item label-width="10px">
          <template #default>
            <el-button type="primary" @click="addarrtValue">
              <el-icon>
                <Plus />
              </el-icon>
              添加属性值</el-button>
            <el-button @click="resetForm">取消</el-button>
          </template>
        </el-form-item>
          <el-table :data="updataInfo.attrValueList" style="width: 100%" border stripe>
            <el-table-column type="index" width="100" label="序号" align="center">
            </el-table-column>
            <el-table-column prop="valueName"  label="属性值">
              <template #default="scope,">
                <el-input v-if="scope.row.flag" :ref="(el: any) => { if(el) inputArr[scope.$index]=el }" v-model="scope.row.valueName" placeholder="请输入属性值" @blur="blurchange(scope.row,scope.$index)"/>
                <div v-else @click="changeFlag(scope.$index)" style="cursor: pointer; padding: 4px 8px; min-height: 32px; line-height: 32px;">
                  {{ scope.row.valueName || '点击编辑' }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="valueName" width="300" label="操作" fixed="right">
              <template #default="scope">
                <el-button type="danger" @click="deletearrtValue(scope.$index)">
                  <el-icon>
                    <Delete />
                  </el-icon>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-form-item label-width="0px">
            <el-button type="primary" @click="handleSubmitForm">保存</el-button>
            <el-button type="primary" @click="resetForm">取消</el-button>
          </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import type {CategoryFormdata,CategoryFormdata1,CategoryFormdata2,Attr, AttrValue} from '@/apis/product/category/type'
import { getAttrInfoList,getCategoryfirst,getCategorysecond,getCategorythird,saveAttrInfo,deleteAttrInfo } from '@/apis/product/category'
import {  nextTick, onMounted, ref,watch } from 'vue'
import { ElMessage,ElMessageBox } from 'element-plus'
// 分类数据
const RefForm=ref()
const optionsdata=ref({
  first:[] as CategoryFormdata[],
  two:[] as CategoryFormdata1[],
  three:[] as CategoryFormdata2[],
})
// 表单数据
  const formdata=ref({
  first:'',
  two:'',
  three:'',
  prop:'',
  value:'',
})
// 监听三级分类变化
watch(()=>formdata.value.three,(value)=>{
  if(value){
    getAttrInfoListdata()
    updataInfo.value.categoryId=Number(value)
    updataInfo.value.categoryLevel=3
  }
  else{
    tableData.value=[]
    typeTable.value=0
  }
})
// 表格数据
const tableData=ref<Attr[]>([])
// 查询一级分类
const getCategoryone=async()=>{
  formdata.value.first=''
  formdata.value.two=''
  formdata.value.three=''
  const res=await getCategoryfirst()
  optionsdata.value.first=res.data
}
// 查询二级分类
const getCategorytwo=async(id:number)=>{
  formdata.value.two=''
  formdata.value.three=''
  const res=await getCategorysecond(id)
  optionsdata.value.two=res.data
  optionsdata.value.three=[]
}
// 查询三级分类
const getCategorythree=async(id:number)=>{
  formdata.value.three=''
  const res=await getCategorythird(id)
  optionsdata.value.three=res.data
}
// 查询平台属性
const getAttrInfoListdata=async()=>{
  const res=await getAttrInfoList(Number(formdata.value.first),Number(formdata.value.two),Number(formdata.value.three))
  tableData.value=res.data
  typeTable.value=0
}
// 编辑平台属性
const handleEditClick=(row:Attr)=>{
  updataInfo.value={...row,attrValueList:row.attrValueList.map((item) => ({...item,flag:false})) as AttrValue[]}
  typeTable.value=1
}
// 删除平台属性
const handleDeleteClick=(row:Attr)=>{
  ElMessageBox.confirm('确认删除吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    const res=await deleteAttrInfo(Number(row.id))
    if(res.code==200){
      ElMessage.success('删除成功')
      getAttrInfoListdata()
    }
  }).catch(() => {
    // 取消删除
  });
}
// table的类型
const typeTable=ref(0)
//更新平台属性
const updataForm=ref()
const updataInfo=ref<Attr>({
  attrName:'',
  categoryId:0,
  categoryLevel:3,
  attrValueList:[] as AttrValue[],
 })
//  输入框引用
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const inputArr = ref<any>([]);
 // 添加属性值
 const attrValue=ref<AttrValue>({
  valueName:'',
  flag:false,
  })
// 切换输入框状态
const changeFlag=(index:number)=>{
  updataInfo.value.attrValueList[index].flag=true
  nextTick(()=>{
    inputArr.value[index].focus()
  })
}
// 失去焦点时触发
const blurchange=(row:AttrValue,index:number)=>{
  if(!row.valueName.trim())
{
  ElMessage.error('属性值不为空')
  updataInfo.value.attrValueList.splice(index,1)
  return
}
  row.valueName=row.valueName.trim()
 const repeat = updataInfo.value.attrValueList.find((item) => {
        //切记把当前失却焦点属性值对象从当前数组扣除判断
        if (item != row) {
            return item.valueName === row.valueName;
        }
    });
  if(repeat){
    ElMessage.error('属性值已存在')
    updataInfo.value.attrValueList.splice(index,1)
    return
  }
  updataInfo.value.attrValueList[index].flag=false
}
// rules
const rules=ref({
  attrName:[{    required:true,
    message:'请输入属性名称',
    trigger:'blur',
  }],
})
// 添加属性值
const addarrtValue=()=>{
  attrValue.value.valueName=''
  updataInfo.value.attrValueList.push({...attrValue.value, flag: true})
  nextTick(()=>{
    inputArr.value[updataInfo.value.attrValueList.length-1].focus()
  })
}
// 删除属性值
const deletearrtValue=(index:number)=>{
  updataInfo.value.attrValueList.splice(index,1)
}
// 保存
const handleSubmitForm=async()=>{
  try{
    await updataForm.value.validate()
  }
  catch{
    return
  }
  if(updataInfo.value.attrName.trim()==''){
    ElMessage.error('请输入属性名称')
    return
  }
  if(updataInfo.value.attrValueList.length==0){
    ElMessage.error('请输入属性值')
    return
  }
  const res=await saveAttrInfo(updataInfo.value)
  if(res.code==200){
    ElMessage.success('保存成功')
    resetForm()
  }
}
// 取消
const resetForm=()=>{
  updataInfo.value={attrName:'',categoryId:0,categoryLevel:3,attrValueList:[] as AttrValue[]}
  attrValue.value={valueName:'',flag:false}
  inputArr.value=[]
  typeTable.value=0
  getAttrInfoListdata()
}
onMounted(()=>{
getCategoryone()
})
</script>

<style scoped lang="scss">
.el-form{
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: center;
  padding: 0;
  margin: 0;
  .el-form-item{
    margin-bottom: 10px;
    margin-top: 10px;
    .el-select{
      width: 300px;
    }
  }
}
.attr-card{
  margin-top: 20px;
}
.tag{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.attr-form{
  flex-direction: column;
}
</style>
