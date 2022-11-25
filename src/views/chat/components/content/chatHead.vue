<template>
  <header class="head">
    <span class="name">{{ globalStore.reciver.Name }}</span>
  </header>
</template>

<script setup lang="ts">
import { GlobalStore } from '@/store/index'

const globalStore = GlobalStore()
</script>

<style lang="less" scoped>
.head {
  height: 8%;
  padding: 0 20px;
  display: flex;
  width: 100%;
  background-color: #fff;
  align-items: center;
  z-index: 10;
  .name {
    color: #272e36;
    font-size: 16px;
    font-weight: 900;
  }
}
</style>
