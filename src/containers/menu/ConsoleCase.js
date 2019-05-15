import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'                           // 用来连接redux中reducer中全局数据的

import Console from '../../components/menu/Console'                 // 引用的ui组件

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
    this.state = {
      callHistoryIsShow: false,      // 历史记录是否显示
      breakRuleIsShow: false,        // 违章记录是否显示
      trainInfoIsShow: false,        // 违章记录是否显示
      dirverName: '',                // 选中的司机名
      // 车次信息
      trainData:[
        {name: '司机工号', value: '88888888', id: 'gonghao', event: ''},
        {name: '司机姓名', value: '王大志', id: 'xingming', event: 'breakRuleShowEvent'},
        {name: '联系电话', value: '18755489161', id: 'phone', event: ''},
        {name: '副司机工号', value: '66666666', id: 'fugonghao', event: ''},
        {name: '副司机姓名', value: '张大彪', id: 'fuxingming', event: 'breakRuleShowEvent'},
        {name: '联系电话', value: '1776838383', id: 'fuphone', event: ''},
        {name: '机型/车号', value: 'A8/宝马', id: 'trainNum', event: 'trainInfoShowEvent'},
        {name: '区段', value: 'b区10009883', id: 'chuduan', event: ''},
        {name: '前方站信息', value: '南京南站388', id: 'stationInfo', event: ''},
        {name: '当前定位', value: '南京淮海区', id: 'activePosition', event: ''},
        {name: '出勤时间', value: '2019-04-05 12:20:24', id: 'workTime', event: ''}
      ]
    }
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
    const {trainData, dirverName, callHistoryIsShow, breakRuleIsShow, trainInfoIsShow} = this.state
    return (
      <Console 
      data={{
        trainData,
        callHistoryIsShow,
        breakRuleIsShow,
        trainInfoIsShow,
        // 来电电话记录
        callHistoryColumns,
        callHistoryData,
        // 违规记录
        breakRuleColumns,
        breakRuleData,
        // 机车信息
        trainInfoColumns,
        trainInfoData,
        dirverName
      }}
      event={{
        historyShowEvent: this.historyShowEvent,
        breakRuleShowEvent: this.breakRuleShowEvent,
        trainInfoShowEvent: this.trainInfoShowEvent,
      }}
      />
    )
  }
}
const mapStateToProps = (state) => ({                  // owProps 是这个容器组件接收的props值，因为在处理时可能要用到他
})
const mapDispatchToProps = (dispatch) => ({            // 引用全局actions中定义方法
})
export default connect(mapStateToProps, mapDispatchToProps)(ConsoleCase)
