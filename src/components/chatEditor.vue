<template>
  <div class="edit-box">
    <n-scrollbar style="height: 73%">
      <div class="editor">
        <div
          ref="chatEditor"
          :id="id"
          @keydown.enter="keyDown($event)"
          @click="onFous"
        />
        <input ref="upload" type="file" style="opacity: 0; display: none" />
      </div>
    </n-scrollbar>
    <n-tooltip
      placement="bottom-end"
      trigger="click"
      :show="globalStore.showPopover"
    >
      <template #trigger>
        <div class="btn-wrap">
          <n-button
            type="info"
            class="send-btn"
            title="按enter键发送，按ctrl+enter键换行"
            @click="sendVerify"
            :color="globalStore.theme == 'default' ? '#18A058' : '#409EFF'"
            >发送(S)</n-button
          >
        </div>
      </template>
      <span> 不能发送空白消息 </span>
    </n-tooltip>
  </div>
</template>

<script setup lang="ts">
import { GlobalStore } from '@/store/index'
import { browserType } from '@/utils/util'
import Conversition from '@/class/Conversition'

const message = useMessage()
const globalStore = GlobalStore()
const { proxy }: any = getCurrentInstance()

defineProps<{
  value: any
  id: string
  height: number
  placeholder: string
}>()

// 聚焦取消表情包显示
const onFous = () => {
  globalStore.setExpressionShow(false)
}

const keyDown = (event: any) => {
  if (event.ctrlKey && event.keyCode === 13) {
    let len = globalStore.editor.txt.html().trim().length
    if (browserType() === 'IE' || browserType() === 'Edge') {
      if (len == 0) {
        globalStore.editor.cmd.do('insertHTML', '<div></div><div></div>')
      } else {
        globalStore.editor.cmd.do('insertHTML', '<div></div>')
      }
    } else if (browserType() === 'FF') {
      if (len == 0) {
        globalStore.editor.cmd.do('insertHTML', '<br/><br/><br/><br/>')
      } else {
        globalStore.editor.cmd.do('insertHTML', '<br/><br/>')
      }
    } else {
      if (len === 0) {
        globalStore.editor.cmd.do(
          'insertHTML',
          '<div><br/></div><div><br/></div>',
        )
      } else {
        globalStore.editor.cmd.do('insertHTML', '<div><br/></div>')
      }
    }
  } else if (event.keyCode === 13) {
    event.preventDefault() // 阻止浏览器默认换行操作
    sendVerify()
    return false
  }
}

// 发送校验
const sendVerify = () => {
  let sendContent = globalStore.editor.txt.html().trim()
  if (sendContent.length === 0) {
    globalStore.showPopover = true
    setTimeout(() => {
      globalStore.showPopover = false
    }, 1000)
    return
  } else {
    let noCode = +new Date() + ''
    let conversition = new Conversition(
      globalStore.sender.Id,
      globalStore.reciver.Id,
      sendContent,
      0,
      0,
      noCode,
      '',
      '',
      '',
      '',
      '',
      false,
      globalStore.sender.Avatar,
    )
    if (globalStore.socket === null) {
      message.warning('socket实例为空!')
      return
    }
    globalStore.sendLocal(conversition)
    globalStore.sendInfo(conversition)
  }
  clear()
}

// 清空
const clear = () => {
  try {
    return globalStore.editor.txt.clear()
  } catch (e) {
    console.warn(e)
  }
}

// 获取文本
const getText = () => {
  try {
    globalStore.editor.txt.text()
  } catch (e) {
    console.warn(e)
  }
}

// 获取html 有值时为设置内容
const getHtml = (value: any) => {
  try {
    return globalStore.editor.txt.html(value)
  } catch (e) {
    console.warn(e)
  }
}

onMounted(() => {
  globalStore.initEditor()
  proxy.$nextTick(() => {
    globalStore.setChatEditor(proxy.$refs.chatEditor)
  })
})
</script>

<style lang="less" scoped>
.edit-box {
  position: relative;
  width: 100%;
  height: 70%;
  border: 1px solid #ccc;

  .editor {
    text-align: left;
  }
  .btn-wrap {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 35%;
    .send-btn {
      position: absolute;
      bottom: 5px;
      right: 10px;
    }
  }
}
</style>

<style lang="less">
.w-e-text-container {
  border: none !important;
  height: 100% !important;
  padding: 6px 0;
  .w-e-text {
    p {
      display: flex;
      align-items: center;
      margin: 0;
      height: 15px;
      line-height: 15px;
      flex-wrap: wrap;
      font-size: 13px !important;
      word-break: break-all;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 100;
      img {
        width: 20px;
        height: auto;
        margin: 0 5px;
      }
    }
  }
  > div {
    min-height: 135px;
  }
  .placeholder {
    font-size: 13px;
    top: 0 !important;
  }
}
</style>
