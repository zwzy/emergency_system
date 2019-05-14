import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import Header from '../components/Header'
import {Modal, message} from 'antd'

import { btnlist } from '../utils/config'

export class HeaderCase extends Component {
  static propTypes = {
    userInformation: PropTypes.object
  }
  constructor(props) {
    super(props)
    this.state = {
       isLogin: false
    }
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
            <div>工号： {userInfo.userNum}</div>
            <div>姓名： {userInfo.userName}</div>
            <div>职位： {userInfo.userPost}</div>
            <div>时间： {userInfo.time}</div>
        </div>
      ),
      okText: '确认',
      cancelText: '取消',
      onOk:()=>{
        this.props.history.push('/attendance_management')
      }
    });
  }

  // {cla:'icon-dianhua1', tit: '接听', eventName: 'callInEvent'},
  // {cla:'icon-guaduan', tit: '挂断', eventName: 'hangUpEvent'},
  // {cla:'icon-mobile', tit: '拨打', eventName: 'callOutEvent'},
  // {cla:'icon-Hold-TheLine', tit: '保持', eventName: 'callKeepEvent'},
  // {cla:'icon-zhuanjie', tit: '转接', eventName: 'callOtherEvent'},
  // {cla:'icon-bhjpaidui', tit: '队列', eventName: 'callQueueEvent'}

  callInEvent = () => {
    console.log('接听')
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
    const {isLogin} = this.state
    return (
      <Header 
       isLogin={isLogin} 
       eventArr = {
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
       btnlist = {btnlist} 
       ></Header>  
    )
  }
}



export default withRouter(HeaderCase)