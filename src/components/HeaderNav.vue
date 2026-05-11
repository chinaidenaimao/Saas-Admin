<template>
  <div class="common-layout">
    <div class="common-header">
      <el-button type="primary" @click="useUserStore().isCollapse=!useUserStore().isCollapse">
        <el-icon>
          <Expand />
        </el-icon>
      </el-button>
      <div class="title">
        <template  v-for="item in matched" :key="item.meta.title">
           <span v-if="item.meta.title">{{ item.meta.title }}</span>
        </template>

      </div>
    </div>
    <div class="user-info">2</div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/counter'
import { computed} from 'vue'
const route = useRoute();
const matched = computed(()=>route.matched)
console.log(route)
</script>

<style scoped lang="scss">
.common-layout {
  height: 60px !important;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px;
  background-color: #ffffff;
  border-bottom: 1px solid rgb(255, 255, 255);
  .common-header {
    display: flex;
    align-items: center;
    .title{
      margin-left: 30px;
      span{
        font-size: 16px;
        color: #303133;
      }
      span:before{
        content: '/ ';
        margin:0 5px;

      }
      span:first-child:before{
        content: '';
        margin-left: 5px;
      }
      span:first-child{
        font-size: 20px;
        font-weight: bold;
      }

    }
  }
}
</style>
