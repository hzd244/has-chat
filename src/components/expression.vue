<template>
  <div class="emjon">
    <n-scrollbar style="max-height: 100%">
      <ul class="ex" ref="emjonRef">
        <li
          v-for="item in globalStore.expressions"
          :key="item.title"
          @click="selectIcon(item.icon)"
        >
          <img :src="item.icon" :title="item.title" alt="" />
        </li>
      </ul>
    </n-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { GlobalStore } from '@/store/index'

const globalStore = GlobalStore()
const { proxy }: any = getCurrentInstance()

// 选择表情包
const selectIcon = (icon: string) => {
  globalStore.setExpressionShow(!globalStore.expressionShow)
  let iconContent = `<img src="${icon}" class="emo-image" />`
  globalStore.editor.cmd.do('insertHTML', iconContent)
}

onMounted(() => {
  proxy.$nextTick(() => {
    globalStore.setEmjonRef(proxy.$refs.emjonRef)
  })
})
</script>

<style lang="less" scoped>
.emjon {
  width: 350px;
  height: 245px;
  position: absolute;
  left: 30px;
  top: -262px;
  background: #fff;
  overflow: auto;
  ul {
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    li {
      width: 55px;
      font-size: 28px !important;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease 0s;
    }
    li:hover {
      transform: scale(1.2);
    }
    img {
      width: 30px;
      height: 30px;
    }
  }
}
</style>
