<template>
  <div class="common-layout">
    <el-container class="container-main">
      <el-aside :width="useUserStore().isCollapse? '120px' : '264px'" style="transition: all 0.3s ease;"><SideMenu/></el-aside>
      <el-container>
        <el-header >
          <HeaderNav/>
        </el-header>
        <el-main >
          <MainVue/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import HeaderNav from '@/components/HeaderNav.vue'
import SideMenu from '@/components/SideMenu.vue'
import MainVue from '@/layout/MainVue.vue'
import { useUserStore } from '@/stores/counter'
</script>

<style scoped lang="scss">
.common-layout{
  height: 100vh;
  .container-main{
    height: 100%;
    background-color: #f5f7fa;
    .el-header
    {
      height: 80px;
      padding: 0;
      background-color: #f5f7fa;
    }
    .el-main{
      padding: 20px;
    }
  }
}
</style>

<style>
/* 暗黑模式 - 布局 */
html.dark .container-main {
  background-color: #141414 !important;
}

html.dark .el-header {
  background-color: #1d1e1f !important;
}

html.dark .el-main {
  background-color: #141414;
}

html.dark .el-aside {
  background-color: #1d1e1f;
}
</style>
