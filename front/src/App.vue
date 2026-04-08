<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted } from 'vue';
import { changeWebViewTitleColor } from '@/utils/system';

const { proxy } = getCurrentInstance();

onMounted(() => {
  // 设置状态栏文字颜色，解决安卓白天模式下状态栏文字不可见的问题
  changeWebViewTitleColor();
})

</script>

<style scoped lang="less">
#app {
  width: 100%;
  height: 100%;
}
</style>
