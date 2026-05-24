<template>
  <el-card style="margin-bottom: 10px;">
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select v-model="categoryStore.c1Id" @change="handler1" :disabled="scene != 0" style="width: 180px;">
          <el-option v-for="item in categoryStore.c1Arr" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="categoryStore.c2Id" @change="handler2" :disabled="scene != 0" style="width: 180px;">
          <el-option v-for="item in categoryStore.c2Arr" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="categoryStore.c3Id" :disabled="scene != 0" style="width: 180px;">
          <el-option v-for="item in categoryStore.c3Arr" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCategoryStore } from '@/stores/category'

defineProps<{ scene: number }>()

const categoryStore = useCategoryStore()

onMounted(() => {
  categoryStore.getC1()
})

const handler1 = () => {
  categoryStore.getC2()
}

const handler2 = () => {
  categoryStore.getC3()
}
</script>
