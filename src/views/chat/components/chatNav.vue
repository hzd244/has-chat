<template>
  <div class="nav">
    <div class="nav-my row-center">
      <img
        v-if="globalStore.sender.Avatar && globalStore.sender"
        :src="globalStore.sender.Avatar"
        class="nav-my-img"
        alt=""
      />
      <img src="@/assets/img/avatar.jpg" v-else class="nav-my-img" alt="" />
    </div>
    <ul class="nav-list">
      <template v-for="item in globalStore.navList" :key="item.id">
        <div
          @click="tabClick(item.id)"
          :title="item.name"
          :class="[
            'nav-item',
            'row-center',
            item.id === globalStore.navId ? 'nav-select' : '',
          ]"
        >
          <n-badge :value="getUnReadCount(item.id)">
            <li :class="['iconfont', item.icon]"></li>
          </n-badge>
        </div>
      </template>
    </ul>
    <div class="close">
      <n-tooltip placement="left-start" trigger="hover">
        <template #trigger>
          <span class="iconfont icon-guanji" @click="logout"></span>
        </template>
        有空再聊，再见！
      </n-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GlobalStore } from '@/store/index'
import Conversition from '@/class/Conversition'
import { LoginStore } from '@/store/modules/login'

const { proxy }: any = getCurrentInstance()
const globalStore = GlobalStore()
const loginStore = LoginStore()

// 点击切换导航栏
const tabClick = (id: number) => {
  if (globalStore.navId != id) {
    globalStore.setNavId(id)
  }
}

// 获取未读消息数量
const getUnReadCount = computed(() => {
  return (navId: Number) => {
    if (navId != 1) return 0
    let currentContent = globalStore.conversitionList.filter(
      (x: Conversition) => x.ReciverId === globalStore.sender.Id && !x.ReadFlag,
    )
    return currentContent.length > 999 ? '999+' : currentContent.length
  }
})

let formParams = {
  email: '',
  password: '',
}

// 退出登录
const logout = () => {
  globalStore.setLogout()
  loginStore.setForm(formParams)
  proxy.$router.replace({
    name: 'Login',
  })
}
</script>

<style lang="less" scoped>
.nav {
  height: 100%;
  width: 6%;
  position: relative;
  background-color: @primary-bgcolor8;
  .close {
    position: absolute;
    top: 220px;
    left: 50%;
    transform: translateX(-50%);
    .icon-guanji {
      font-size: 40px;
      border-radius: 50%;
      background: #fff;
      cursor: pointer;
    }
  }

  .nav-my {
    height: 72.5px;
    width: 100%;
    .nav-my-img {
      height: 40px;
      width: 40px;
      border-radius: 50%;
    }
  }
  .nav-list {
    .nav-item {
      height: 72.5px;
      line-height: 72.5px;
      width: 100%;
      cursor: pointer;
    }
    li {
      font-size: 30px;
      color: #fff;
      width: 30px;
      height: 30px;
      line-height: 30px;
    }
    .nav-select {
      background: @primary-bgcolor;
      box-shadow: inset -8px 8px 16px @boxshow-color4,
        inset 8px -8px 16px @boxshow-color5;
    }
  }
}
</style>

<style lang="less">
.n-badge {
  display: block;
}
</style>
