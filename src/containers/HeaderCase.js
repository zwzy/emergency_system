import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'                           // 用来连接redux中reducer中全局数据的


import {updateCommationInformation} from '../actions/call'
import {updateUmoEventState, resetUmoEventState} from '../actions/umo'

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
    title: '联系电话',
    dataIndex: 'phoneNumber',
    width: 250
  },
  {
    title: '来电时间',
    dataIndex: 'time',
    width: 250
  },
  {
    title: '状态',
    dataIndex: 'status',
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
    this.timer = null
    this.state = {
      commationInfomation:{
        phoneNumber:'--', // 号码
        timer: '--',  // 当前通话时长
        comeTime: '--', // 来电时间
        talkStartTime: '--',  // 接听时间
        handupTime: '--', // 挂断时间
        talkTimer: '--' // 通话时长
      },
      type: 'hold',
      handleBtnlist: btnlist,
      // 来电弹窗
      callInModalIsShow: false,
      // 拨出
      callOutIsShow: false,
      callOutData: {
        callHistoryData: [
          { userName: '张三', userPhone: '1001', time: '2019-08-03 20:08:02', timeLong: '00:02:34', work: '技术部'},
          { userName: '张大', userPhone: '1009', time: '2019-08-03 20:08:02', timeLong: '00:02:34', work: '运维部'},
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
  componentDidMount() {
    userLoginACD({}, {
      onReadyState: (status)=>{
        console.log(status)
        const {id} = this.props.umoEvent.onReadyState
        this.props.updateUmoEventState({
          onReadyState: {
            id: id+1, 
            status: status
          }
        })
      },
      onCallincome: (ano, bno ,uud) => {
        const {id} = this.props.umoEvent.onCallincome
        this.props.updateUmoEventState({
          onCallincome: {
            id: id+1, 
            ano,
            bno,
            uud
          }
        })
      }, 
      onTalked: (ano, bno ,uud) => {
        const {id} = this.props.umoEvent.onTalked
        this.props.updateUmoEventState({
          onTalked: {
            id: id+1, 
            ano,
            bno,
            uud
          }
        })
      },
      onRingStoped: () => {
        const {id} = this.props.umoEvent.onRingStoped
        this.props.updateUmoEventState({
          onRingStoped: {
            id: id+1
          }
        })
      },
      onHookChanged: (status) => {
        const {id} = this.props.umoEvent.onHookChanged
        this.props.updateUmoEventState({
          onHookChanged: {
            id: id+1,
            status
          }
        })
      },
      onAgentChanged: (status) => {
        const {id} = this.props.umoEvent.onAgentChanged
        this.props.updateUmoEventState({
          onAgentChanged: {
            id: id+1,
            status
          }
        })
      },
      onAsyncFinished: (atype, taskid, ret, desc) => {
        const {id} = this.props.umoEvent.onAsyncFinished
        this.props.updateUmoEventState({
          onAsyncFinished: {
            id: id+1,
            atype,
            taskid,
            ret,
            desc
          }
        })
      },
      onAllBusy: () => {
        const {id} = this.props.umoEvent.onAllBusy
        this.props.updateUmoEventState({
          onAllBusy: {
            id: id+1
          }
        })
      },
      onQuelen: () => {
        const {id} = this.props.umoEvent.onQuelen
        this.props.updateUmoEventState({
          onQuelen: {
            id: id+1
          }
        })
      },
      onSmsincome: (dtime, from, content, slot) => {
        const {id} = this.props.umoEvent.onSmsincome
        this.props.updateUmoEventState({
          onSmsincome: {
            id: id+1,
            dtime,
            from,
            content,
            slot
          }
        })
      }
    }, this.getUmoData)
  }
   getUmoData = () => {
    const where = 'begTime >= 20190530000000 and begTime<20190530235900 '
    const group = ''
    const order = 'begTime desc'
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
  
    window.UMO.dataoper(
      't_sheetrecord', 
      'system', 
      mode, 
      'recordID, FileDate, ano, bno, direction,duration,begTime, endTime,ringDuration, RouteAgentTime',
      'vals',
      where,
      group,
      order, 10, 1,
      (cmd, result) => {
        console.log(result)
      if ((mode == "q") && (result.errno == 0))
      {
         console.log(111, result.data)
         const data = result.data
         const callInListData = data.slice(1)
         const handleCallInListData = callInListData.map((item)=>{
           return {
            ano: item.ano,
           }
         })
         this.setState({
          callInListData
        })
        //  this.timer = setTimeout(
        //    this.getUmoData()
        //  , 100000)
        // this.timer = setTimeout(() => {
        //   this.getUmoData()
        // }, 5000);
        //  ["ano", "direction", "fileDate"]
        //  1: (3) ["1001", "0", "20190518083730"]
        //  2: (3) ["1009", "0", "20190518184149"]
        //  3: (3) ["1009", "0", "20190518184221"]
      }
    }, null);

   
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
         // 来电信息 来电显示  
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


const mapStateToProps = (state) => ({                  // owProps 是这个容器组件接收的props值，因为在处理时可能要用到他
  umoEvent: state.umoEvent
})
const mapDispatchToProps = (dispatch) => ({            // 引用全局actions中定义方法
  updateCommationInformationEvent: (commationInfo)=>dispatch(updateCommationInformation(commationInfo)),
  updateUmoEventState: (umoEventState)=>dispatch(updateUmoEventState(umoEventState)),
  // resetCommationInformationEvent: ()=>dispatch(resetCommationInformation())
  resetUmoEventState: ()=>dispatch(resetUmoEventState())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderCase))