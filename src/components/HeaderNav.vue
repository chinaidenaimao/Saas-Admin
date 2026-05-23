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
        <el-popover placement="bottom" :width="240" trigger="click">
          <template #reference>
            <el-button icon="Setting"></el-button>
          </template>
          <div class="setting-panel">
            <div class="setting-item">
              <span>暗黑模式</span>
              <el-switch v-model="isDark" @change="toggleDark" inline-prompt>
                <template #active-action><el-icon><Moon /></el-icon></template>
                <template #inactive-action><el-icon><Sunny /></el-icon></template>
              </el-switch>
            </div>
            <div class="setting-item">
              <span>主题颜色</span>
              <el-color-picker v-model="themeColor" :predefine="predefineColors" @change="changeTheme" />
            </div>
          </div>
        </el-popover>
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
import { computed, ref, watch } from 'vue'
import { reqLogout } from '@/apis/user/index'
import router from '@/router'
import { Moon, Sunny } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const isDark = ref(false)
const themeColor = ref('#409EFF')
const predefineColors = ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399', '#00b29a', '#667eea', '#764ba2']

// 暗黑模式切换
const toggleDark = (val: boolean | string | number) => {
  document.documentElement.classList.toggle('dark', !!val)
}

// 主题颜色切换
const changeTheme = (val: string | null) => {
  if (!val) return
  document.documentElement.style.setProperty('--el-color-primary', val)
  // 生成 primary 的 light/dark 变体并设置
  document.documentElement.style.setProperty('--el-color-primary-light-3', adjustColor(val, 30))
  document.documentElement.style.setProperty('--el-color-primary-light-5', adjustColor(val, 50))
  document.documentElement.style.setProperty('--el-color-primary-light-7', adjustColor(val, 70))
  document.documentElement.style.setProperty('--el-color-primary-light-8', adjustColor(val, 80))
  document.documentElement.style.setProperty('--el-color-primary-light-9', adjustColor(val, 90))
  document.documentElement.style.setProperty('--el-color-primary-dark-2', adjustColor(val, -20))
}

// 颜色亮度调整
const adjustColor = (color: string, percent: number) => {
  const num = parseInt(color.replace('#', ''), 16)
  const r = Math.min(255, Math.max(0, (num >> 16) + percent))
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + percent))
  const b = Math.min(255, Math.max(0, (num & 0x0000ff) + percent))
  return `#${(0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

// 从 localStorage 恢复设置
const savedDark = localStorage.getItem('theme-dark')
const savedColor = localStorage.getItem('theme-color')
if (savedDark === 'true') {
  isDark.value = true
  document.documentElement.classList.add('dark')
}
if (savedColor) {
  themeColor.value = savedColor
  changeTheme(savedColor)
}

watch(isDark, (val) => localStorage.setItem('theme-dark', String(val)))
watch(themeColor, (val) => localStorage.setItem('theme-color', val))
const route = useRoute();
const matched = computed(()=>route.matched)
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
  border-bottom: 1px solid #f0f0f0;
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

.setting-panel {
  .setting-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    font-size: 14px;
    color: #303133;

    & + .setting-item {
      border-top: 1px solid #f0f0f0;
    }
  }
}
</style>

<style>
/* 暗黑模式 - 顶栏 */
html.dark .common-layout {
  background-color: #1d1e1f !important;
  border-bottom-color: #333 !important;
}

html.dark .common-layout .title span {
  color: #e0e0e0;
}

html.dark .setting-panel .setting-item {
  color: #e0e0e0;
}

html.dark .setting-panel .setting-item + .setting-item {
  border-top-color: #333;
}

/* 暗黑模式 - 暗黑模式的 switch 样式 */
html.dark .el-switch.is-checked .el-switch__core {
  background-color: #667eea;
  border-color: #667eea;
}
</style>
