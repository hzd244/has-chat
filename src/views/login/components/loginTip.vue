<template>
  <n-tooltip
    placement="right-end"
    v-if="loginStore.isLogin == 1"
    :show="loginStore.showPopover"
    :show-arrow="false"
    :style="{
      background: globalStore.theme == 'default' ? '#161A21' : '#409EFF',
    }"
  >
    <template #trigger>
      <span class="iconfont icon-shuaxin" @click="getRandom"></span>
    </template>
    随机获取一个账户登陆
  </n-tooltip>
</template>

<script setup lang="ts">
import { GlobalStore } from '@/store/index'
import { LoginStore } from '@/store/modules/login'
import { getRandomUser } from '@/api/modules/user'

const globalStore = GlobalStore()
const loginStore = LoginStore()
const message = useMessage()

const getRandom = async () => {
  const { code, data } = await getRandomUser()
  if (<any>code === 200) {
    let form = {
      email: data.Email,
      password: data.Password,
    }
    loginStore.setForm(form)
  }
}

onMounted(() => {
  setTimeout(() => {
    loginStore.setShowPopover(true)
  }, 2000)
})
</script>

<style lang="less" scoped>
.icon-shuaxin {
  font-size: 40px;
  margin-left: 10px;
  cursor: pointer;
}
</style>
