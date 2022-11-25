<template>
  <div class="change-theme">
    <n-switch
      v-model:value="themeActive"
      @update:value="changeTheme"
      size="large"
      :rail-style="railStyle"
    >
      <template #checked-icon>
        <i class="iconfont icon-baitian"></i>
      </template>
      <template #unchecked-icon>
        <i class="iconfont icon-heian"></i>
      </template>
    </n-switch>
  </div>
</template>

<script setup lang="ts">
import { CSSProperties } from 'vue'
import { GlobalStore } from '../store/index'
import { localSet, localGet } from '../utils/util'

const globalStore = GlobalStore()
const themeActive = ref(false)

const railStyle = ({
  focused,
  checked,
}: {
  focused: boolean
  checked: boolean
}) => {
  const style: CSSProperties = {
    background: '',
    boxShadow: '',
  }
  if (checked) {
    style.background = globalStore.theme === 'default' ? '#18A058' : '#409EFF'
    if (focused) {
      style.boxShadow = `0 0 0 2px ${
        globalStore.theme == 'default' ? '#18A058' : '#409EFF'
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

const changeTheme = () => {
  if (themeActive.value) {
    document.documentElement.className = 'theme-light'
    globalStore.theme = 'light'
  } else {
    document.documentElement.className = 'theme-default'
    globalStore.theme = 'default'
  }
  localSet('theme', globalStore.theme)
}

onMounted(() => {
  let theme = localGet('theme')
  themeActive.value = theme === 'default' ? false : true
  changeTheme()
})
</script>

<style lang="less">
@import '@/assets/icon/iconfont.css';
.change-theme {
  position: absolute;
  top: 10px;
  left: 30px;
  z-index: 10;
}
</style>
