<template>
  <el-form label-width="100px">
    <el-form-item label="SKU名称">
      <el-input placeholder="SKU名称" v-model="skuParams.skuName"></el-input>
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input placeholder="价格(元)" type="number" v-model="skuParams.price"></el-input>
    </el-form-item>
    <el-form-item label="重量(g)">
      <el-input placeholder="重量(g)" type="number" v-model="skuParams.weight"></el-input>
    </el-form-item>
    <el-form-item label="SKU描述">
      <el-input placeholder="SKU描述" type="textarea" v-model="skuParams.skuDesc"></el-input>
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form :inline="true">
        <el-form-item v-for="item in attrArr" :key="item.id" :label="item.attrName">
          <el-select v-model="item.attrIdAndValueId">
            <el-option :value="`${item.id}:${attrValue.id}`"
              v-for="attrValue in item.attrValueList" :key="attrValue.id"
              :label="attrValue.valueName"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form :inline="true">
        <el-form-item :label="item.saleAttrName" v-for="item in saleArr" :key="item.id">
          <el-select v-model="item.saleIdAndValueId">
            <el-option :value="`${item.id}:${saleAttrValue.id}`"
              v-for="saleAttrValue in item.spuSaleAttrValueList" :key="saleAttrValue.id"
              :label="saleAttrValue.saleAttrValueName"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片名称">
      <el-table border :data="imgArr" ref="table">
        <el-table-column type="selection" width="80px" align="center"></el-table-column>
        <el-table-column label="图片">
          <template #default="{ row }">
            <img :src="row.imgUrl" style="width:100px;height:100px;">
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="imgName"></el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handler(row)">设置默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="default" @click="save">保存</el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { getAttrInfoList } from '@/apis/product/category'
import { reqSpuImageList, reqSpuHasSaleAttr, reqAddSku } from '@/apis/product/spu'
import type { SkuData, SpuImg, SkuFormAttr, SkuFormSaleAttr } from '@/apis/product/spu/type'
import type { ResponseData } from '@/apis/product/spu/type'
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
import type { TableInstance } from 'element-plus'

const $emit = defineEmits<{ (e: 'changeScene', obj: { flag: number; params: string }): void }>()

const attrArr = ref<SkuFormAttr[]>([])
const saleArr = ref<SkuFormSaleAttr[]>([])
const imgArr = ref<SpuImg[]>([])
const table = ref<TableInstance>()

const skuParams = reactive<SkuData>({
  category3Id: '', spuId: '', tmId: '',
  skuName: '', price: '', weight: '', skuDesc: '',
  skuAttrValueList: [], skuSaleAttrValueList: [],
  skuDefaultImg: '',
})

const initSkuData = async (c1Id: number | string, c2Id: number | string, spu: SkuData) => {
  skuParams.category3Id = spu.category3Id
  skuParams.spuId = spu.spuId ?? ''
  skuParams.tmId = spu.tmId ?? ''
  const result = await getAttrInfoList(c1Id as number, c2Id as number, spu.category3Id as number)
  const result1 = await reqSpuHasSaleAttr(spu.spuId as number)
  const result2 = await reqSpuImageList(spu.spuId as number)
  attrArr.value = result.data
  saleArr.value = result1.data
  imgArr.value = result2.data
}

const cancel = () => { $emit('changeScene', { flag: 0, params: '' }) }

const handler = (row: SpuImg) => {
  imgArr.value.forEach((item: SpuImg) => { table.value!.toggleRowSelection(item, false) })
  table.value!.toggleRowSelection(row, true)
  skuParams.skuDefaultImg = row.imgUrl ?? ''
}

const save = async () => {
  skuParams.skuAttrValueList = attrArr.value.reduce((prev: NonNullable<SkuData['skuAttrValueList']>, next: SkuFormAttr) => {
    if (next.attrIdAndValueId) {
      const [attrId, valueId] = next.attrIdAndValueId.split(':')
      prev.push({ attrId, valueId })
    }
    return prev
  }, [])
  skuParams.skuSaleAttrValueList = saleArr.value.reduce((prev: NonNullable<SkuData['skuSaleAttrValueList']>, next: SkuFormSaleAttr) => {
    if (next.saleIdAndValueId) {
      const [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':')
      prev.push({ saleAttrId, saleAttrValueId })
    }
    return prev
  }, [])
  const result: ResponseData<string> = await reqAddSku(skuParams)
  if (result.code == 200) {
    ElMessage({ type: 'success', message: '添加SKU成功' })
    $emit('changeScene', { flag: 0, params: '' })
  } else {
    ElMessage({ type: 'error', message: '添加SKU失败' })
  }
}

defineExpose({ initSkuData })
</script>
