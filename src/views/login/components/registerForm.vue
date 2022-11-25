<template>
  <div class="login-container">
    <n-form ref="loginFormRef" :model="loginStore">
      <n-form-item>
        <n-input
          v-model:value="loginStore.form.email"
          ref="emailRef"
          placeholder="QQ邮箱"
        />
      </n-form-item>
      <n-form-item>
        <n-button
          @click="toRegister"
          :loading="loginStore.loading"
          :color="globalStore.theme === 'default' ? '#161A21' : '#409EFF'"
          >{{ showText }}</n-button
        >
      </n-form-item>
      <div class="goto-login" @click="globalStore.loginType = 'login'">
        <span>立即登录</span>
      </div>
    </n-form>
  </div>
  <show-modal @toRegister="toRegister" @modifyTimer="modifyTimer"></show-modal>
</template>

<script setup lang="ts">
import { GlobalStore } from '@/store/index'
import { sendEmailCode } from '@/api/modules/user'
import { LoginStore } from '@/store/modules/login'
import { checkEmail } from '@/utils/util'
import ShowModal from './showModal.vue'

const { proxy }: any = getCurrentInstance()
const message = useMessage()
const globalStore = GlobalStore()
const loginStore = LoginStore()
let params = {
  email: loginStore.form.email,
  timestamp: loginStore.timestamp,
}
let timer: any = null

const showText = computed(() => {
  return loginStore.loading ? '加载中' : '注册'
})

const toRegister = async () => {
  if (!loginStore.form.email) {
    message.warning('邮箱不能为空！')
  } else if (!checkEmail(loginStore.form.email)) {
    message.warning('请输入合法的邮箱！')
  } else {
    let res = await sendEmailCode(params)
    if (<any>res?.code === 200) {
      loginStore.setLoadingNumber(loginStore.loadingNumber - 1)
      if (loginStore.loadingNumber === 1) {
        loginStore.setLoading(true)
      }
      loginStore.setCodeLoading(true)
      setTimeout(() => {
        message.success(res?.message)
        loginStore.setLoading(false)
        loginStore.setShowModal(true)
        loginStore.setCodeLoading(false)
        loginStore.setSendVerificationCodeState(true)
        loginStore.setHasSendVerificationCode(true)
        loginStore.setCountdown(20)
        timer = setInterval(() => {
          if (loginStore.countdown < 1) {
            if (timer != null) {
              clearInterval(timer)
              timer = null
            }
          } else {
            loginStore.setCountdown(loginStore.countdown - 1)
          }
        }, 1000)
      }, 2000)
    } else {
      message.error(res?.message)
    }
  }
}

const modifyTimer = () => {
  clearInterval(timer)
  timer = null
}

onMounted(() => {
  proxy.$refs.emailRef.focus()
})
</script>

<style lang="less" scoped>
.login-container {
  position: relative;
  width: 100%;
  height: 300px;
  padding: 0 40px;
  .goto-login {
    position: absolute;
    left: 0;
    bottom: 115px;
    width: 100%;
    font-size: 15px;
    color: #fff;
    height: 30px;
    span {
      cursor: pointer;
    }
  }
}
</style>

<style lang="less">
.login-container {
  .n-input {
    height: 50px;
    border-radius: 5px;
    text-align: left;
    font-size: 18px;
    line-height: 50px;
  }
  .n-form-item.n-form-item--top-labelled {
    grid-template-rows: none;
    margin-bottom: 15px;
  }
  .n-button {
    width: 100%;
    height: 50px;
    .n-button__content {
      font-size: 17px !important;
    }
  }
}
</style>
