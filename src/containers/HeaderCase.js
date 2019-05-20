import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import Header from '../components/Header'
import {Modal, message} from 'antd'

import { btnlist } from '../utils/config'
const modalItemStyle = {margin: '8px 0'}
export class HeaderCase extends Component {
  static propTypes = {
    userInformation: PropTypes.object
  }
 
  constructor(props) {
    super(props)
    this.EvtHandler = {
      onReadyState: function(status)
      {
        console.log("onReadyState: " + status);
      },
      // 来电
      onCallincome: (ano, bno, uud) => {
        this.setState({
          callInIsShow: true,
        })
        console.log('根据来电分机号，获取用户信息')
        console.log("onCallincome: 来电分机号=" + ano + " 本机分号=" + bno + " uud= 分机拨出，分机回呼" + uud);
      },
      onTalked: (ano, bno, uud) => {
        console.log("onTalked: ano=" + ano + " bno=" + bno + " uud=" + uud);
      },
      // 挂断
      onRingStoped: () => {
        this.setState({
          callInIsShow: false,
        })
        console.log("onRingStoped");
      },

      onHookChanged: (status) => {
        console.log("onHookChanged: status=" + status);
      },
  
      onAgentChanged: (status) => {
          console.log("onAgentChanged: status=" + status);
      },
  
      onAsyncFinished: (atype, taskid, ret, desc) => {
        console.log("onAsyncFinished: atype=" + atype + " taskid=" + taskid + " ret=" + ret + " desc=" + desc);
      },

      onAllBusy: (status, acd, quelen) => {
        console.log("onAllBusy: status=" + status + " acd=" + acd + " quelen=" + quelen);
      },
  
      onQuelen: (acd, quelen) => {
        console.log("onQuelen: acd=" + acd + " quelen=" + quelen);
      },
  
      onSmsincome: (dtime, from, content, slot) => {
        console.log("onSmsincome: dtime=" + dtime + " from=" + from+ " content=" + content + " slot=" + slot);
      },
      onOperCallback: (flowid, callid, cdrid, direction, teleno, time, menuid, keypress, state) => {
       console.log("onOperCallback: : flowid=" + flowid + " callid=" + callid + " cdrid=" + cdrid +  " direction=" + direction
        + " teleno=" + teleno  + " time=" + time  + " menuid=" + menuid + " keypress=" + keypress 
        + " state=" + state)
      },
  
      onSpeedCallback: (flowid, callid, cdrid, direction, teleno, time, menuid, keypress, state, desc, sessionid) => {
        console.log("onSpeedCallback: flowid=" + flowid + " callid=" + callid + " cdrid=" + cdrid + " direction=" + direction
          + " teleno=" + teleno  + " time=" + time  + " menuid=" + menuid + " keypress=" + keypress 
          + " state=" + state  + " desc=" + desc + " sessionid=" + sessionid );
      },
      onTextMessage: (fromaid, chatmode, text) => {
        console.log("onTextMessage: fromaid=" + fromaid + " chatmode=" + chatmode+ " content=" + text);
      }
    }
    this.state = {
       type: 'hold',
       handleBtnlist: btnlist,
       isLogin: false,
       callInIsShow: false,         // 来电通知modal
    }
  }
  componentDidMount() {
    const params = {
      apihost: 'http://192.168.7.61:8181/IPServer',  // 域名
      bizhost: null,                                 // 
      eid: '0',                                      // 企业密码
      aid: '1000',                                   // 工号
      adn: '1000',                                   // 绑定分机
      apwd: window.hex_md5('123456'),                // 密码
      epwd: window.hex_md5(''),                      // 企业密码
      EvtHandler: this.EvtHandler,                   // 回调方法
    }
    const {apihost, bizhost, eid, aid, adn, apwd, epwd, EvtHandler} = params
    window.UMO.start(apihost, bizhost, EvtHandler, eid, epwd, aid, apwd,adn, function(cmd, result) {
      if(result.errno === 0) {
        console.log(cmd, result.token)
        const acd = '2000'  // 坐席
        const token = result.token
        // login: function(aid, acd, skill, mon, silent, cb, w)
        // UMO.login(aid, acd, -1, false, false, cbResult, null);
        window.UMO.login(aid, acd, -1, false, false, function(res) {
          console.log(res)
        }, null)
        sessionStorage.setItem('token', result.token)
      }
    })
  }

  // 登出
  logOutEvent = () => {
    Modal.confirm({
      title: '退出',
      content: '你确定要退出此系统么？',
      okText: '确认',
      cancelText: '取消',
      onOk:()=>{
        sessionStorage.clear()
        localStorage.clear()
        this.props.history.push('login')
      }
    });
  }
  // 签到
  signEvent =  () => {
    const userInfo = {
      userNum: '88888888',
      userName: '左旺',
      userPost: '应急值守人员',
      time: '2019-04-05 12:30:36'
    }
    Modal.confirm({
      title: '签到',
      content:(
        <div>
          <div style={modalItemStyle}>工号： <strong>{userInfo.userNum}</strong></div>
          <div style={modalItemStyle}>姓名： <strong>{userInfo.userName}</strong></div>
          <div style={modalItemStyle}>职位： <strong>{userInfo.userPost}</strong></div>
          <div style={modalItemStyle}>时间： <strong>{userInfo.time}</strong></div>
        </div>
      ),
      okText: '确认',
      cancelText: '取消',
      onOk:()=>{
        this.props.history.push('/attendance')
      }
    });
  }

  callInEvent = () => {
    this.setState({
      callInIsShow: false,
     })
     message.success('操作成功')
  }
  hangUpEvent = () => {
    Modal.confirm({
      title: '挂断',
      content: '确定要挂断么？',
      okText: '确认',
      cancelText: '取消',
      onOk:()=>{
        // window.UMO.speedhook('1000', (res, res1)=>{
        //   console.log(res, res1)
        // })
        window.UMO.onhook((res, res1)=>{
          console.log(res, res1)
        })
        message.success('操作成功')
      }
    });
  }
  callOutEvent = () => {
    // 快速拨出

    // const dest = '1008'           // 分机号
    // const dispno = ''             // 主叫显示
    // const playfile = 'welcome.wav'// 放音文件 根据flow文件指示
    // const oper = '0'              // 操作类型  0直接转队列；1按码转队列；2按码转菜单；3放音挂机，文件为空直接挂机；4留言挂机；5按码挂机；6放音转队列；7直接转队列评价；8按码转队列评价；9放音转队列评价；10直接转队列登记；11按码转队列登记；12放音转队列登记；19放音转菜单；20直接挂机；21加入会议；100操作回调；101用户控制；102函数控制
    // const param = ''              // 操作参数  0队列号；1按码:队列号，逗号分隔；2按码:菜单号，逗号分隔；3-5无效；6队列号；7队列号；8按码:队列号，逗号分隔；9队列号；10队列号；11按码:队列号，逗号分隔；12队列号；19菜单号；20无效；21:会议号；100操作回调URL，可加&参数；101-空闲超时（秒）；102-类名,函数名,用户参数
    // const gid = '@0'              // 指定中继号码，或 @+租户ID 选择租户任意线路
    // const recflag = '0'           // 录音标志 0 不录音， 1录音
    // const uud = '{"username": "zuowang", "age": 13, "sex": 1 }'  //  用户数据，可传至弹屏界面
    // const backurl = ''            // 速拨回调URL, 可加&参数原样返回

    // window.UMO.speeddial(dest, dispno, playfile, oper, param, gid, recflag, uud, backurl, (cmd, res, a, b, c)=>{
    //   console.log('toPhone', cmd, res, a, b, c)
    // }, null);
    
    // 座席拨出

    const calleddn = 1008;   // 呼出电话号
    const gid = '@0'        // 指定中继号码，或 @+租户ID 选择租户任意线路(转移会议无效)
    const uud = 'who you are hosw';// 用户数据，可传至弹屏界面
    // $("#errmsg").html("");
    // * @param ano  主叫号码
    // * @param bno  被叫号码
    // * @param uud  业务数据，”dialout”分机拨出，”misc:callback”分机回呼

    window.UMO.dialout(calleddn, gid, uud, true, (url, res)=>{
      console.log(11111, url, res)
    }, null)
  }
  callKeepEvent = () => {
    const {type, handleBtnlist} = this.state
    Modal.confirm({
      title: type === 'hold' ? '挂起': '恢复',
      content: `确定要${ type === 'hold' ? '挂起': '恢复'}么？`,
      okText: '确认',
      cancelText: '取消',
      onOk:()=>{
        // window.UMO.speedhook('1000', (res, res1)=>{
        //   console.log(res, res1)
        // })
        if(type === 'hold') {
          window.UMO.hold(false, (res, res1)=>{
            const newhandleBtnlist = handleBtnlist
            newhandleBtnlist [3].tit = '恢复'
            this.setState({handleBtnlist: newhandleBtnlist, type: 'huifu'})
          }, null)
        } else {
          window.UMO.retrieve((res, res1)=>{
            const newhandleBtnlist = handleBtnlist
            newhandleBtnlist [3].tit = '挂起'
            this.setState({type: 'hold', handleBtnlist: newhandleBtnlist})
          }, null)
        }
        message.success('操作成功')
      }
    });
  }
  callOtherEvent = () => {
    // 完成快速转移功能。在通话过程中，将已经连接的呼叫转移到新的目标号码，自己挂机。
    console.log('转接')
    //  呼叫ID,或-1表示当前呼叫, 主叫显示, 目标号码, 用户数据 ,callback
    window.UMO.speedtrans('1008', '1000', '1009', 'name=123', (cmd, res)=>{
      console.log(cmd, res)
    })
  }
  callQueueEvent = () => {
    // acd 指定的队列号， 为空返回所有 (acd, cb)
    window.UMO.acdlist('', (cmd, res)=>{
      console.log(cmd, res)
    })
    console.log('队列')
  }
  render() {
    const callinInfo = {
      trainPhone: '18755489161',
      trainDirverName: '左旺',
      trainDirverNames: '张三，老四',
      trainByGroup: '江苏机车三组',
      trainNum: 'A8878fdfdfd',
      trainPosition: '江苏苏州园林',
      trainBreakRuleInfo: '底盘损坏底盘损坏底盘损坏坏底盘损坏底盘损坏底盘损坏'
    }
    const {callInIsShow, type} = this.state
    return (
      <Header 
       event = {
        {
          logOutEvent: this.logOutEvent,
          signEvent: this.signEvent,
          callInEvent: this.callInEvent,
          hangUpEvent: this.hangUpEvent,
          callOutEvent: this.callOutEvent,
          callKeepEvent: this.callKeepEvent,
          callOtherEvent: this.callOtherEvent,
          callQueueEvent: this.callQueueEvent,
        }
       } 
       data = { {btnlist, callinInfo, type, modalItemStyle, callInIsShow} } 
       ></Header>  
    )
  }
}



export default withRouter(HeaderCase)