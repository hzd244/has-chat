/**
 * GlobalState
 */
export interface GlobalState {
  sender: any
  reciver: any
  readyReciver: any
  navId: number
  sessionList: any
  sessionSelectId: number
  allSessionList: any
  allSessionSelectId: number
  socket: any
  noCode: number
  navList: any
  conversitionList: any
  expressions: any
  expressionShow: boolean
  contentScrollbar: any
  chatEditor: any
  editor: any
  showPopover: boolean
  editorData: any
  theme: string
  loginType: 'login' | 'register'
  openMusic: boolean
  tipMusic: any
  expressionRef: any
  emjonRef: any
}

/**
 * LoginState
 */
export interface LoginState {
  form: { email: string; password: string }
  registerForm: {
    name: string
    email: string
    password: string
    surePassword: string
    avatar: string
  }
  isLogin: number
  timestamp: number
  showModal: boolean
  step: number
  verificationCode: string
  sendVerificationCodeState: boolean
  hasSendVerificationCode: boolean
  countdown: number
  showPopover: boolean
  gifIndex: number
  loading: boolean
  codeLoading: boolean
  loadingNumber: number
}
