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
    <div class="user-info">
      <div class="right-button">
        <el-button  icon="Refresh"  @click="useUserStore().isRefresh=true"> </el-button>
        <el-button  icon="FullScreen" @click="fullscreen">  </el-button>
        <el-button  icon="Setting"> </el-button>
      </div>
      <div class="User-name">
         <el-dropdown>
    <span class="el-dropdown-link">
      <el-image style="width: 30px; height: 30px" :src="useUserStore().user.avatar"  :style="{'border-radius': '50%' ,'margin-right': '10px'}"></el-image>
      {{ useUserStore().user.name }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/counter'
import { computed} from 'vue'
import { reqLogout } from '@/apis/user/index'
import router from '@/router'
import { ElMessage } from 'element-plus'
const route = useRoute();
const matched = computed(()=>route.matched)
console.log(route)
// 全屏切换
const fullscreen=()=>{
  const full=document.fullscreenElement
  if(full){
    document.exitFullscreen()
  }else{
    document.documentElement.requestFullscreen()
  }
}
// 退出登录
const logout=async ()=>{
  await reqLogout()
  // 清空token
  localStorage.removeItem('token')
  // 清空用户信息
  useUserStore().user= {
    router: [],
    buttons: [],
    roles: [],
    name: '',
    avatar: '',
}
  router.push({name:'login'})
  ElMessage.success('退出登录成功')
}
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
  .user-info{
      display: flex;
      align-items: center;
      .right-button{
       .el-button{
        margin-left: 20px;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        .el-icon{
          width: 20px;
          height: 20px;
        }
       }
      }
      .User-name{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 30px;
        .el-dropdown-link{
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }

}
</style>
