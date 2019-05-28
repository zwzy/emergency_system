import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'                           // 用来连接redux中reducer中全局数据的
import { Modal, Table, message } from 'antd' 
import Console from '../../components/menu/Console'                 // 引用的ui组件
import color from '../../utils/color'
import {userInfoByPhone, updateCallHistory} from '../../api/call'

import { getNowDate, formatSeconds, getNowTime } from '../../utils/common'

// 历史记录表格数据
const callHistoryColumns = [
  {
    title: '来电时间',
    dataIndex: 'time',
    width: 250
  },
  {
    title: '通话时长',
    dataIndex: 'timeLonger',
  }
];
const callHistoryData = [];
for (let i = 0; i < 100; i++) {
  callHistoryData.push({
    key: i,
    timeLonger: `05:23:${i}`,
    time: `2019-05-1${i} 10:23:${i}`,
  });
}
// 违章记录表格数据
const breakRuleColumns = [
  {
    title: '序号',
    dataIndex: 'index',
    width: 150
  },
  {
    title: '车次',
    dataIndex: 'trainNum',
    width: 150
  },
  {
    title: '详情',
    dataIndex: 'details',
  },
  {
    title: '时间',
    dataIndex: 'time',
    width: 250
  }
];
const breakRuleData = [];
for (let i = 0; i < 5; i++) {
  breakRuleData.push({
    key: i,
    index: i,
    trainNum: `${i}号线`,
    details: `${i}--喯术有专攻地大概都是 术有专攻是v那是豆腐水电费 哈根斯栽不sfsd好想吃 开始的粉丝 术有专攻 以呆水电费圣诞节`,
    time: `2019-05-1${i} 10:23:${i}`,
  });
}

// 违章记录表格数据
const trainInfoColumns = [
  {
    title: '机车',
    dataIndex: 'trainName',
    width: 150
  },
  {
    title: '机型',
    dataIndex: 'trainType',
    width: 150
  },
  {
    title: '故障维修',
    dataIndex: 'trainQustion',
  },
  {
    title: '时间',
    dataIndex: 'time',
    width: 250
  }
];
const trainInfoData = [];
for (let i = 0; i < 5; i++) {
  trainInfoData.push({
    key: i,
    trainName: `上海机车${i}`,
    trainType: `T${i}系列`,
    trainQustion: `${i}--喯术有专攻地大概都是 术有专攻是v那是豆腐水电费 哈根斯栽不sfsd好想吃 开始的粉丝 术有专攻 以呆水电费圣诞节`,
    time: `2019-05-1${i} 10:23:${i}`,
  });
}



export class ConsoleCase extends Component {
  static propTypes = {
    // prop: PropTypes
  }
  constructor(props) {
    super(props)
    this.timer = null
    this.state = {
      callHistoryIsShow: false,      // 历史记录是否显示
      breakRuleIsShow: false,        // 违章记录是否显示
      trainInfoIsShow: false,        // 违章记录是否显示
      dirverName: '',                // 选中的司机名
      // 车次信息
      commationInfomation: {
        phoneNumber:'--', // 号码
        timer: '--',  // 当前通话时长
        comeTime: '--', // 来电时间
        talkStartTime: '--',  // 接听时间
        handupTime: '--', // 挂断时间
        talkTimer: '--', // 通话时长
        callStatus: '--'
      },
      trainValueInfo: {
        driverCode: '--',
        driverName: '--',
        driverMobile: '--',
        assisCode: '--',
        assisName: '--',
        assisMobile: '--',
        model_trainCode: '--',
        zone: '--',
        frontStation: '--',
        activePosition: '--',
        outDate: '--',
      },
      trainData:[
        {name: '司机工号', id: 'driverCode', event: ''},
        {name: '司机姓名', id: 'driverName', event: 'breakRuleShowEvent'},
        {name: '联系电话',  id: 'driverMobile', event: ''},
        {name: '副司机工号', id: 'assisCode', event: ''},
        {name: '副司机姓名',  id: 'assisName', event: 'breakRuleShowEvent'},
        {name: '联系电话',  id: 'assisMobile', event: ''},
        {name: '机型/车号', id: 'model_trainCode', event: 'trainInfoShowEvent'},
        {name: '区段', id: 'zone', event: ''},
        {name: '前方站信息', id: 'frontStation', event: ''},
        {name: '当前定位', id: 'activePosition', event: ''},
        {name: '出勤时间', id: 'outDate', event: ''}
      ]
    }
  }
  componentWillReceiveProps(props) {
    console.log(111, props.umoEventState)
    if(props.umoEventState.onCallincome.id !== this.props.umoEventState.onCallincome.id) {
      this.onCallincomeEvent(props.umoEventState.onCallincome)
    }
    if(props.umoEventState.onHookChanged.id !== this.props.umoEventState.onHookChanged.id) {
      this.onHookChangedEvent(props.umoEventState.onHookChanged)
    }
    if(props.umoEventState.onTalked.id !== this.props.umoEventState.onTalked.id) {
      this.onTalkedEvent(props.umoEventState.onTalked)
    }
  }
   // 设置当前通话时间
  setActiveCommationTimer = () => {
    const {commationInfomation} = this.state
    const nowTime = getNowTime()
    const timer = nowTime - getNowTime(commationInfomation.talkStartTime)
    this.setState({
      commationInfomation: {...commationInfomation, timer: formatSeconds(timer)}
    })
  }
  // 接听时回调
  onTalkedEvent = () => {
    const {commationInfomation} = this.state
    const nowData = getNowDate()
    this.setState({
      commationInfomation: {...commationInfomation, talkStartTime: nowData}
    },()=>{
      this.saveUserInfoByphoneNumber()
      this.timer = setInterval(()=>{this.setActiveCommationTimer()}, 1000)
    })
  }
  // 挂断时回调
  onHookChangedEvent = (data) => {
    const {status} = data
    if(status === '1') {
      const {commationInfomation} = this.state
      if(commationInfomation.talkStartTime ==='--') return
      const nowData = getNowDate()
      this.setState({
        commationInfomation: {...commationInfomation, handupTime: nowData, talkTimer: commationInfomation.timer}
      }, ()=>{
        this.updateUserInfoByphoneNumber()
      })
    }
    clearInterval(this.timer)
  }
  // 接听时回调
  onCallincomeEvent = (data) => {
    const {ano, uud} = data
    const initCommationInfomation = {
      phoneNumber:'--', // 号码
      timer: '--',  // 当前通话时长
      comeTime: '--', // 来电时间
      talkStartTime: '--',  // 接听时间
      handupTime: '--', // 挂断时间
      talkTimer: '--', // 通话时长
      callStatus: '--'
    }
    //  重置通话概况
    this.setState({
      commationInfomation: initCommationInfomation
    }, ()=>{
      const nowData = getNowDate()
      const {commationInfomation} = this.state
      // 1、 显示电话信息
      // 2、 设置来电时间
      // 3、 设置拨号方向
      if(uud === 'dialout') {
      }
      this.setState({
        commationInfomation: {...commationInfomation, comeTime: nowData, phoneNumber: ano, callStatus: uud}
      })
    })

  }
   saveUserInfoByphoneNumber = async () => {
     try {
       const {phoneNumber, comeTime, talkStartTime} = this.state.commationInfomation
       const {data} = await userInfoByPhone({mobile: phoneNumber, callDate: comeTime, answerDate: talkStartTime})
       const trainValueInfo = data.content
       const newTrainValueInfo = {...trainValueInfo, model_trainCode: trainValueInfo.model+'/'+trainValueInfo.trainCode}
       this.setState({
        trainValueInfo: newTrainValueInfo
       })
     } catch (error) {
     }
  }
  updateUserInfoByphoneNumber = async () => {
    const {talkTimer, handupTime} = this.state.commationInfomation
    // 没有效果
    const {trainValueInfo} = this.state
    const {data} = await updateCallHistory({callId: trainValueInfo.callId, callDuration: talkTimer, hangupDate: handupTime, callStatus: 'CALL_IN'})
  }
  // 显示通话历史记录弹窗
  historyShowEvent = () => {
    const {callHistoryIsShow}  = this.state
    this.setState({
      callHistoryIsShow: !callHistoryIsShow
    })
  }
  // 显示司机违章记录弹窗
  breakRuleShowEvent = (dirverName) => {
    const {breakRuleIsShow}  = this.state
    this.setState({
      breakRuleIsShow: !breakRuleIsShow,
      dirverName: dirverName
    })
  }
  // 显示机车维护信息弹窗
  trainInfoShowEvent = () => {
    const {trainInfoIsShow}  = this.state
    this.setState({
      trainInfoIsShow: !trainInfoIsShow
    })
  }

  render() {
    const {trainData, dirverName, trainValueInfo, callHistoryIsShow, breakRuleIsShow, trainInfoIsShow, commationInfomation} = this.state
    return (
      <div>
        <Console 
          data={{
            commationInfomation,
            trainData, trainValueInfo
          }}
          event={{
            historyShowEvent: this.historyShowEvent,
            breakRuleShowEvent: this.breakRuleShowEvent,
            trainInfoShowEvent: this.trainInfoShowEvent,
          }}
        />

        {/* 通话历史 Modal*/}
        <Modal
          title={<div>通话历史（<span style={{color: color.$primary}}>18755489161</span>）</div>}
          visible={callHistoryIsShow}
          onCancel={()=>this.historyShowEvent()}
          footer={null}
        >
          <Table columns={callHistoryColumns} dataSource={callHistoryData} scroll={{y: 265}} pagination={false} />
        </Modal>

        {/* 司机违章信息 Modal */}
        <Modal
          width={900}
          title={<div>司机违章信息（<span style={{color: color.$primary}}>{dirverName}</span>）</div>}
          visible={breakRuleIsShow}
          onCancel={()=>this.breakRuleShowEvent()}
          footer={null}
        >
          <Table columns={breakRuleColumns} dataSource={breakRuleData}  pagination={false} />
        </Modal>
        
        {/* 机车维护信息 Modal */}
        <Modal
          width={900}
          title='机车维护信息'
          visible={trainInfoIsShow}
          onCancel={()=>this.trainInfoShowEvent()}
          footer={null}
        >
        <Table columns={trainInfoColumns} dataSource={trainInfoData}  pagination={false} />
        </Modal>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({                  // owProps 是这个容器组件接收的props值，因为在处理时可能要用到他
  commation: state.commation,
  umoEventState: state.umoEvent
})
const mapDispatchToProps = (dispatch) => ({            // 引用全局actions中定义方法
})
export default connect(mapStateToProps, mapDispatchToProps)(ConsoleCase)
