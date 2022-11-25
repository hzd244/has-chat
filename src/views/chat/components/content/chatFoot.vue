<template>
  <footer class="win-foot">
    <!-- 工具栏 -->
    <ul class="foot-tool">
      <li
        @click="handleExpressionShow"
        class="iconfont icon-biaoqing ex"
        ref="expressionRef"
      ></li>
      <li
        class="iconfont icon-tupian"
        @click="globalStore.expressionShow = false"
      >
        <input
          ref="uploadPic"
          name="customerService"
          value=""
          @change="sendImg($event)"
          type="file"
          class="file-image"
          accept="image/*"
        />
      </li>
      <li
        class="iconfont icon-shipin"
        @click="globalStore.expressionShow = false"
      >
        <input
          ref="uploadVideo"
          name="customerService"
          value=""
          @change="sendVideo($event)"
          type="file"
          class="file-video"
          accept="video/*"
        />
      </li>
    </ul>
    <!-- 表情包 -->
    <expression v-show="globalStore.expressionShow"></expression>
    <!-- 输入框 -->
    <chat-editor
      v-model:value="globalStore.sendInfo"
      ref="editor"
      id="chatEditor"
      :height="135"
      class="answer-editor"
      placeholder=" "
    >
    </chat-editor>
  </footer>
</template>

<script setup lang="ts">
import expression from '@/components/expression.vue'
import ChatEditor from '@/components/chatEditor.vue'
import { GlobalStore } from '@/store/index'
import Conversition from '@/class/Conversition'
import { uploadFile } from '@/api/modules/file'

const globalStore = GlobalStore()
const message = useMessage()
const { proxy }: any = getCurrentInstance()

// 发送图片
const sendImg = (event: any) => {
  console.log(event.target.files[0])
  const fileObj = event.target.files[0]
  if (fileObj != null) {
    if (!/image\/\w+/.test(fileObj.type)) {
      message.warning('请选择图片文件!')
      return
    }
    let fd = new FormData()
    fd.append('file', fileObj)
    if (fileObj.size > 1024 * 1024 * 10) {
      message.warning('上传图片不能超过10M!')
    } else {
      let reader = new FileReader()
      reader.readAsDataURL(fileObj)
      // 读取文件成功
      reader.onload = (e: any) => {
        sendVerify(e.target.result, 1)
        proxy.$refs.uploadPic.value = null
      }
    }
  }
}

// 发送视频
const sendVideo = async (event: any) => {
  const resultFile = event.target.files[0]
  console.log(resultFile)
  const fileObj = new Blob([resultFile], { type: 'video/mp4' })
  console.log(fileObj)
  const tempFilePath = URL.createObjectURL(fileObj)
  console.log(tempFilePath)
  let noCode = +new Date() + ''
  let conversition = new Conversition(
    globalStore.sender.Id,
    globalStore.reciver.Id,
    tempFilePath,
    2,
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
  globalStore.sendLocal(conversition)
  let res: any = await uploadFileFun(event.target.files[0])
  if (res.code === 200) {
    conversition.Content = res.content
    globalStore.sendInfo(conversition)
  }
  proxy.$refs.uploadVideo.value = null
}

//上传文件资源
const uploadFileFun = (tempFilePath: string) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData()
    formData.append('file', tempFilePath)
    let result = {
      code: 500,
      content: '',
    }
    uploadFile(formData)
      .then((res: any) => {
        if (res?.length > 0) {
          result.code = 200
          result.content = `https://howcode.online/api/getFile?url=${res[0].filename}${res[0].originalname}`
          resolve(result)
        } else {
          reject(result)
        }
      })
      .catch(err => {
        resolve(result)
      })
  })
}

// 发送校验
const sendVerify = (content: string, type: number) => {
  let noCode = +new Date() + ''
  let conversition = new Conversition(
    globalStore.sender.Id,
    globalStore.reciver.Id,
    content,
    type,
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

const handleExpressionShow = () => {
  globalStore.setExpressionShow(!globalStore.expressionShow)
}

onMounted(() => {
  proxy.$nextTick(() => {
    globalStore.setExpressionRef(proxy.$refs.expressionRef)
  })
})
</script>

<style lang="less" scoped>
.win-foot {
  position: relative;
  width: 100%;
  height: 35%;
  z-index: 10;
  background-color: #fff;
  padding: 0 20px;
  .foot-tool {
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    li {
      margin: 5px 10px;
      font-size: 25px !important;
      position: relative;
      .file-image,
      .file-video {
        margin-top: 5px;
        z-index: 1;
        position: absolute;
        opacity: 0;
        bottom: 0px;
        left: 0px;
        height: 40px;
        width: 25px;
      }
    }
    li:nth-child(1) {
      margin-left: 0;
    }
  }
}
</style>
