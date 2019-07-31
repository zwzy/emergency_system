import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'                           // 用来连接redux中reducer中全局数据的

import Header from '../components/Header'
import { Modal, message, Select } from 'antd'
import { updateUmoEventState } from '../actions/umo'
import { updateCommationInformation, resetCommationInformation, updateTrainInformation, resetTrainInformation } from '../actions/call'
import { btnlist } from '../utils/config'

import { sign } from '../api/user'
import { answerCall, findCallUser } from '../api/call'

import { getNowDate, getNowTime } from '../utils/common'

import { hangUpPhone, userLoginACD, getCDRId } from '../utils/umo'

const modalItemStyle = { margin: '8px 0' }
const { Option } = Select;
export class HeaderCase extends Component {
  static propTypes = {
  }
  constructor(props) {
    super(props)
    this.timer = null
    this.timer1 = null
    this.state = {
      crdId: '',
      btnlist,
      // 来电弹窗
      callInModalIsShow: true,
      // 拨出
      callOutIsShow: false,
      // 转接
      callOtherIsShow: false,
      callOtherData: [],
      // 队列
      callInListIsShow: false, // 来电通知modal
      signParams: { // 签到的入参
        roleId: this.props.userInfo.roleList[0] && this.props.userInfo.roleList[0].id,
        roleName: this.props.userInfo.roleList[0] && this.props.userInfo.roleList[0].roleName
      },
      callinInfo: {
        trainPhone: '',
        trainDirverName: '',
        trainDirverNames: '',
        trainByGroup: '',
        trainNum: '',
        trainPosition: '',
        trainBreakRuleInfo: ''
      }
    }}
    // 显示弹窗
    callInModalShowEvent = () => {
      const { callInModalIsShow } = this.state
      this.setState({
        callInModalIsShow: !callInModalIsShow
      })
    }
    // 显示拨出
    callOutShowEvent = () => {
      const { callOutIsShow } = this.state
      this.setState({
        callOutIsShow: !callOutIsShow
      })
    }
    // 显示转接
    callOtherShowEvent = () => {
      const { callOtherIsShow } = this.state
      this.setState({
        callOtherIsShow: !callOtherIsShow
      })
    }
    // 显示队列
    callInListShowEvent = () => {
      const { callInListIsShow } = this.state
      this.setState({
        callInListIsShow: !callInListIsShow
      })
    }

    componentWillReceiveProps(props) {
      if (props.umoEventState.onAgentChanged.id !== this.props.umoEventState.onAgentChanged.id) {
        if (props.umoEventState.onAgentChanged.status === '4') {
          this.props.history.push('/')
        }
      }
      if (props.umoEventState.onCallincome.id !== this.props.umoEventState.onCallincome.id) {
        this.onCallincomeEvent(props.umoEventState.onCallincome)
      }
      if (props.umoEventState.onHookChanged.id !== this.props.umoEventState.onHookChanged.id) {
        this.onHookChangedEvent(props.umoEventState.onHookChanged)
      }
      if (props.umoEventState.onTalked.id !== this.props.umoEventState.onTalked.id) {
        this.onTalkedEvent(props.umoEventState.onTalked)
      }
      if (props.umoEventState.onRingStoped.id !== this.props.umoEventState.onRingStoped.id) {
        this.onRingStopedEvent()
      }
    }
    
    // 1、接听时回调
    onCallincomeEvent = (data) => {
      const { ano } = data
      // const initCommationInfomation = {
      //   callId: '',           // 通话id
      //   mibile:'--',          // 来电号码
      //   callDate: '--',       // 来电时间
      //   answerDate: '--',     // 接听时间
      //   hangupDate: '--',     // 挂断时间
      //   callDuration: '--',   // 通话时长
      //   callStatus: '--'      // 通话状态
      // }
      //  重置通话概况
      this.props.resetCommationInformation()
      const nowData = getNowDate()
      // 1、 显示电话信息
      // 2、 设置来电时间
      this.props.updateCommationInformation({
        callDate: nowData, mobile: ano
      })
      this.saveCallHistory(ano, nowData)
    }
    // 2、保存通话号码与通话来电时间，获取id
    saveCallHistory = async (mobile, callDate) => {
      try {
        const { data } = await findCallUser({ mobile, callDate })
        // const data = {
        //   code: 0,
        //   content: {
        //     callId: '323232',
        //     driverCode: '98888',
        //     driverName: '张大胖',
        //     driverMobile: '18738273823',
        //     assisCode: '231400',
        //     assisName: '张大屁',
        //     assisMobile: '1258824234',
        //     zone: '1',
        //     frontStation: '不知',
        //     activePosition: '上海',
        //     outDate: '2019-03-23',
        //     deptName: '应急',
        //     guideGroup: '钱总',
        //     trainNum: 'A23',
        //     model: 'A83',
        //     trainCode: 'A933'
        //   }
        // }
        if (data.code === 0) {
          this.callInModalShowEvent()
          const trainValueInfo = data.content
          const newTrainValueInfo = { ...trainValueInfo, model_trainCode: trainValueInfo.model + '/' + trainValueInfo.trainCode }
          this.setState({
            crdId: ''
          })
          this.props.updateTrainInformation({
            ...newTrainValueInfo
          })
          this.props.updateCommationInformation({
            callId: newTrainValueInfo.callId
          })
        }
      } catch (error) {
        console.log(error)
      }
    }

    // 3、挂断时的回调，改变电话状态
    onRingStopedEvent = async () => {
      const { callId } = this.props.commationInfomation
      const nowDate = getNowDate()
      try {
        const { data } = await answerCall({ callId, callStatus: 'CALL_FAILURE', hangupDate: nowDate })
        if (data.code === 0) {
          console.log('挂断记录成功')
        }
      } catch (error) {
        console.log(error)
      }
      this.props.updateCommationInformation({
        callId, hangupDate: nowDate, callStatus: 'CALL_FAILURE'
      })
    }

    // 4、接听时回调
    onTalkedEvent = async () => {
      const { callId } = this.props.commationInfomation
      const nowDate = getNowDate()
      try {
        const { data } = await answerCall({ callId, callStatus: 'CALL_ONLINE', answerDate: nowDate })
        if (data.code === 0) {
          console.log('接听记录成功')
          // 保存电话对应的话单id
          getCDRId((crdId) => {
            if (crdId) {
              this.setState({
                crdId
              })
            }
          })
        }
      } catch (error) {
        console.log(error)
      }
      this.props.updateCommationInformation({
        callId, answerDate: nowDate, callStatus: 'CALL_ONLINE'
      })
      // 转接的时候会执行两次
    }
    // 5、完成时挂断时回调
    onHookChangedEvent = async ({ status }) => {
      if (status === '1') {
        const { callId, callStatus, answerDate } = this.props.commationInfomation
        console.log(8888, callId, callStatus, answerDate)
        const nowDate = getNowDate()
        const nowTime = getNowTime()
        const timer = nowTime - getNowTime(answerDate)
        const timerSecond = parseInt(timer / 1000)
        if (callStatus !== 'CALL_ONLINE') return
        try {
          const { data } = await answerCall({ recordId: this.state.crdId, callId, callStatus: 'CALL_HANGUP', hangupDate: nowDate, callDuration: timerSecond })
          if (data.code === 0) {
            this.callInModalShowEvent()
            console.log('接听记录成功')
          }
        } catch (error) {
          console.log(error)
        }
        this.props.updateCommationInformation({
          callId, hangupDate: nowDate, callStatus: 'CALL_HANGUP', callDuration: timerSecond
        })
      }
    }

    componentDidMount() {
      // 防止未登录时，在登录页面登录umo
      if (window.UMO._token || !sessionStorage.getItem('isLogin')) return
      const { userInfo } = this.props
      const loginUmoInfo = {
        ...userInfo,
        domain: '10.131.172.82',
        passWord: '123456'
      }
      // 如果id不为1的话。即角色不是应急人员，不显示拨打号码按钮，且不显示控制台菜单
      const isHasExtNum = userInfo.roleList.findIndex((item) => item.id == 1)
      if (isHasExtNum !== -1) {
        this.loginUmoSystem(loginUmoInfo)
      } else {
        if (btnlist.length) {
          this.setState({
            btnlist: []
          })
        }
      }
    }
    loginUmoSystem = (loginUmoInfo) => {
      userLoginACD(loginUmoInfo, {
        onReadyState: (status) => {
          console.log(status)
          const { id } = this.props.umoEventState.onReadyState
          this.props.updateUmoEventState({
            onReadyState: {
              id: id + 1,
              status: status
            }
          })
        },
        onCallincome: (ano, bno, uud) => {
          const { id } = this.props.umoEventState.onCallincome
          this.props.updateUmoEventState({
            onCallincome: {
              id: id + 1,
              ano,
              bno,
              uud
            }
          })
        },
        onTalked: (ano, bno, uud) => {
          const { id } = this.props.umoEventState.onTalked
          this.props.updateUmoEventState({
            onTalked: {
              id: id + 1,
              ano,
              bno,
              uud
            }
          })
        },
        onRingStoped: () => {
          const { id } = this.props.umoEventState.onRingStoped
          this.props.updateUmoEventState({
            onRingStoped: {
              id: id + 1
            }
          })
        },
        onHookChanged: (status) => {
          const { id } = this.props.umoEventState.onHookChanged
          console.log(2222222, status)
          this.props.updateUmoEventState({
            onHookChanged: {
              id: id + 1,
              status
            }
          })
        },
        onAgentChanged: (status) => {
          const { id } = this.props.umoEventState.onAgentChanged
          this.props.updateUmoEventState({
            onAgentChanged: {
              id: id + 1,
              status
            }
          })
        },
        onAsyncFinished: (atype, taskid, ret, desc) => {
          const { id } = this.props.umoEventState.onAsyncFinished
          this.props.updateUmoEventState({
            onAsyncFinished: {
              id: id + 1,
              atype,
              taskid,
              ret,
              desc
            }
          })
        },
        onAllBusy: () => {
          const { id } = this.props.umoEventState.onAllBusy
          this.props.updateUmoEventState({
            onAllBusy: {
              id: id + 1
            }
          })
        },
        onQuelen: () => {
          const { id } = this.props.umoEventState.onQuelen
          this.props.updateUmoEventState({
            onQuelen: {
              id: id + 1
            }
          })
        },
        onSmsincome: (dtime, from, content, slot) => {
          const { id } = this.props.umoEventState.onSmsincome
          this.props.updateUmoEventState({
            onSmsincome: {
              id: id + 1,
              dtime,
              from,
              content,
              slot
            }
          })
        }
      }, () => {
        this.setState({
          loading: false
        })
        // sessionStorage.setItem('isLogin', true)
        this.props.history.push('/')
      }, (msg) => {
        this.setState({
          loading: false
        })
        message.error(msg || '你输入的账号或域名不正确，请重试...', 5)
      })
    }
    // 登出
    logOutEvent = () => {
      Modal.confirm({
        title: '退出',
        content: '你确定要退出此系统么？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          window.UMO.exit()
          sessionStorage.clear()
          this.props.history.push('login')
        }
      });
    }
    // 签到
    signEvent = () => {
      const nowData = getNowDate()
      const { userInfo } = this.props
      Modal.confirm({
        title: '签到',
        content: (
          <div>
            <div style={modalItemStyle}>工号： <strong>{userInfo.workno}</strong></div>
            <div style={modalItemStyle}>姓名： <strong>{userInfo.userName}</strong></div>
            <div style={modalItemStyle}>职位：
            <strong>
                <Select defaultValue={userInfo.roleList.length > 0 ? userInfo.roleList[0].id : ''} style={{ width: 150 }} size='small' onChange={this.handleChange}>
                  {userInfo.roleList.map((item) => {
                    return (
                      <Option key={item.id} value={item.id}>{item.roleName}</Option>
                    )
                  })}
                </Select>
              </strong>

            </div>
            <div style={modalItemStyle}>时间： <strong>{nowData}</strong></div>
          </div>
        ),
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          const { deptName, userName, workno, mobile } = this.props.userInfo
          this.setState({
            signParams: { ...this.state.signParams, deptName, userName, workno, signTime: nowData, mobile }
          }, () => {
            sign(this.state.signParams).then(
              res => {
                const { data } = res
                if (data.code === 0) {
                  message.success(data.message)
                } else {
                  message.error(data.message)
                }
              }
            ).catch(
              (error) => {
                message.error('接口故障，请重试...')
                console.log(error)
              }
            )
            this.props.history.push('/attendance')
          })
        }
      });
    }
    handleChange = (value) => {
      console.log(`selected ${value}`);
      const activeObj = this.props.userInfo.roleList.find((item) => {
        return item.id == value
      })
      this.setState({
        signParams: { ...this.state.signParams, roleId: value, roleName: activeObj.roleName }
      })
    }

    // 挂断
    hangUpEvent = () => {
      Modal.confirm({
        title: '挂断',
        content: '确定要挂断么？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          hangUpPhone(() => {
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
    }
    goToRouter = () => {
      this.props.history.push('/emergency_telegram')
    }
    render() {
      const {
        callInModalIsShow,
        callOtherData, callOtherIsShow,
        callOutIsShow, callOutData,
        callInListIsShow,
        btnlist,
        callinInfo
      } = this.state
      const { userInfo } = this.props
      return (
        <Header
          event={
            {
              // 来电弹窗
              callInModalShowEvent: this.callInModalShowEvent,
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
          data={{
            userInfo,
            // 来电信息 来电显示  
            callInModalIsShow, callinInfo,
            // 头部菜单列表
            btnlist,
            modalItemStyle,
            //  拨出
            callOutIsShow, callOutData,
            //  转接
            callOtherIsShow, callOtherData,
            //  队列
            callInListIsShow
          }}
        ></Header>
      )
    }
}

const mapStateToProps = (state) => ({                  // owProps 是这个容器组件接收的props值，因为在处理时可能要用到他
  umoEventState: state.umoEvent,
  userInfo: state.user,
  commationInfomation: state.commation
})
const mapDispatchToProps = (dispatch) => ({            // 引用全局actions中定义方法
  updateUmoEventState: (umoEventState) => dispatch(updateUmoEventState(umoEventState)),
  updateCommationInformation: (commationInfo) => dispatch(updateCommationInformation(commationInfo)),
  resetCommationInformation: () => dispatch(resetCommationInformation()),
  updateTrainInformation: (trainInfo) => dispatch(updateTrainInformation(trainInfo)),
  resetTrainInformation: () => dispatch(resetTrainInformation())
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderCase))