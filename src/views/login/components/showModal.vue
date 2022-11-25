<template>
  <n-modal v-model:show="loginStore.showModal" :on-after-leave="closeModal">
    <div class="wrap">
      <div class="tip-content">
        <div class="popup-header">
          <span class="iconfont icon-youxiang"></span>
        </div>
        <div class="tip-form">
          <input
            type="text"
            :maxlength="6"
            v-model="loginStore.verificationCode"
            class="form-control-lg form-code"
          />
        </div>
        <div class="tip-bottom">
          <n-button
            :loading="loginStore.codeLoading"
            :disabled="
              loginStore.hasSendVerificationCode && loginStore.countdown != 0
            "
            class="btn"
            :color="globalStore.theme == 'default' ? '#161A21' : '#409EFF'"
            @click="toSendVerificationCode"
            >{{ showText }}</n-button
          >
          <n-button
            class="btn"
            :disabled="
              !(
                loginStore.verificationCode.length == 6 &&
                loginStore.hasSendVerificationCode
              )
            "
            :color="globalStore.theme == 'default' ? '#161A21' : '#409EFF'"
            @click="toCheckVerificationCode"
            >下一步</n-button
          >
        </div>
      </div>
    </div>
  </n-modal>
</template>

<script setup lang="ts">
import { GlobalStore } from '@/store/index'
import { LoginStore } from '@/store/modules/login'
import { checkEmailCode } from '@/api/modules/user'

const globalStore = GlobalStore()
const loginStore = LoginStore()
let params = {
  verificationCode: loginStore.verificationCode,
  timestamp: loginStore.timestamp,
}

const showText = computed(() => {
  if (loginStore.countdown === 0) {
    if (loginStore.codeLoading) {
      return '加载中'
    }
    return '获取验证码'
  } else {
    return !loginStore.hasSendVerificationCode
      ? '获取验证码'
      : ' 已发送 (' + loginStore.countdown + ')'
  }
})

const emit = defineEmits(['toRegister', 'modifyTimer'])

const closeModal = () => {
  loginStore.setShowModal(false)
  loginStore.setSendVerificationCodeState(false)
  loginStore.setHasSendVerificationCode(false)
  loginStore.setLoadingNumber(2)
  emit('modifyTimer')
}

const toCheckVerificationCode = async () => {
  let res = await checkEmailCode(params)
  console.log(res)
}

const toSendVerificationCode = () => {
  emit('toRegister')
}
</script>

<style lang="less" scoped>
.tip-content {
  background-color: @primary-bg3color;
  border: 1px solid @primary-bg3color;
  box-shadow: none;
  width: 400px;
  height: 350px;
  padding: 20px;
  border-radius: 10px;
  .popup-header {
    width: 100%;
    text-align: center;
    .icon-youxiang {
      font-size: 80px;
    }
    .icon-dunpai {
      font-size: 50px;
    }
  }
  .tip-form {
    margin-bottom: 40px;
    .form-control-lg {
      font-size: 18px;
      line-height: 1.5;
      padding: 5px 8px;
      height: 40px;
    }
    .form-code {
      border: 1px solid @primary-bg3color;
      background-color: @primary-bg3color;
      color: @input-border-txcolor;
      box-shadow: none;
      border-radius: 5px;
      font-weight: 400;
      display: block;
      width: 60%;
      margin: 0 auto;
      border-bottom: 1px solid #fff;
      text-align: center;
    }
  }

  .tip-bottom {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .btn {
      width: 40%;
      height: 50px;
    }
  }
}
</style>
