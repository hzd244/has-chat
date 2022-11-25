import { defineStore, createPinia } from 'pinia'
import { GlobalState } from './interface'
import User from '@/class/User'
import Conversition from '@/class/Conversition'
import expressions from '../json/expressions.json'
import E from 'wangeditor'
import { localRemove } from '@/utils/util'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export const GlobalStore = defineStore({
  id: 'GlobalState',
  state: (): GlobalState => ({
    sender: User, // 发送消息者
    reciver: User, // 接收消息者
    readyReciver: User, // 准备接收消息者
    navId: 2, // 导航栏选中项的id
    sessionList: [], //消息列表
    sessionSelectId: 0, //消息列表选中项的id
    allSessionList: [], // 用户列表的数据
    allSessionSelectId: 0, // 用户列表选中项的id
    socket: null, // 是否创建socket实例
    noCode: +new Date(),
    contentScrollbar: null,
    chatEditor: null,
    editor: null, // 编辑器实例
    navList: [
      // 导航栏数据
      { id: 1, name: '消息', icon: 'icon-message' },
      { id: 2, name: '用户', icon: 'icon-merbe' },
    ],
    conversitionList: [], // 消息列表
    expressions: expressions, // 表情包大全
    expressionShow: false, // 显示表情包
    editorData: '', // 编辑器中的数据
    theme: '', // 主题
    loginType: 'login', // 登录类型（注册/登录）
    openMusic: false, // 打开音乐
    tipMusic: null, // 关闭音乐
    showPopover: false,
    expressionRef: null,
    emjonRef: null,
  }),
  getters: {},
  actions: {
    // 声音提示
    playMusic() {
      if (this.tipMusic != null && this.openMusic) {
        this.tipMusic.currentTime = 0
        this.tipMusic.play()
      }
    },
    // 设置会话窗口到达底部
    toBottom() {
      setTimeout(() => {
        this.contentScrollbar.scrollTo({ top: 99999 })
      }, 100)
    },
    // 修改信息已读状态
    changeReaded(id: number) {
      let userConversition = this.conversitionList.filter(
        (x: any) =>
          x.SendId === id && x.ReciverId === this.sender.Id && !x.ReadFlag,
      )
      if (userConversition.length > 0) {
        userConversition.map((x: any) => {
          x.ReadFlag = true
        })
      }
      let query = {
        SendId: id,
        ReciverId: this.sender.Id,
      }
      this.socket.emit('changeMsgRead', query)
    },
    // 初始化编辑器
    initEditor() {
      if (this.editor != null) {
        // 销毁编辑器
        this.editor.destroy()
        this.editor = null
      }
      this.editor = new E('#chatEditor')
      this.editor.config.showFullScreen = false
      this.editor.config.focus = true

      // 自定义菜单栏
      this.editor.config.menus = []

      // 编辑器内容、选区变化时的回调函数
      this.editor.config.onchange = (html: any) => {
        this.editorData = html
      }

      // 上传最多1张
      this.editor.config.uploadImgMaxLength = 1
      // 添加上传本地图片接口
      this.editor.config.customUploadImg = function (files: any, insert: any) {
        insert(files)
      }
      // 聚焦操作
      setTimeout(() => {
        this.editor.create()
        this.editor.txt.html(this.editorData)
      }, 200)
    },
    // 本地新增信息记录
    sendLocal(conversition: Conversition) {
      this.conversitionList.push(conversition)
      this.toBottom()
    },
    // websocket发送消息
    sendInfo(conversition: Conversition) {
      let data = {
        Conversition: conversition,
        ReciverId: this.reciver.Id,
        Sender: this.sender,
      }
      if (this.socket != null) {
        this.socket.emit('sendMsg', data)
      }
    },
    setLogout() {
      localRemove('token')
      localRemove('sender')
      if (this.socket != null) {
        this.socket.disconnect()
      }
    },
    setTheme(theme: string) {
      this.theme = theme
    },
    setAllSessionList(allSessionList: any) {
      this.allSessionList.push(...allSessionList)
    },
    setNavId(id: number) {
      this.navId = id
    },
    setLoginType(loginType: 'login' | 'register') {
      this.loginType = loginType
    },
    setSessionSelectId(sessionSelectId: number) {
      this.sessionSelectId = sessionSelectId
    },
    setReciver(reciver: User) {
      this.reciver = reciver
    },
    setReadyReciver(readyReciver: User) {
      this.readyReciver = readyReciver
    },
    setSessionList(sessionList: any) {
      this.sessionList = sessionList
    },
    setPushSessionList(data: any) {
      this.sessionList.push(data)
    },
    setAllSessionSelectId(allSessionSelectId: number) {
      this.allSessionSelectId = allSessionSelectId
    },
    setSocket(socket: any) {
      this.socket = socket
    },
    setOpenMusic(openMusic: boolean) {
      this.openMusic = openMusic
    },
    setTipMusic(tipMusic: any) {
      this.tipMusic = tipMusic
    },
    setConversitionList(conversitionList: any) {
      this.conversitionList = conversitionList
    },
    setSender(sender: User) {
      this.sender = sender
    },
    setExpressionShow(expressionShow: boolean) {
      this.expressionShow = expressionShow
    },
    setShowPopover(showPopover: boolean) {
      this.showPopover = showPopover
    },
    setChatEditor(chatEditor: any) {
      this.chatEditor = chatEditor
    },
    setEmjonRef(emjonRef: any) {
      this.emjonRef = emjonRef
    },
    setExpressionRef(expressionRef: any) {
      this.expressionRef = expressionRef
    },
  },
  persist: {
    key: 'main',
    storage: localStorage,
    paths: ['allSessionList', 'sessionList', 'sender'],
  },
})

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia
