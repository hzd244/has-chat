<template>
  <div class="content-win">
    <chat-head></chat-head>
    <div class="chat-body">
      <n-scrollbar ref="contentScrollbar">
        <template v-for="(item, index) in conversitionList" :key="index">
          <div v-if="item.SendId == globalStore.sender.Id">
            <div class="mine-block">
              <div v-if="item.State == 0">
                <n-spin
                  :class="item.Type == 1 ? 'mine-image-load' : 'mine-load'"
                  size="small"
                />
              </div>
              <div v-else-if="item.State == -1">
                <span class="item.Type == 1 ? 'sendImageError':'sendError'"
                  >!</span
                >
              </div>
              <div
                v-if="item.Type == 0"
                class="block row-center"
                v-html="item.Content"
              ></div>
              <img
                v-else-if="item.Type == 1"
                class="send-image"
                v-bind:src="item.Content"
                @click="loadOverImg(item.Content)"
                preview="1"
              />
              <video-player
                v-else-if="item.Type == 2"
                :src="item.Content"
                controls
                class="send-video"
                :volume="0.6"
                :height="100"
                :width="200"
                :playback-rates="[0.7, 1.0, 1.5, 2.0]"
                playsinline
              ></video-player>
              <audio class="send-video" v-else-if="item.Type == 3" controls>
                <source :src="item.Content" type="audio/mpeg" />
                您的浏览器不支持该音频格式。
              </audio>

              <div class="mine-avatar">
                <img v-bind:src="item.Avatar" />
              </div>
            </div>
            <div style="clear: both"></div>
          </div>
          <div v-else-if="item.SendId == globalStore.reciver.Id">
            <div v-if="item.State == 1" class="reciver-block">
              <div class="reciver-avatar">
                <img v-bind:src="item.Avatar" />
              </div>
              <div
                v-if="item.Type == 0"
                class="block row-center"
                v-html="item.Content"
              ></div>
              <img
                v-else-if="item.Type == 1"
                class="send-image"
                v-bind:src="item.Content"
                @click="loadOverImg(item.Content)"
                preview="1"
              />
              <video
                class="send-video"
                v-else-if="item.Type == 2"
                width="320"
                height="240"
                controls
              >
                <source :src="item.Content" type="video/mp4" />
                您的浏览器不支持 HTML5 video 标签。
              </video>
              <audio class="send-video" v-else-if="item.Type == 3" controls>
                <source :src="item.Content" type="audio/mpeg" />
                您的浏览器不支持该音频格式。
              </audio>
            </div>
            <div style="clear: both"></div>
          </div>
          <div v-else-if="item.Identity == 3">
            <div class="other-block">
              <span>{{ item.Content }}</span>
            </div>
          </div>
        </template>
      </n-scrollbar>
    </div>
    <chat-foot></chat-foot>
  </div>
</template>

<script setup lang="ts">
import { GlobalStore } from '@/store/index'
import Conversition from '@/class/Conversition'
import ChatHead from './chatHead.vue'
import ChatFoot from './chatFoot.vue'

const { proxy }: any = getCurrentInstance()
const globalStore = GlobalStore()

onMounted(() => {
  proxy.$nextTick(() => {
    globalStore.contentScrollbar = proxy.$refs.contentScrollbar
  })
})

// 获取会话列表
const conversitionList = computed(() => {
  return globalStore.conversitionList.filter(
    (x: Conversition) =>
      (x.SendId === globalStore.sender.Id &&
        x.ReciverId === globalStore.reciver.Id) ||
      (x.ReciverId === globalStore.sender.Id &&
        x.SendId === globalStore.reciver.Id),
  )
})

// 图片预览
const loadOverImg = (img: string) => {
  let images = [img]
  proxy.$viewerApi({
    images: images,
  })
}
</script>

<style lang="less" scoped>
.content-win {
  position: relative;
  width: 100%;
  height: 100%;
  .chat-body {
    width: 100%;
    height: 57%;
    .block {
      width: auto;
      height: auto;
      padding: 3px 10px;
      border-radius: 5px;
      position: relative;
      max-width: 200px;
      text-align: left;
      box-sizing: border-box;
    }
    .send-video {
      margin: 0 10px;
    }
    .mine-block {
      float: right;
      margin: 20px 0;
      display: flex;
      position: relative;
      .mine-image-load {
        position: absolute;
        left: -50px;
        top: 50%;
        transform: translateY(-50%);
      }
      .mine-load {
        position: absolute;
        left: -50px;
        top: 50%;
        transform: translateY(-50%);
      }
      .send-image {
        border-radius: 11px;
        max-width: 200px;
        overflow: hidden;
        max-height: 200px;
        width: 200px;
        height: auto;
        margin-right: 10px;
        cursor: pointer;
      }

      .block {
        background: @primary-bgcolor4;
        color: @primary-txcolor;
        margin-right: 10px;
        float: right;
      }

      .mine-avatar {
        width: 40px;
        height: 40px;
        float: right;
        margin-right: 15px;
        img {
          height: 100%;
          width: 100%;
        }
      }
    }

    .reciver-block {
      float: left;
      margin: 20px 0;
      display: flex;
      position: relative;
      .send-image {
        border-radius: 11px;
        max-width: 200px;
        overflow: hidden;
        max-height: 200px;
        width: 100px;
        height: auto;
        margin-left: 10px;
        cursor: pointer;
      }
      .reciver-avatar {
        width: 40px;
        height: 40px;
        margin-left: 15px;
        float: left;
        img {
          height: 100%;
          width: 100%;
        }
      }
      .block {
        background: @primary-bgcolor5;
        color: @primary-txcolor3;
        margin-left: 10px;
        float: left;
      }
    }

    .other-block {
      display: flex;
      position: relative;
      padding: 10px;
      background: @primary-bgcolor6;
      color: @primary-txcolor4;
      border-radius: 5px;
      max-width: 400px;
      margin: 0 auto;
      margin-top: 10px;
      margin-bottom: 10px;
      span {
        display: inline-block;
        margin: 0 auto;
      }
    }
  }
}
</style>

<style lang="less">
.block {
  p {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    max-width: 100%;
    margin: 0;
    font-size: 15px;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 100; // 行数
  }
  img {
    width: 30px;
    height: auto;
    margin: 2.5px 2.5px;
  }
}
.mine-block {
  .video-js {
    width: 300px;
    height: 150px;
    .vjs-big-play-button {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 50px !important;
      height: 40px !important;
      line-height: 40px !important;
      border: none !important;
      background-color: #000;
    }
  }
}
</style>
