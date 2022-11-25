<template>
  <div class="chat">
    <chat-nav></chat-nav>
    <chat-domain></chat-domain>
    <chat-content></chat-content>
  </div>
</template>

<script setup lang="ts">
import ChatNav from '../components/chatNav.vue'
import ChatDomain from '../components/chatDomain.vue'
import ChatContent from '../components/chatContent.vue'
import { getUserList } from '@/api/modules/user'
import { GlobalStore } from '@/store/index'
import { isLogin } from '@/utils/util'
import Conversition from '@/class/Conversition'
import io from 'socket.io-client'

let charUrl: string = 'wss://howcode.online'

const globalStore = GlobalStore()
const message = useMessage()
const { proxy }: any = getCurrentInstance()

const stateData = reactive({
  page: {
    pageIndex: 1,
    pageSize: 30,
  },
  loadUserAll: false,
})

// 获取用户列表数据
async function getUserListById() {
  let query = {
    id: globalStore.sender?.Id,
    pageIndex: stateData.page.pageIndex,
    pageSize: stateData.page.pageSize,
  }

  let res = await getUserList(query)
  if (<any>res.code === 200) {
    globalStore.setAllSessionList(res.data)
    if (res.data.length < stateData.page.pageSize) {
      stateData.loadUserAll = true
    } else {
      stateData.page.pageIndex += 1
      getUserListById()
    }
  } else {
    message.error(res.message)
  }
}

async function init() {
  if (isLogin()) {
    initSocket()
    if (globalStore.allSessionList.length === 0) {
      getUserListById()
    }
  } else {
    proxy.$router.replace({
      name: 'Login',
    })
  }
}

onMounted(() => {
  init()
})

const initSocket = () => {
  globalStore.socket = io(charUrl)
  globalStore.socket.on('connect', () => {
    console.log('连接成功')
    globalStore.socket.emit('joinChat', {
      SendId: globalStore.sender.Id,
      SendName: globalStore.sender.Name,
      ReviceId: -1,
      ReviceName: '',
      NoCode: globalStore.noCode,
    })
  })
  globalStore.socket.on('disconnect', () => {
    console.log('连接已断开')
  })
  //修改信息状态
  globalStore.socket.on('changMsgState', (data: any) => {
    globalStore.conversitionList.map((x: Conversition) => {
      if (x.NoCode != null && x.NoCode == data.NoCode) {
        x.State = 1
      }
    })
  })
  // 加入会话成功
  globalStore.socket.on('joinSuccess', (data: any) => {
    globalStore.sender.OnlineState = true
    globalStore.setConversitionList(data.conversition)
    globalStore.setSessionList(data.historySessionList)
  })
  //接收信息
  globalStore.socket.on('reviceMsg', (data: Conversition) => {
    if (data.ReciverId === globalStore.sender.Id) {
      globalStore.playMusic()
      if (window.Notification && Notification.permission !== 'denied') {
        Notification.requestPermission(function (status) {
          let n = new Notification('HasChat消息通知', {
            body: '你有一条新的消息',
          })
        })
      }
      for (let item of globalStore.sessionList) {
        if (
          item.Id === data.SendId &&
          globalStore.sessionSelectId === data.SendId
        ) {
          data.ReadFlag = true
          let query = {
            SendId: data.SendId,
            ReciverId: globalStore.sender.Id,
          }
          globalStore.socket.emit('changeMsgRead', query)
          break
        }
      }
    }
    globalStore.sendLocal(data)
    let len =
      globalStore.sessionList.filter((x: any) => x.Id === data.SendId)
        ?.length ?? 0
    if (len === 0) {
      let item = globalStore.allSessionList.filter(
        (x: any) => x.Id === data.SendId,
      )
      globalStore.setPushSessionList({ ...item })
    }
    globalStore.toBottom()
  })
  //多设备在线时，强制旧设备下线
  globalStore.socket.on('squeezeOut', (data: any) => {
    if (data.noCode === globalStore.noCode) {
      globalStore.setLogout()
      message.info('账户在其他地方登陆，会话已断开!')
      proxy.$router.replace({
        name: 'Login',
      })
    }
  })
}
</script>

<style lang="less" scoped>
.chat {
  width: 100%;
  height: 100%;
  display: flex;
  border-radius: 33px;
}
</style>
