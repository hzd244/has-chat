<template>
  <div class="content row-center">
    <div class="content-box row-center">
      <chat-win
        v-show="globalStore.navId === 1 && globalStore.sessionSelectId != 0"
      ></chat-win>
      <user-info
        v-show="globalStore.navId === 2 && globalStore.allSessionSelectId != 0"
      ></user-info>
      <Welcome
        v-show="
          (globalStore.navId === 1 && globalStore.sessionSelectId === 0) ||
          (globalStore.allSessionSelectId === 0 && globalStore.navId === 2)
        "
      ></Welcome>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GlobalStore } from '@/store/index'
import UserInfo from './content/userInfo.vue'
import Welcome from './content/welcome.vue'
import ChatWin from './content/chatWin.vue'

const globalStore = GlobalStore()
</script>

<style lang="less" scoped>
.content {
  width: 74%;
  height: 100%;
  .content-box {
    height: 100%;
    width: 100%;
    background: @boxshow-color9;
    overflow: hidden;
  }
}
</style>
