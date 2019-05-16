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
    this.state = {
       isLogin: false,
       callInIsShow: false,         // 来电通知modal
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
       callInIsShow: true,
      })
    }, 3000);
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
        this.props.history.push('/attendance_management')
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