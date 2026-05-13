<template>
  <router-view v-slot="{Component}" >
    <transition name="fade">
      <keep-alive v-if="flag" >
          <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>

</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/counter'
import { ref,watch,nextTick } from 'vue'
const userStore = useUserStore()
const  flag=ref(true)
watch(()=>userStore.isRefresh,()=>{
  flag.value=false
  nextTick(()=>{
  flag.value=true
  userStore.isRefresh=false
})
})

</script>

<style scoped>
.fade-enter-from{
  opacity: 0;
  transform: translateY(30px);
}
.fade-enter-active{
  transition: all 0.3s ease;
}
.fade-enter-to{
  opacity: 1;
  transform: translateY(0);
}
</style>
