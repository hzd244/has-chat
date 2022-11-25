<template>
  <div class="main row-center">
    <div class="sign-main">
      <div class="image-box">
        <img :src="'/gif/' + loginStore.gifIndex + '.gif'" alt="" />
      </div>
      <div class="sign-box">
        <div class="sign-header row-center">
          <div class="title">好久没聊了</div>
          <login-tip v-if="globalStore.loginType === 'login'"></login-tip>
        </div>
        <login-from v-if="globalStore.loginType === 'login'"></login-from>
        <register-form v-else></register-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginFrom from './components/loginForm.vue'
import RegisterForm from './components/registerForm.vue'
import LoginTip from './components/loginTip.vue'
import { GlobalStore } from '@/store/index'
import { LoginStore } from '@/store/modules/login'
import { randomNum } from '@/utils/util'

const globalStore = GlobalStore()
const loginStore = LoginStore()

onMounted(() => {
  loginStore.setGifIndex(randomNum(1, 9))
})
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  min-width: 1200px;
  height: 90%;
  background-color: @primary-bgcolor;
  .sign-main {
    width: 960px;
    height: 500px;
    display: flex;
    padding: 10px;
    background: @primary-bg2color;
    box-shadow: inset 9px 9px 18px @boxshow-color,
      inset -9px -9px 18px @boxshow-color2;
    border-radius: 20px;
    .image-box {
      width: 50%;
      height: 100%;
      // background-image: url("../../assets/img/funny.jpg");
      background-size: cover;
      background-repeat: no-repeat;
      border-radius: 20px;
      overflow: hidden;
    }
    .sign-box {
      width: 50%;
      height: 100%;
      padding: 14px;
      .sign-header {
        width: 100%;
        height: 110px;
        .title {
          font-size: 28px;
          font-weight: 700;
          color: @primary-txcolor;
        }
      }
    }
  }
}
</style>
