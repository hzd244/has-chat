<template>
  <div class="login-container">
    <n-form :model="loginStore">
      <n-form-item>
        <n-input
          v-model:value="loginStore.form.email"
          ref="userCode"
          placeholder="邮箱账户"
        />
      </n-form-item>
      <n-form-item>
        <n-input
          v-model:value="loginStore.form.password"
          placeholder="用户密码"
          type="password"
        />
      </n-form-item>
      <n-form-item>
        <n-button
          @click="toLogin"
          :loading="loading"
          :color="globalStore.theme === 'default' ? '#161A21' : '#409EFF'"
          >登录</n-button
        >
      </n-form-item>
      <div class="goto-register" @click="gotoRegister">
        <span>立即注册</span>
      </div>
    </n-form>
  </div>
</template>

<script setup lang="ts">
import { GlobalStore } from '@/store/index'
import { LoginStore } from '@/store/modules/login'
import { login } from '@/api/modules/user'
import { localSet } from '@/utils/util'

const message = useMessage()
const loginStore = LoginStore()
const globalStore = GlobalStore()
const { proxy }: any = getCurrentInstance()
const loading = ref(false)

onMounted(() => {
  proxy.$refs.userCode.focus()
})

// 回车登陆
document.onkeydown = function (ev: any) {
  let Event: any = ev
  if (Event.keyCode === 13) {
    if (proxy.$router.currentRoute.value.path === '/') {
      toLogin()
    }
  }
}

const toLogin = async () => {
  if (!(loginStore.form.email && loginStore.form.password)) {
    message.warning('账号或密码不能为空')
  } else {
    const { data } = await login({ ...loginStore.form })
    if (!data) {
      message.warning('该用户不存在！')
    } else {
      loading.value = true
      globalStore.setSender(data.myInfo)
      setTimeout(() => {
        loading.value = false
        proxy.$router.replace('/chat')
        message.success('登录成功, 欢迎回来！')
        localSet('token', data.token)
        localSet('sender', globalStore.sender)
      }, 1500)
    }
  }
}

let formParams = {
  email: '',
  password: '',
}

const gotoRegister = () => {
  loginStore.setForm(formParams)
  globalStore.setLoginType('register')
}
</script>

<style lang="less" scoped>
.login-container {
  position: relative;
  width: 100%;
  height: 300px;
  padding: 0 40px;
  .goto-register {
    position: absolute;
    left: 0;
    bottom: 25px;
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
