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
        window.UMO.login(aid, token, acd, -1, false, function(res) {
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
        message.success('操作成功')
      }
    });
  }
  callOutEvent = () => {
    console.log('拨打')
  }
  callKeepEvent = () => {
    console.log('保持')
  }
  callOtherEvent = () => {
    console.log('转接')
  }
  callQueueEvent = () => {
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
    const {callInIsShow} = this.state
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
       data = { {btnlist, callinInfo, modalItemStyle, callInIsShow} } 
       ></Header>  
    )
  }
}



export default withRouter(HeaderCase)