<template>
  <div class="common-menu">
    <h5 v-show="!isCollapse" class="mb-2">Admin系统</h5>
    <h5 v-show="isCollapse" class="mb-2 collapse-title">A</h5>
    <el-scrollbar>
      <el-menu :default-active="isActive" :collapse="isCollapse" @select="handleSelect" :collapse-transition="false" mode="vertical" >
        <template v-for="item in menuList" :key="item.path">
          <!-- 没有子路由 -->
          <template v-if="!item.children">
            <el-menu-item v-if="item.meta.hidden==false" :index="item.path" class="menu-item" popper-class="sub-menu">
              <component :is="item.meta?.icon" class="icon"></component>
                <span>{{ item.meta?.title || item.path }}</span></el-menu-item>
          </template>
          <!-- 有一个子路由 -->
          <template v-if="item.children && item.children.length == 1">
            <el-menu-item v-if="item.children[0].meta.hidden==false" :index="item.children[0].path" class="menu-item" popper-class="sub-menu">
              <component :is="item.children[0].meta?.icon" class="icon"></component>
                <span>{{ item.children[0].meta?.title || item.children[0].path }}</span></el-menu-item>
          </template>
          <!-- 有多个子路由 -->
            <el-sub-menu v-if="item.children && item.children.length > 1" :index="item.path" popper-class="sub-menu">
              <template #title>
                <component :is="item.meta?.icon" class="icon"></component>
                <span>{{ item.meta?.title || item.path }}</span>
              </template>
              <template v-for="child in item.children" :key="child.path">
                <el-menu-item v-if="child.meta.hidden==false" :index="child.path" class="menu-item" popper-class="sub-menu">
                  <component :is="child.meta?.icon" class="icon"></component>
                  <span>{{ child.meta?.title || child.path }}</span></el-menu-item>
              </template>
            </el-sub-menu>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/counter'
import { ref } from 'vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const isCollapse = computed(() => userStore.isCollapse)
const menuList = computed(() => userStore.menuList)
const isActive = ref(route.path)
function handleSelect(index: string) {
  router.push({path: index})
  isActive.value = index
}

</script>

<style scoped lang="scss">
.common-menu {
  height: 100%;
  background: #0c1222;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  // ========== 顶部标题 ==========
  .mb-2 {
    margin: 0;
    height: 80px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 700;
    color: #fff;
    letter-spacing: 3px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    background: rgba(255, 255, 255, 0.03);
  }
  .sub-menu
  {
    .icon {
      font-size: 16px;
      width: 20px ;
      height: 10px ;
    }
  }
  .collapse-title {
    font-size: 22px;
    color: #38bdf8;
  }

  // ========== 滚动区 ==========
  .el-scrollbar {
    flex: 1;
    overflow: hidden;

    :deep(.el-scrollbar__bar.is-vertical) {
      right: 2px;
      width: 4px;

      .el-scrollbar__thumb {
        background: rgba(255, 255, 255, 0.12);
        border-radius: 4px;

        &:hover {
          background: rgba(255, 255, 255, 0.25);
        }
      }
    }
  }

  // ========== el-menu 重置 ==========
  :deep(.el-menu) {
    width: 100%;
    background: transparent;
    border-right: none;
    padding: 6px 0;
  }

  // ========== 一级菜单项 ==========
  :deep(.el-menu-item),
  :deep(.el-sub-menu__title) {
    height: 42px;
    line-height: 42px;
    // padding: 0 20px !important;
    margin: 2px 10px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;

    color: rgba(255, 255, 255, 0.55);
    background: transparent;
    font-size: 14px;
    font-weight: 400;
    transition: all 0.2s ease;
    position: relative;

    .icon{
      font-size: 18px;
      margin-right: 10px;
      flex-shrink: 0;
      width: 20px;
      height: 30px;
      color: inherit;
    }

    span {
      font-size: 14px;
      color: inherit;
    }

    &:hover {
      background: rgba(56, 189, 248, 0.08);
      color: #e0f2fe;
    }
  }

  // ========== 一级菜单 active ==========
  :deep(.el-menu-item.is-active) {
    background: linear-gradient(90deg, rgba(56, 189, 248, 0.14) 0%, rgba(56, 189, 248, 0.04) 100%);
    color: #38bdf8;
    font-weight: 500;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
      height: 24px;
      background: #38bdf8;
      border-radius: 0 4px 4px 0;
    }
  }

  // ========== 子菜单 ==========
  :deep(.el-sub-menu) {
    .el-sub-menu__title {
      .el-sub-menu__icon-arrow {
        font-size: 12px ;
        color: rgba(255, 255, 255, 0.2);
        margin-left: auto;

      }
    }

    &.is-opened>.el-sub-menu__title {
      background: rgba(56, 189, 248, 0.06);
      color: #7dd3fc;

      .el-sub-menu__icon-arrow {
        color: rgba(255, 255, 255, 0.4);
      }
    }

    // 二级菜单项
    .el-menu-item {
      height: 42px;
      line-height: 42px;
      margin: 1px 10px 1px 10px;
      // padding-left: 24px !important;
      font-size: 13px;

      &.is-active {
        background: linear-gradient(90deg, rgba(56, 189, 248, 0.14) 0%, rgba(56, 189, 248, 0.04) 100%);
        color: #38bdf8;
        font-weight: 500;

        &::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 20px;
          background: #38bdf8;
          border-radius: 0 4px 4px 0;
        }
      }
    }
  }

  // ========== 折叠态 ==========
  :deep(.el-menu--collapse) {
    .el-menu-item,
    .el-sub-menu__title {
      justify-content: center;
      padding: 0 !important;
      margin: 2px 8px;
      .el-icon {
        margin-right: 0;
        font-size: 16px;
      }
    }
  }
}
:deep(.icon)
{
  font-size: 16px;
  width: 20px;
  height: 20px;
}
:deep(.el-menu-item .menu-item)
{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
