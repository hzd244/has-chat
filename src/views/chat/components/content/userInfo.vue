<template>
  <div class="info-box">
    <n-avatar round :size="80" :src="globalStore.readyReciver.Avatar" />
    <div class="nick-name">{{ globalStore.readyReciver.NickName }}</div>
    <div class="personality-sign">
      {{ globalStore.readyReciver.PersonalitySign }}
    </div>
    <div class="info-more">
      <div class="more-item">
        <span>备&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
        {{ globalStore.readyReciver.Name }}
      </div>
      <div class="more-item">
        <span>手机号：</span>
        {{ globalStore.readyReciver.Mobile }}
      </div>
      <div class="more-item">
        <span>地&nbsp;&nbsp;&nbsp;&nbsp;区：</span>
        {{ globalStore.readyReciver.Region }}
      </div>
    </div>
    <n-button
      class="send-info"
      type="primary"
      size="large"
      @click="readySend"
      :color="globalStore.theme === 'default' ? '#18A058' : '#409EFF'"
      text-color="#fff"
      >发消息</n-button
    >
  </div>
</template>

<script setup lang="ts">
import { GlobalStore } from '@/store/index'

const globalStore = GlobalStore()

const readySend = () => {
  globalStore.setNavId(1)
  globalStore.setReciver(globalStore.readyReciver)
  globalStore.setSessionSelectId(globalStore.readyReciver.Id)
  globalStore.initEditor()
}
</script>

<style lang="less" scoped>
.info-box {
  width: 60%;
  height: 90%;
  color: @primary-txcolor;
  margin: 0 auto;
  .nick-name {
    color: @primary-color;
    font-size: 24px;
    margin-top: 15px;
  }
  .personality-sign {
    color: @primary-txcolor2;
    font-size: 16px;
    margin-top: 15px;
    text-align: left;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    line-clamp: 8;
    -webkit-box-orient: vertical;
  }
  .info-more {
    margin-top: 20px;
    .more-item {
      padding: 5px 0;
      text-align: left;
      span {
        display: inline-block;
      }
    }
  }
  .send-info {
    margin-top: 30px;
    width: 150px;
  }
}
</style>
