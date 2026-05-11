<template>
  <div class="common-layout">
    <el-container class="container-main">
      <el-aside :width="useUserStore().isCollapse? '120px' : '264px'" style="transition: all 0.3s ease;"><SideMenu/></el-aside>
      <el-container>
        <el-header >
          <HeaderNav/>
        </el-header>
        <el-main>
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
import { reqUserInfo } from '@/apis/user/index'
import { onMounted } from 'vue'
onMounted(async ()=>{
    const userInfo=await reqUserInfo()
      // 登录成功后，将用户信息存储到store中
    useUserStore().user=userInfo.data
})
</script>

<style scoped lang="scss">
.common-layout{
  height: 100vh;
  .container-main{
    height: 100%;
    background-color: #f5f7fa;
    .el-header
    {
      height: 60px;
      padding: 0;
      background-color: #f5f7fa;
    }
  }
}
</style>
