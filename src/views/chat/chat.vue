<template>
  <!--接收信息提示音-->
  <audio id="tipMusic" ref="tipMusic">
    <source src="/mp3/msgTip.mp3" type="audio/mp3" />
  </audio>
  <n-switch
    class="music-btn"
    :rail-style="railStyle"
    v-model:value="globalStore.openMusic"
  >
    <template #checked>不会错过重要提醒啦</template>
    <template #unchecked>开启声音提醒</template>
  </n-switch>

  <div class="main">
    <div class="content">
      <has-chat></has-chat>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GlobalStore } from '@/store/index'
import HasChat from './components/hasChat.vue'

const globalStore = GlobalStore()
const { proxy }: any = getCurrentInstance()

// 声音switch样式
const railStyle = ({ focused, checked }: any) => {
  const style = {
    background: '',
    boxShadow: '',
  }
  if (checked) {
    style.background = globalStore.theme === 'default' ? '#18A058' : '#409EFF'
    if (focused) {
      style.boxShadow = `0 0 0 2px ${
        globalStore.theme === 'default' ? '#18A058' : '#409EFF'
      }`
    }
  } else {
    style.background = '#888'
    if (focused) {
      style.boxShadow = '0 0 0 2px #888'
    }
  }
  return style
}

// 监听声音开启
watch(
  () => globalStore.openMusic,
  (newVal, oldVal) => {
    if (newVal) {
      globalStore.setTipMusic(proxy.$refs.tipMusic)
    }
  },
)

document.onclick = function (e) {
  let className = (e.target as HTMLElement).className
  if (
    className != globalStore.emjonRef.className &&
    className != globalStore.expressionRef.className
  ) {
    globalStore.setExpressionShow(false)
  }
}
</script>

<style lang="less" scoped>
.music-btn {
  position: absolute;
  right: 30px;
  top: 10px;
}

.main {
  width: 100%;
  min-width: 1000px;
  height: 90%;
  background-color: @primary-bgcolor;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 40px;
  .content {
    width: 900px;
    height: 580px;
    border-radius: 33px;
    background: @primary-bgcolor7;
    overflow: hidden;
    border-bottom: 0.5px solid @primary-border-color;
    border-top: 0.5px solid @primary-border-color;
  }
}
</style>

<style lang="less">
.n-switch .n-switch__checked,
.n-switch .n-switch__unchecked {
  font-size: 13px !important;
}
</style>
