import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryfirst, getCategorysecond, getCategorythird } from '@/apis/product/category'
import type { CategoryFormdata, CategoryFormdata1, CategoryFormdata2 } from '@/apis/product/category/type'

export const useCategoryStore = defineStore('category', () => {
  const c1Arr = ref<CategoryFormdata[]>([])
  const c1Id = ref<number | string>('')
  const c2Arr = ref<CategoryFormdata1[]>([])
  const c2Id = ref<number | string>('')
  const c3Arr = ref<CategoryFormdata2[]>([])
  const c3Id = ref<number | string>('')

  const getC1 = async () => {
    const result = await getCategoryfirst()
    if (result.code == 200) {
      c1Arr.value = result.data
    }
  }

  const getC2 = async () => {
    c2Id.value = ''
    c3Id.value = ''
    c2Arr.value = []
    c3Arr.value = []
    if (!c1Id.value) return
    const result = await getCategorysecond(c1Id.value as number)
    if (result.code == 200) {
      c2Arr.value = result.data
    }
  }

  const getC3 = async () => {
    c3Id.value = ''
    c3Arr.value = []
    if (!c2Id.value) return
    const result = await getCategorythird(c2Id.value as number)
    if (result.code == 200) {
      c3Arr.value = result.data
    }
  }

  const $reset = () => {
    c1Id.value = ''
    c2Id.value = ''
    c3Id.value = ''
    c1Arr.value = []
    c2Arr.value = []
    c3Arr.value = []
  }

  return { c1Arr, c1Id, c2Arr, c2Id, c3Arr, c3Id, getC1, getC2, getC3, $reset }
})
