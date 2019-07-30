import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'                           // 用来连接redux中reducer中全局数据的
import { Modal, Table, Button, message } from 'antd'
import Console from '../../components/menu/Console'                 // 引用的ui组件
import color from '../../utils/color'
import { formatSeconds, getNowTime } from '../../utils/common'
import { getrecordfile } from '../../utils/umo'
import { findCallUser, callRecordMobile, trainUpdateInfo, driverBreakRuleInfo, downLoadSoundFile } from '../../api/call'

// 历史记录表格数据

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
    dataIndex: 'message',
  },
  {
    title: '时间',
    dataIndex: 'breakTime',
    width: 250
  }
];
// 违章记录表格数据
const trainInfoColumns = [
  {
    title: '机车',
    dataIndex: 'trainCode',
    width: 150
  },
  {
    title: '机型',
    dataIndex: 'model',
    width: 150
  },
  {
    title: '故障维修',
    dataIndex: 'maintain',
  },
  {
    title: '时间',
    dataIndex: 'maintainTime',
    width: 250
  }
];

export class ConsoleCase extends Component {
  static propTypes = {
    // prop: PropTypes
  }
  constructor(props) {
    super(props)
    this.timer = null
    this.historyCallColumns = [
      {
        title: '来电时间',
        dataIndex: 'callDate',
        width: 250,
        align: 'center'
      },
      {
        title: '通话时长',
        dataIndex: 'callDuration',
        width: 250,
        align: 'center'
      },
      {
        title: '录音文件',
        render: (text, record) => (
          <span>
            <Button type='primary' icon="cloud-download" onClick={
              () => {
                this.downLoadFile(record.recordId)
              }
            }
            >下载</Button>
          </span>
        ),
        key: '',
        width: 250,
        align: 'center'
      }
    ]
    this.state = {
      callHistoryIsShow: false,      // 历史记录是否显示
      breakRuleIsShow: false,        // 违章记录是否显示
      trainInfoIsShow: false,        // 违章记录是否显示
      dirverName: '',                // 选中的司机名
      timer: '00:00:00',             // 通话时长
      historyCallByPhoneData: [
        { key: '1', name: '张三', mobile: '178277323', callDate: '2018-09-09', callDuration: '120s', recordId: '1233' },
        { key: '2', name: '张三', mobile: '178277323', callDate: '2018-09-09', callDuration: '120s', recordId: '1233' },
        { key: '3', name: '张三', mobile: '178277323', callDate: '2018-09-09', callDuration: '120s', recordId: '1233' },

      ],    // 某个人的通话记录
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
        deptName: '--',
        guideGroup: '--',
        trainNum: '--'

      },
      trainInfoData: [],
      breakRuleData: [],
      trainData: [
        { name: '司机工号', id: 'driverCode', event: '' },
        { name: '司机姓名', id: 'driverName', event: 'breakRuleShowEvent' },
        { name: '联系电话', id: 'driverMobile', event: '' },
        { name: '副司机工号', id: 'assisCode', event: '' },
        { name: '副司机姓名', id: 'assisName', event: 'breakRuleShowEvent' },
        { name: '联系电话', id: 'assisMobile', event: '' },
        { name: '车间', id: 'deptName', event: '' },
        { name: '指导组', id: 'guideGroup', event: '' },
        { name: '区段', id: 'zone', event: '' },
        { name: '机型/车号', id: 'model_trainCode', event: 'trainInfoShowEvent' },
        { name: '出勤时间', id: 'outDate', event: '' },
        { name: '车次', id: 'trainNum', event: '' }
      ]
    }
  }
  componentWillReceiveProps(props) {
    if (props.commationInfomation.callId !== this.props.commationInfomation.callId) {
      if (props.commationInfomation.mobile !== '--') {
        this.showHistoryCallByPhone(props.commationInfomation.mobile)
      }
    }
    if(props.trainInfomation.callId !== this.props.trainInfomation.callId) {
        this.saveUserInfoByphoneNumber(props.trainInfomation)
    }
    if (props.commationInfomation.callStatus !== this.props.commationInfomation.callStatus) {
      if (props.commationInfomation.callStatus === 'CALL_ONLINE') {
        console.log(1111111111, props.commationInfomation)
        this.setTimer(props.commationInfomation.answerDate)
      }
      if (props.commationInfomation.callStatus === 'CALL_HANGUP') {
        clearTimeout(this.timer)
      }
    }
  }
  // 下载文件 
  downLoadFile = async (recordId) => {
    Modal.confirm({
      title: '下载',
      content: '确定下载录音文件？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        try {
          const {data} = await downLoadSoundFile({recordId})
          if(data.code !== 0) {
            message.error(data.msg)
          }
          // const data = {
          //   content: {
          //     recFile: 'http://pic.ibaotu.com/00/36/51/63R888piCB5q.mp3'
          //   }
          // }
           getrecordfile(data.content.recFile)
        } catch (error) {
            message.error('接口故障')
        }
      },
      onCancel: ()=>{
        message.info('你取消了此操作')
      }
    });
    console.log("recordId", recordId)
  }
  // 设置通话时长 1s中刷新一次
  setTimer = (answerDate) => {
    const nowTime = getNowTime()
    const timer = nowTime - getNowTime(answerDate)
    const timerSecond = formatSeconds(timer)
    console.log(timerSecond)
    this.setState({
      timer: timerSecond
    })
    this.timer = setTimeout(() => {
      this.setTimer(answerDate)
    }, 1000)
  }
  componentDidMount() {
    const { mobile } = this.props.commationInfomation
    if (mobile && mobile !== '--') {
      this.saveUserInfoByphoneNumber(this.props.trainInfomation)
    }
  }
  // 填充来的人的信息
  saveUserInfoByphoneNumber = (trainInfomation) => {
    const newTrainValueInfo = { ...trainInfomation, model_trainCode: trainInfomation.model + '/' + trainInfomation.trainCode }
    this.setState({
      trainValueInfo: newTrainValueInfo,
    }, () => {
      this.getTrainUpdateInfo(trainInfomation.trainCode, trainInfomation.model)
    })
  }

  getTrainUpdateInfo = async (trainCode, model) => {
    try {
      const code = trainCode.padStart(4, '0')
      const { data } = await trainUpdateInfo({ trainCode: code, model })
      if (data.code === 0) {
        if (data.content.length) {
          const trainInfoData = data.content.map((item, index) => {
            return { ...item, key: index }
          })
          this.setState({
            trainInfoData
          })
        }
      }
    } catch (error) {
    }

  }
  // 0 司机  1： 副司机
  getDriverBreakRuleInfo = async (driverCode = '2121212') => {
    try {
      const { data } = await driverBreakRuleInfo({ driverNo: driverCode })
      if (data.code === 0) {
        if (data.content.length) {
          const breakRuleData = data.content.map((item, index) => {
            return { ...item, index, key: index }
          })
          this.setState({
            breakRuleData
          })
        }
      }
    } catch (error) {

    }
  }
  // driverBreakRuleInfo

  // 展示与某个人的通话记录
  showHistoryCallByPhone = async (mobile) => {
    try {
      const { data } = callRecordMobile({ mobile })
      if (data.code === 0) {
        this.setState({
          historyCallByPhoneData: data.content
        })
      }
    } catch (error) {

    }
  }
  // 显示通话历史记录弹窗
  historyShowEvent = () => {
    const { callHistoryIsShow } = this.state
    this.setState({
      callHistoryIsShow: !callHistoryIsShow
    })
  }
  // 显示司机违章记录弹窗
  breakRuleShowEvent = (dirverName, key) => {
    console.log(111, dirverName)
    const { breakRuleIsShow } = this.state
    this.setState({
      breakRuleIsShow: !breakRuleIsShow,
      dirverName: dirverName
    }, () => {
      const { driverCode, assisCode } = this.state.trainValueInfo
      // 司机
      if (key === 'driverCode') {
        this.getDriverBreakRuleInfo(driverCode)
        // 副司机
      } else {
        this.getDriverBreakRuleInfo(assisCode)
      }
    })
  }
  // 显示机车维护信息弹窗
  trainInfoShowEvent = () => {
    const { trainInfoIsShow } = this.state
    this.setState({
      trainInfoIsShow: !trainInfoIsShow
    })
  }

  render() {
    const { historyCallByPhoneData, timer, trainData, dirverName, trainValueInfo, callHistoryIsShow, breakRuleIsShow, trainInfoIsShow } = this.state
    const { commationInfomation } = this.props
    return (
      <div>
        <Console
          data={{
            commationInfomation,
            trainData, trainValueInfo,
            timer,
            callHistoryLength: historyCallByPhoneData.length
          }}
          event={{
            historyShowEvent: this.historyShowEvent,
            breakRuleShowEvent: this.breakRuleShowEvent,
            trainInfoShowEvent: this.trainInfoShowEvent,
          }}
        />
        {/* 通话历史 Modal*/}
        <Modal
          title={<div>通话历史（<span style={{ color: color.$primary }}>{this.props.commationInfomation.mobile}</span>）</div>}
          visible={callHistoryIsShow}
          onCancel={() => this.historyShowEvent()}
          footer={null}
        >
          <Table columns={this.historyCallColumns} dataSource={historyCallByPhoneData} scroll={{ y: 265 }} pagination={false} />
        </Modal>

        {/* 司机违章信息 Modal */}
        <Modal
          width={900}
          title={<div>司机违章信息（<span style={{ color: color.$primary }}>{dirverName}</span>）</div>}
          visible={breakRuleIsShow}
          onCancel={() => this.breakRuleShowEvent()}
          footer={null}
        >
          <Table columns={breakRuleColumns} dataSource={this.state.breakRuleData} pagination={false} />
        </Modal>

        {/* 机车维护信息 Modal */}
        <Modal
          width={900}
          title='机车维护信息'
          visible={trainInfoIsShow}
          onCancel={() => this.trainInfoShowEvent()}
          footer={null}
        >
          <Table columns={trainInfoColumns} dataSource={this.state.trainInfoData} pagination={false} />
        </Modal>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({                  // owProps 是这个容器组件接收的props值，因为在处理时可能要用到他
  commationInfomation: state.commation,
  trainInfomation: state.trainInfo
})
const mapDispatchToProps = (dispatch) => ({            // 引用全局actions中定义方法
})
export default connect(mapStateToProps, mapDispatchToProps)(ConsoleCase)
