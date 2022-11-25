import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'
import './assets/css/common.less'
import './assets/style/variables.less'
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
import VueVideoPlayer from '@videojs-player/vue'
import 'video.js/dist/video-js.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

let options = {
  defaultOptions: {
    zIndex: 99999,
    title: false,
    toolbar: false,
  },
}

const app = createApp(App)

app
  .use(ElementPlus)
  .use(VueViewer, options)
  .use(VueVideoPlayer)
  .use(router)
  .use(pinia)
  .mount('#app')
