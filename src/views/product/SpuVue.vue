<template>
  <div>
    <Category :scene="scene"></Category>
    <el-card style="margin:10px 0px">
      <div v-show="scene == 0">
        <el-button @click="addSpu" type="primary" size="default" icon="Plus"
          :disabled="categoryStore.c3Id ? false : true" v-has="'btn.Spu.add'">添加SPU</el-button>
        <el-table style="margin: 10px 0px;" border :data="records">
          <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column label="SPU描述" prop="description" show-overflow-tooltip></el-table-column>
          <el-table-column label="SPU操作">
            <template #default="{ row }">
              <el-button type="primary" size="small" icon="Plus" title="添加SKU" @click="addSku(row)" v-has="'btn.Sku.add'"></el-button>
              <el-button type="primary" size="small" icon="Edit" title="修改SPU" @click="updateSpu(row)" v-has="'btn.Spu.update'"></el-button>
              <el-button type="primary" size="small" icon="View" title="查看SKU列表" @click="findSku(row)" v-has="'btn.Spu.skus'"></el-button>
              <el-popconfirm :title="`你确定删除${row.spuName}?`" width="200px" @confirm="deleteSpu(row)">
                <template #reference>
                  <el-button type="primary" size="small" icon="Delete" title="删除SPU" v-has="'btn.Spu.delete'"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize"
          :page-sizes="[3, 5, 7, 9]" :background="true"
          layout="prev, pager, next, jumper,->,sizes,total" :total="total"
          @current-change="getHasSpu" @size-change="changeSize" />
      </div>
      <SpuForm ref="spu" v-show="scene == 1" @changeScene="changeScene"></SpuForm>
      <SkuForm ref="sku" v-show="scene == 2" @changeScene="changeScene"></SkuForm>
      <el-dialog v-model="show" title="SKU列表">
        <el-table border :data="skuArr">
          <el-table-column label="SKU名字" prop="skuName"></el-table-column>
          <el-table-column label="SKU价格" prop="price"></el-table-column>
          <el-table-column label="SKU重量" prop="weight"></el-table-column>
          <el-table-column label="SKU图片">
            <template #default="{ row }">
              <img :src="row.skuDefaultImg" style="width:100px;height:100px;">
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import type { HasSpuResponseData, Records, SkuInfoData, SkuData, SpuData } from '@/apis/product/spu/type'
import type { ResponseData } from '@/apis/product/spu/type'
import { ref, watch, onBeforeUnmount } from 'vue'
import { reqHasSpu, reqSkuList, reqRemoveSpu } from '@/apis/product/spu'
import { useCategoryStore } from '@/stores/category'
import SpuForm from './spu/spuForm.vue'
import SkuForm from './spu/skuForm.vue'
import { ElMessage } from 'element-plus'
import Category from '@/components/Category.vue'

const categoryStore = useCategoryStore()
const scene = ref<number>(0)
const pageNo = ref<number>(1)
const pageSize = ref<number>(3)
const records = ref<Records>([])
const total = ref<number>(0)
const spu = ref<InstanceType<typeof SpuForm>>()
const sku = ref<InstanceType<typeof SkuForm>>()
const skuArr = ref<SkuData[]>([])
const show = ref<boolean>(false)

watch(() => categoryStore.c3Id, () => {
  records.value = []
  if (!categoryStore.c3Id) return
  getHasSpu()
})

const getHasSpu = async (pager = 1) => {
  pageNo.value = pager
  const result: HasSpuResponseData = await reqHasSpu(pageNo.value, pageSize.value, categoryStore.c3Id)
  if (result.code == 200) {
    records.value = result.data.records
    total.value = result.data.total
  }
}

const changeSize = () => { getHasSpu() }

const addSpu = () => {
  scene.value = 1
  spu.value!.initAddSpu(categoryStore.c3Id)
}

const updateSpu = (row: SpuData) => {
  scene.value = 1
  spu.value!.initHasSpuData(row)
}

const changeScene = (obj: { flag: number; params: string }) => {
  scene.value = obj.flag
  if (obj.params == 'update') {
    getHasSpu(pageNo.value)
  } else {
    getHasSpu()
  }
}

const addSku = (row: SpuData) => {
  scene.value = 2
  sku.value!.initSkuData(categoryStore.c1Id, categoryStore.c2Id, {
    category3Id: row.category3Id,
    spuId: row.id ?? '',
    tmId: row.tmId,
    skuName: '', price: '', weight: '', skuDesc: '',
    skuDefaultImg: '', skuAttrValueList: [], skuSaleAttrValueList: [],
  })
}

const findSku = async (row: SpuData) => {
  const result: SkuInfoData = await reqSkuList(row.id as number)
  if (result.code == 200) {
    skuArr.value = result.data
    show.value = true
  }
}

const deleteSpu = async (row: SpuData) => {
  const result: ResponseData<string> = await reqRemoveSpu(row.id as number)
  if (result.code == 200) {
    ElMessage({ type: 'success', message: '删除成功' })
    getHasSpu(records.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({ type: 'error', message: '删除失败' })
  }
}

onBeforeUnmount(() => { categoryStore.$reset() })
</script>
