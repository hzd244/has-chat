import { defineStore } from 'pinia'
import { LoginState } from '../interface/index'

export const LoginStore = defineStore({
  id: 'LoginState',
  state: (): LoginState => ({
    form: { email: '', password: '' },
    registerForm: {
      name: '',
      email: '',
      password: '',
      surePassword: '',
      avatar: '',
    },
    isLogin: 1,
    timestamp: +new Date(),
    showModal: false,
    step: 1,
    verificationCode: '',
    sendVerificationCodeState: false,
    hasSendVerificationCode: false,
    countdown: 20,
    showPopover: false,
    gifIndex: 1,
    loading: false,
    codeLoading: false,
    loadingNumber: 2,
  }),
  getters: {},
  actions: {
    setForm(form: any) {
      this.form = form
    },
    setRegisterForm(registerForm: any) {
      this.registerForm = registerForm
    },
    setIsLogin(isLogin: number) {
      this.isLogin = isLogin
    },
    setShowModal(showModal: boolean) {
      this.showModal = showModal
    },
    setVerificationCode(verificationCode: string) {
      this.verificationCode = verificationCode
    },
    setSendVerificationCodeState(sendVerificationCodeState: boolean) {
      this.sendVerificationCodeState = sendVerificationCodeState
    },
    setHasSendVerificationCode(hasSendVerificationCode: boolean) {
      this.hasSendVerificationCode = hasSendVerificationCode
    },
    setCountdown(countdown: number) {
      this.countdown = countdown
    },
    setLoading(loading: boolean) {
      this.loading = loading
    },
    setCodeLoading(codeLoading: boolean) {
      this.codeLoading = codeLoading
    },
    setLoadingNumber(loadingNumber: number) {
      this.loadingNumber = loadingNumber
    },
    setShowPopover(showPopover: boolean) {
      this.showPopover = showPopover
    },
    setGifIndex(gifIndex: number) {
      this.gifIndex = gifIndex
    },
  },
})
