<template>
  <div class="not-found">
    <div class="not-found__card">
      <div class="not-found__code">404</div>
      <div class="not-found__divider"></div>
      <h2 class="not-found__title">页面不存在</h2>
      <p class="not-found__desc">您访问的页面可能已被移除、名称已更改或暂时不可用</p>
      <el-button type="primary" round size="large" @click="goHome">
        <el-icon><HomeFilled /></el-icon>
        返回首页
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push({ name: 'home' })
}
</script>

<style scoped lang="scss">
.not-found {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e7ed 100%);
}

.not-found__card {
  text-align: center;
  padding: 60px 80px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.06);
}

.not-found__code {
  font-size: 120px;
  font-weight: 800;
  line-height: 1;
  background: linear-gradient(135deg, #38bdf8 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 8px;
}

.not-found__divider {
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #38bdf8, #3b82f6);
  border-radius: 2px;
  margin: 24px auto;
}

.not-found__title {
  font-size: 22px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 12px 0;
}

.not-found__desc {
  font-size: 14px;
  color: #909399;
  margin: 0 0 36px 0;
  max-width: 320px;
  line-height: 1.6;
}
</style>
