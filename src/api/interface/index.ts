// * 请求响应参数(不包含data)
export interface Result {
  code: string
  message: string
}

// * 请求响应参数(包含data)
export interface ResultData extends Result {
  data: any
}

// * 登录模块
export namespace Login {
  export interface ReqLogin {
    email: string
    password: string
  }
  export interface ResLogin {
    myInfo: any
    token: string
  }
}

// * 验证码模块
export namespace SendCode {
  export interface ReqSendCode {
    email: string
    timestamp: number
  }
  export interface ReqCheckCode {
    verificationCode: string
    timestamp: number
  }
}

// * 用户模块
export namespace User {
  export interface ReqUserList {
    id: number
    pageIndex: number
    pageSize: number
  }
}

// 上传文件
export interface File {
  data: any
}
