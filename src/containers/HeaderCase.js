import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import Header from '../components/Header'
import {Modal, message} from 'antd'

import { btnlist } from '../utils/config'
// umo
import {userLoginACD, hangUpPhone} from '../utils/umo'
const modalItemStyle = {margin: '8px 0'}
const callOutColumns = [
  {
    title: '群组名',
    dataIndex: 'groupName',
    width: 250
  },
  {
    title: '拨打',
    dataIndex: '',
    width: 250
  }
];
const callInListColumns = [
  {
    title: '来电类型',
    dataIndex: 'devtype',
    width: 250
  },
  {
    title: '来电方式',
    dataIndex: 'dir',
    width: 250
  },
  {
    title: '拨出方',
    dataIndex: 'ano',
    width: 250
  },
  {
    title: '接收方',
    dataIndex: 'bno',
    width: 250
  },
  {
    title: '来电时间',
    dataIndex: 'tm',
    width: 250
  }
];
const callOtherColumns = [
  {
    title: '群组名',
    dataIndex: 'groupName',
    width: 250
  },
  {
    title: '拨打',
    dataIndex: '',
    width: 250
  }
];
export class HeaderCase extends Component {
  static propTypes = {
    userInformation: PropTypes.object
  }
  constructor(props) {
    super(props)
    this.state = {
      type: 'hold',
      handleBtnlist: btnlist,
      // 来电弹窗
      callInModalIsShow: false,
      // 拨出
      callOutIsShow: false,
      callOutData: {
        callHistoryData: [
          { userName: '张三', userPhone: '18755489161', time: '2019-08-03 20:08:02', timeLong: '00:02:34', work: '技术部'},
          { userName: '张大', userPhone: '18755489161', time: '2019-08-03 20:08:02', timeLong: '00:02:34', work: '运维部'},
          { userName: '张二', userPhone: '18755489161', time: '2019-08-03 20:08:02', timeLong: '00:02:34', work: '测试部'},
          { userName: '张四', userPhone: '18755489161', time: '2019-08-03 20:08:02', timeLong: '00:02:34', work: '营销部'},
          { userName: '张五', userPhone: '18755489161', time: '2019-08-03 20:08:02', timeLong: '00:02:34', work: '采购部'},
          { userName: '张六', userPhone: '18755489161', time: '2019-08-03 20:08:02', timeLong: '00:02:34', work: '市场部'},
          { userName: '张七', userPhone: '18755489161', time: '2019-08-03 20:08:02', timeLong: '00:02:34', work: '技术部'},
          { userName: '张七', userPhone: '18755489161', time: '2019-08-03 20:08:02', timeLong: '00:02:34', work: '技术部'},
          { userName: '张七', userPhone: '18755489161', time: '2019-08-03 20:08:02', timeLong: '00:02:34', work: '技术部'},
          { userName: '张七', userPhone: '18755489161', time: '2019-08-03 20:08:02', timeLong: '00:02:34', work: '技术部'},
        ]
      },
      // 转接
      callOtherIsShow: false,
      callOtherData: [],
      // 队列
      callInListData: [],
      callInListIsShow: false,         // 来电通知modal
    }
  }
  // 显示拨出
  callOutShowEvent = () => {
    const {callOutIsShow}  = this.state
    this.setState({
      callOutIsShow: !callOutIsShow
    })
  }
  // 显示转接
  callOtherShowEvent = () => {
    const {callOtherIsShow}  = this.state
    this.setState({
      callOtherIsShow: !callOtherIsShow
    })
  }
   // 显示队列
  callInListShowEvent = () => {
    const {callInListIsShow}  = this.state
    this.setState({
      callInListIsShow: !callInListIsShow
    })
  }
  // 显示电话来电
  callInModalShowEvent = () => {
    const {callInModalIsShow} = this.state
    this.setState({
      callInModalIsShow: !callInModalIsShow
    })
  }

  componentDidMount() {
    userLoginACD({}, {
      callincomeBack: () => {this.callInModalShowEvent()},
      onRingStoped: () => {this.callInModalShowEvent()}
    }
    )
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
  // 接听
  callInEvent = () => {
    // this.setState({
    //   callInListIsShow: false,
    //  })
    //  message.success('操作成功')
  }
  // 挂断
  hangUpEvent = () => {
    Modal.confirm({
      title: '挂断',
      content: '确定要挂断么？',
      okText: '确认',
      cancelText: '取消',
      onOk:()=>{
        hangUpPhone(()=>{
          message.success('操作成功')
        })
      }
    });
  }
  // 拨出
  callOutEvent = () => {
    this.callOutShowEvent()
  }
  // 转接
  callOtherEvent = () => {
    this.callOtherShowEvent()
    // 完成快速转移功能。在通话过程中，将已经连接的呼叫转移到新的目标号码，自己挂机。
    console.log('转接')
    //  呼叫ID,或-1表示当前呼叫, 主叫显示, 目标号码, 用户数据 ,callback
  }

 
  // 队列
  callQueueEvent = () => {
    // acd 指定的队列号， 为空返回所有 (acd, cb)
   this.callInListShowEvent()
    window.UMO.calllist((cmd, result)=>{
      if (result.errno == 0)
      {
        const callInListData = result.calllist;
        this.setState({
          callInListData
        })
      }
    }, null);
  }

  // 部门选择
  handleSelectChange = (value) => {
    console.log(`selected ${value}`);
  }
  
  goToRouter = () => {
    this.props.history.push('/emergency_telegram')
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
    const {
      callInModalIsShow,
      type, 
      callOtherData, callOtherIsShow,
      callOutData, callOutIsShow,
      callInListIsShow, callInListData,
    } = this.state
    return (
      <Header 
       event = {
        {
          // 注销
          logOutEvent: this.logOutEvent,
          // 签到
          signEvent: this.signEvent,
          // 接听按钮
          callInEvent: this.callInEvent,
          // 挂断按钮
          hangUpEvent: this.hangUpEvent,
          // 听出按钮
          callOutEvent: this.callOutEvent,
          // 保持按钮
          callKeepEvent: this.callKeepEvent,
          // 转接按钮
          callOtherEvent: this.callOtherEvent,
          // 队列按钮
          callQueueEvent: this.callQueueEvent,
          // 显示呼出modal
          callOutShowEvent: this.callOutShowEvent,
          // 显示队列modal
          callInListShowEvent: this.callInListShowEvent,
          // 显示转接modal
          callOtherShowEvent: this.callOtherShowEvent,
          // 部门选择
          handleSelectChange: this.handleSelectChange,
          // 路由跳转
          goToRouter: this.goToRouter, 
        }
       } 
       data = { {
         callInModalIsShow, callinInfo,
         // 头部菜单列表
         btnlist, 
         // 挂机恢复
         type, 
         modalItemStyle, 
        //  拨出
         callOutIsShow, callOutData, callOutColumns,
        //  转接
         callOtherColumns, callOtherIsShow, callOtherData,
        //  队列
         callInListIsShow, callInListColumns, callInListData,
        } } 
       ></Header>  
    )
  }
}



export default withRouter(HeaderCase)