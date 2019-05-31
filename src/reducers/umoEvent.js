// 通话概括信息

const initUmoEventState = {
  onReadyState:{       // 登录准备
    id: 1,                // 判断是否执行了该方法
    status: 0,            // 建立(1)或断开(0）
  }, // 号码
  onCallincome: {      // 来电
    id: 1,                // 判断是否执行了该方法
    ano: '',              // 主叫号码
    bno: '',              // 被叫号码
    uud: ''               // 业务数据，”dialout”分机拨出、”misc:callback”分机回呼
  },
  onTalked: {          // 开始通话
    id: 1,                // 判断是否执行了该方法
    ano: '',              // 主叫号码
    bno: '',              // 被叫号码
    uud: ''               // 业务数据，”dialout”分机拨出、”misc:callback”分机回呼
  },
  onRingStoped: {      // 用户久叫未有人接听挂断
    id: 1,                // 判断是否执行了该方法
  }, 
  onHookChanged: {     // 在话机摘机或挂机时触发
    id: 1,                // 判断是否执行了该方法
    status: '',           // 1 挂机 2 摘机
  },
  onAgentChanged: {    // 在话务员示忙、示闲、接听电话或挂断电话时触发。
    id: 1,                // 判断是否执行了该方法
    status: ''            // 1 未登录 2 空闲 3 离开 4 工作
  },
  onAsyncFinished: {   // 在异步呼叫结束时触发。
    id: 1,                // 判断是否执行了该方法
    atype: '',
    taskid: '',
    ret: '',
    desc: '',
  },
  onAllBusy: {         // 座席全忙通知
    id: 1,                // 判断是否执行了该方法
  },
  onQuelen:{           // 队列长度通知
    id: 1,                // 判断是否执行了该方法
  },
  onSmsincome: {       // 短信到达通知
    id: 1,                // 判断是否执行了该方法
    dtime: '',            // 时间 
    from: '',             // 来源号码 
    content: '',          // 内容 
    slot: ''              // 设备号
  }
}
const umoEvent = (state = initUmoEventState, action) => {
  console.log(action)
  switch (action.type) {
    case 'UPDATE_UMOEVENT_STATE':
      return {
        ...state,
        ...action.umoEventState
      }
    case 'RESET_UMOEVENT_STATE':
      return initUmoEventState
    default:
      return state
  }
}
export default umoEvent