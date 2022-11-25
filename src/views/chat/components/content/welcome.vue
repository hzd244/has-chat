<template>
  <div class="content-slow">
    <img class="logo" src="/logo.png" />
    <div class="title">闲来没事，聊会天吧~</div>
    <div class="desc">有事没事，记得常联系</div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.content-slow {
  .logo {
    width: 120px;
    height: auto;
  }
  .title {
    font-size: 48px;
    text-align: center;
    color: @primary-txcolor;
  }
  .desc {
    margin-top: 4px;
    font-size: 16px;
    text-align: center;
    color: @primary-txcolor;
  }
}
.content-slow:hover {
  /*调用动画*/
  animation-name: slowAnimation;
  /*持续时间*/
  animation-duration: 1s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  cursor: pointer;
}
@keyframes slowAnimation {
  0% {
    padding: 0;
  }
  100% {
    border-radius: 30px;
    background: @primary-bgcolor;
    box-shadow: 25px 25px 50px @boxshow-color12,
      -25px -25px 50px @boxshow-color13;
    padding: 20px;
  }
}
</style>

<style lang="less">
.content-slow {
  .n-result {
    color: @primary-txcolor;
  }
  .n-result-header__title {
    color: @primary-txcolor;
  }
  .n-button__content {
    color: @primary-txcolor5;
  }
}
</style>
