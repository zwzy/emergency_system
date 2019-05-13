import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Header from '../components/Header'
import {Modal} from 'antd'
import {updateUserInformation} from '../actions/user'

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
  render() {
    const {isLogin} = this.state
    return (
      <Header isLogin={isLogin} logOutEvent={() => this.logOutEvent()} signEvent={()=>this.signEvent()}></Header>  
    )
  }
}



export default withRouter(HeaderCase)