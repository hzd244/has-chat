<template>
  <div class="domain">
    <n-scrollbar style="max-height: 100%">
      <div v-show="globalStore.navId === 1" class="f-session-container">
        <template v-if="globalStore.sessionList.length > 0">
          <div
            :class="[
              'f-session-item',
              item.Id === globalStore.sessionSelectId ? 'f-session-active' : '',
            ]"
            v-for="item in globalStore.sessionList"
            :key="item.Id"
            @click="selectSession(item)"
          >
            <div class="f-session-img">
              <!-- <img :src="item.Avatar" /> -->
              <n-badge :value="getUnReadCount(item.Id)">
                <n-avatar size="medium" :src="item.Avatar"></n-avatar>
              </n-badge>
            </div>
            <div class="f-session-content">
              <div class="f-session-name text-ellipsis">{{ item.Name }}</div>
              <div
                class="f-session-desc"
                v-html="getLastSession(item.Id)"
              ></div>
            </div>
          </div>
        </template>
        <div class="empty-session" v-else>
          <img class="empty-img" src="@/assets/img/empty.png" alt="" />
          <div class="empty-text">暂无会话</div>
        </div>
      </div>
      <div v-show="globalStore.navId === 2" class="session-container">
        <div
          v-for="item in globalStore.allSessionList"
          :key="item.id"
          @click="selectSession(item)"
          :class="[
            'session-item',
            item.Id === globalStore.allSessionSelectId ? 'session-active' : '',
          ]"
        >
          <div class="session-img">
            <n-avatar size="medium" :src="item.Avatar"></n-avatar>
          </div>
          <div class="session-content">
            <div class="session-name text-ellipsis">{{ item.Name }}</div>
          </div>
        </div>
      </div>
    </n-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { GlobalStore } from '@/store/index'
import User from '@/class/User'
import Conversition from '@/class/Conversition'

const globalStore = GlobalStore()

// 获取未读消息数量
const getUnReadCount = computed(() => {
  return (id: Number) => {
    return getUnReadCountById(id)
  }
})

//根据Id获取未读消息数量
function getUnReadCountById(id: Number) {
  let currentContent = globalStore.conversitionList.filter(
    (x: Conversition) =>
      x.SendId == id && x.ReciverId === globalStore.sender.Id && !x.ReadFlag,
  )
  return currentContent.length > 999 ? '999+' : currentContent.length
}

// 获取消息最后一条内容
const getLastSession = computed(() => {
  return (id: Number) => {
    let currentContent: Array<Conversition> =
      globalStore.conversitionList.filter(
        (x: Conversition) =>
          (x.SendId === globalStore.sender.Id && x.ReciverId === id) ||
          (x.SendId === id && x.ReciverId === globalStore.sender.Id),
      )
    let result = ''
    if (currentContent.length > 0) {
      let len = currentContent.length - 1
      switch (currentContent[len].Type) {
        case 0:
          result = currentContent[len].Content
          break
        case 1:
          result = '图片'
          break
        case 2:
          result = '视频'
          break
        case 3:
          result = '语音'
          break
      }
    }
    return result
  }
})

const selectSession = (item: User) => {
  if (globalStore.navId === 1) {
    globalStore.setSessionSelectId(item.Id)
    globalStore.setReciver(item)
    globalStore.toBottom()
    globalStore.changeReaded(item.Id)
    globalStore.initEditor()
  } else if (globalStore.navId === 2) {
    globalStore.setAllSessionSelectId(item.Id)
    globalStore.setReadyReciver(item)
  }
}
</script>

<style lang="less" scoped>
.domain {
  height: 100%;
  width: 26%;
  background: @primary-bgcolor;
  .empty-session {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .empty-img {
      width: 200px;
      height: auto;
    }
    .empty-text {
      color: #fff;
      margin-top: 15px;
      font-size: 22px;
      font-weight: 600;
    }
  }

  .f-session-container {
    width: 100%;
    height: 100%;
    .f-session-item {
      width: 100%;
      height: 72.5px;
      display: flex;
      align-items: center;
      cursor: pointer;
      padding: 0 10px;
      &:hover {
        background: @boxshow-color6;
        box-shadow: inset 12px 12px 24px @boxshow-color6,
          inset -12px -12px 24px @boxshow-color6;
      }
      .f-session-img {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30%;
        height: 70%;
        img {
          height: 50px;
          width: 50px;
          border-radius: 50%;
        }
      }
      .f-session-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 70%;
        height: 40px;
        text-align: left;
        .f-session-name {
          width: 100%;
          height: 60%;
          color: @primary-txcolor;
          font-size: 14px;
        }
        .f-session-desc {
          width: 100%;
          height: 40%;
          font-size: 12px;
          color: @input-border-txcolor;
          display: flex;
          overflow: hidden;
        }
      }
    }
    .f-session-active {
      background: @primary-bgcolor;
      box-shadow: inset -8px 8px 16px @boxshow-color4,
        inset 8px -8px 16px @boxshow-color5;
    }
  }
  .session-container {
    width: 100%;
    height: 100%;
    .session-item {
      width: 100%;
      height: 72.5px;
      display: flex;
      align-items: center;
      cursor: pointer;
      padding: 0 10px;
      &:hover {
        background: @boxshow-color6;
        box-shadow: inset 12px 12px 24px @boxshow-color6,
          inset -12px -12px 24px @boxshow-color6;
      }
      .session-img {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 30%;
        height: 70%;
        img {
          height: 50px;
          width: 50px;
          border-radius: 50%;
        }
      }
      .session-content {
        display: flex;
        align-items: center;
        width: 70%;
        height: 40px;
        text-align: left;
        .session-name {
          color: @primary-txcolor;
          font-size: 16px;
        }
      }
    }
    .session-active {
      background: @primary-bgcolor;
      box-shadow: inset -8px 8px 16px @boxshow-color4,
        inset 8px -8px 16px @boxshow-color5;
    }
  }
}
</style>

<style lang="less">
.f-session-img {
  .n-badge {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    .n-avatar {
      width: 100%;
      height: 100%;
    }
  }
}
.session-img {
  .n-avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
  }
}
.f-session-desc {
  p {
    display: flex;
    align-items: flex-end;
    margin: 0;
    width: 100%;
    height: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    line-height: 16px;
    img {
      width: 16px !important;
      height: 16px !important;
      margin-right: 2px;
    }
  }
}
</style>
