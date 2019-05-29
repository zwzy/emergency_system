const UMO = window.UMO
function setEvtHandler (event){
  return {
  // 就绪状态
  // 服务端与 CTI 服务器连接建立(1)或断开(0)时触发。 浏览器 JS 与服务器无法连接时会触发 state=0。
  // status 就绪(可登录) 0未就绪
  onReadyState: function(status)
  {
    event.onReadyState(status)
    console.log("onReadyState: " + status); 
  },
  // 来电
  // 电话到达时触发
  // ano:”” 主叫号码
  // bno:”” 被叫号码 
  // uud:”” 业务数据，”dialout”分机拨出、”misc:callback”分机回呼
  onCallincome: (ano, bno, uud) => {
    event.onCallincome(ano, bno, uud)
    console.log('根据来电分机号，获取用户信息')
    console.log("onCallincome: 来电分机号=" + ano + " 本机分号=" + bno + " uud= 分机拨出，分机回呼" + uud);
  },
  // 通话通知
  // 双方通话建立时触发。
  // ano:”” 主叫号码
  // bno:”” 被叫号码 
  // uud:”” 业务数据
  onTalked: (ano, bno, uud) => {
    event.onTalked(ano, bno, uud)
    console.log("onTalked: ano=" + ano + " bno=" + bno + " uud=" + uud);
  },
  // 振铃停止
  // 在来话接接听或久叫不应用户端挂断时触发。
  onRingStoped: (ano,bno,cno) => {
    event.onRingStoped()
    console.log(888, "onRingStoped");
  },
  // 话机状态
  // 在话机摘机或挂机时触发。
  // status 话机状态，1 挂机 2 摘机
  onHookChanged: (status) => {
    event.onHookChanged(status)
    if(status === '1') {
      console.log("挂机");
      event.onRingStoped()
    } else {
      console.log("摘机");
    }
  },
  // 话务员状态
  // 在话务员示忙、示闲、接听电话或挂断电话时触发。
  // 话务员状态:1 未登录 2 空闲 3 离开 4 工作
  onAgentChanged: (status) => {
      event.onAgentChanged(status)
      console.log("onAgentChanged: status=" + status);
  },
  // 异步任务结束
  // 在异步呼叫结束时触发。
  onAsyncFinished: (atype, taskid, ret, desc) => {
    event.onAsyncFinished(atype, taskid, ret, desc)
    console.log("onAsyncFinished: atype=" + atype + " taskid=" + taskid + " ret=" + ret + " desc=" + desc);
  },
  // 座席全忙通知
  // 在座席全忙和座席有全忙变成不全忙时触发。[IXServer]专用。
  // status:"" //1 全忙 0 非全忙 
  // acd:"" //队列号 
  // quelen:"" //队列长度
  onAllBusy: (status, acd, quelen) => {
    event.onAllBusy(status, acd, quelen)
    console.log("onAllBusy: status=" + status + " acd=" + acd + " quelen=" + quelen);
  },
  // 队列长度通知
  // 在 ACD 队列长度发生变化时触发。
  // acd:””, //acd 号码 
  // quelen:”” //队列长度
  onQuelen: (acd, quelen) => {
    event.onQuelen(acd, quelen)
    console.log("onQuelen: acd=" + acd + " quelen=" + quelen);
  },
  // 短信到达通知
  // 在收到短信时触发。
  // dtime:””, //时间 
  // from:””, //来源号码 
  // content:””, //内容 
  // slot:”” //设备号
  onSmsincome: (dtime, from, content, slot) => {
    event.onSmsincome(dtime, from, content, slot)
    console.log("onSmsincome: dtime=" + dtime + " from=" + from+ " content=" + content + " slot=" + slot);
  },
  // 操作回调通知
  // 在 IVR 菜单中配置了操作回调后，IVR 来话执行菜单操作时触发。
  onOperCallback: (flowid, callid, cdrid, direction, teleno, time, menuid, keypress, state) => {
   console.log("onOperCallback: : flowid=" + flowid + " callid=" + callid + " cdrid=" + cdrid +  " direction=" + direction
    + " teleno=" + teleno  + " time=" + time  + " menuid=" + menuid + " keypress=" + keypress 
    + " state=" + state)
  },

  // 速拨回调通知
  // callid:””, // 呼叫 ID // 接通回调含对方呼叫 ID，冒号分隔
  // cdrid:””  //话单唯一 ID，对应话单中的 srccallid
  // direction,// in/out
  // teleno, // 被叫号码
  // time, // 时间
  // menuid,//当前菜单 ID
  // keypress, // 当前按码
  // state:””,  //状态 -1 呼叫失败 0 呼叫发起完成 //1 单个开始 2 单个呼通 3 单个拆线  //4 流程控制 5 流程结束 6 按码事件 //7 会议创建 8 单个振铃
  // desc:””, //状态描述，state=6:按码值 7:会议 ID
  // sessionid:””, //速拨会话 ID，对应话单中的 callingcallid
  //recfile:”” // //录音文件
  onSpeedCallback: (flowid, callid, cdrid, direction, teleno, time, menuid, keypress, state, desc, sessionid) => {
    console.log("onSpeedCallback: flowid=" + flowid + " callid=" + callid + " cdrid=" + cdrid + " direction=" + direction
      + " teleno=" + teleno  + " time=" + time  + " menuid=" + menuid + " keypress=" + keypress 
      + " state=" + state  + " desc=" + desc + " sessionid=" + sessionid );
  },
  // 文字消息通知
  // 在收到文字消息时触发。
  // fromaid:"" //来源工号
  // chatmode:"" //消息模式 1 广播 2 点对点 
  // text:"" //内容
  onTextMessage: (fromaid, chatmode, text) => {
    console.log("onTextMessage: fromaid=" + fromaid + " chatmode=" + chatmode+ " content=" + text);
  }
  }
}

// login
// 用户登录ACD
export function userLoginACD(data = {}, event = {
  onReadyState: ()=>{},
  onCallincome: () => {}, 
  onTalked: () => {},
  onRingStoped: () => {},
  onHookChanged: () => {},
  onAgentChanged: () => {},
  onAsyncFinished: () => {},
  onAllBusy: () => {},
  onQuelen: () => {},
  onSmsincome: () => {}
}) {
  const params = {
    apihost: 'http://192.168.7.61:8181/IPServer',  // 域名
    bizhost: null,                                 // 
    eid: '0',                                      // 企业密码
    aid: '1000',                                   // 工号
    adn: '1000',                                   // 绑定分机
    apwd: window.hex_md5('123456'),                // 密码
    epwd: window.hex_md5(''),                      // 企业密码
    EvtHandler: setEvtHandler(event),                   // 回调方法
  }
  const {apihost, bizhost, eid, aid, adn, apwd, epwd, EvtHandler} = params
  UMO.start(apihost, bizhost, EvtHandler, eid, epwd, aid, apwd,adn, function(cmd, result) {
    if(result.errno === 0) {
      console.log(cmd, result.token)
      const acd = '2000'  // 坐席
      // login: function(aid, acd, skill, mon, silent, cb, w)
      // UMO.login(aid, acd, -1, false, false, cbResult, null);
      UMO.login(aid, acd, -1, false, false, function(res) {
        console.log(res)
        getUmoData()
      }, null)
      sessionStorage.setItem('token', result.token)
    }
  })
}
// 拨打
export function callOutPhone(data = {uud: '', phoneNumber: '1008', gid: '@0' }) {
  const {phoneNumber, uud, gid} = data
  UMO.dialout( phoneNumber, gid, uud, true, () => {
  }, null)
}

// 转接
// 初始转移
export function startTransferPhone(data = {uud: '', phoneNumber: ''}) {
  const {phoneNumber, uud} = data
  UMO.inittrans(phoneNumber, uud, true, ()=>{}, null)
}
// 完成转移
export function endTransferPhone() {
  UMO.comptrans(()=>{}, null)
}

// 会议
// 初始会议
export function startTransferMeeting(data = {uud: '', phoneNumber: ''}) {
  const {uud, phoneNumber} = data
  UMO.initconf(phoneNumber, uud, true, ()=>{}, null)
}

//完成会议
export function endTransferMeeting(data = {uud: '', phoneNumber: ''})
{
  const {uud, phoneNumber} = data
  UMO.compconf(phoneNumber, uud, true, ()=>{}, null)
}

// 挂断
export function hangUpPhone (callback = ()=>{}) { 
  UMO.onhook(()=>{
    callback()
  })
}
export function getUmoData (data) {
  const where = ''
  const group = ''
  const order = ''
  const mode = 'q'
  // recordID: 记录 ID
  // FileDate: 文件日期
  // Direction: 方向 设备的话单方向(呼 入/呼出/呼转- 1/0/2)
  // Ano: 本次通话的主叫号
  // Bno： 本次通话的被叫号 码
  // BegTime: 话单开始 时间 本次通话开始时间， 年月日时分秒 (yyyymmddhhnns s)
  // EndTime 本次通话结束时间， 年月日时分秒 (yyyymmddhhnns s)
  // Duration  本次通话时长，单位 秒
  // AgentID  参与了该设备通话 的座席 ID
  // ForceOnhook (系统挂/用户挂- 1/0)
  // IsCallOk  呼叫是否成功，1- 成功 0-失败
  // RingDuration  振铃时长，被应答前 听回来音的时间
  // HoldDuration 保持累计时长，单位 秒，呼叫对象调用 Hold 函数听等待音
  // IsTransOut 转出标志
  // RouteAgentTime 座席接听时间 (yyyymmddhhnnss)
  // RoutedDN 落地号码
  // RoutedTime 接听时间(yyyymmddhhnnss)

  UMO.dataoper('t_sheetrecord', 'system', mode, 'recordID, ano, bno, direction,duration,begTime, endTime,ringDuration', 'vals', where, group,
    order, 20, 1, function(cmd, result){
      console.log(result)
    if ((mode == "q") && (result.errno == 0))
    {
       console.log(111, result.data)
      //  ["ano", "direction", "fileDate"]
      //  1: (3) ["1001", "0", "20190518083730"]
      //  2: (3) ["1009", "0", "20190518184149"]
      //  3: (3) ["1009", "0", "20190518184221"]
    }
  }, null);
}


// 保持
export const callKeepEvent = () => {
  // const {type, handleBtnlist} = this.state
  // Modal.confirm({
  //   title: type === 'hold' ? '挂起': '恢复',
  //   content: `确定要${ type === 'hold' ? '挂起': '恢复'}么？`,
  //   okText: '确认',
  //   cancelText: '取消',
  //   onOk:()=>{
  //     if(type === 'hold') {
  //       window.UMO.hold(false, (res, res1)=>{
  //         const newhandleBtnlist = handleBtnlist
  //         newhandleBtnlist[3].tit = '恢复'
  //         this.setState({handleBtnlist: newhandleBtnlist, type: 'huifu'})
  //       }, null)
  //     } else {
  //       window.UMO.retrieve((res, res1)=>{
  //         const newhandleBtnlist = handleBtnlist
  //         newhandleBtnlist[3].tit = '挂起'
  //         this.setState({type: 'hold', handleBtnlist: newhandleBtnlist})
  //       }, null)
  //     }
  //     message.success('操作成功')
  //   }
  // });
}