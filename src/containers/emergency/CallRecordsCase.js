import React, { Component } from 'react'
import PropTypes from 'prop-types'
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { connect } from 'react-redux'                           // 用来连接redux中reducer中全局数据的
import { Modal,Select, Table, Button, message, Row, Col, Input, DatePicker } from 'antd'
import styled from 'styled-components'
import { getrecordfile } from '../../utils/umo'
import { InputGroupSearch } from '../../utils/styled'

import { downLoadSoundFile, getCallRecordHistory } from '../../api/call'
const CallRecordsBox = styled.div`
`
const { RangePicker } = DatePicker;
const { Option } = Select;
export class CallRecordsCase extends Component {
  static propTypes = {
    // prop: PropTypes
  }
  constructor(props) {
    super(props)
    this.state = {
      callRecordsColumns: [
        {
          title: '来电/拨打',
          render: (text, record) => (
            <div className='icon'>
              {
               String(record.direction) === '0' ? (
                     <span className={`icon-mobile iconfont`}></span>
               ) : <span style={{marginRight: '24px'}}></span>
              }
              {record.mobile}
            </div>
          ),
        },
        {
          title: '车次',
          dataIndex: 'trainNum',
          render: (text, record) => (
            <span>
              {record.trainNum ? record.trainNum:  '--'}
            </span>
          ),
        },
        {
          title: '用户',
          dataIndex: 'recordName',
          render: (text, record) => (
            <span>
              {record.recordName ? record.recordName:  '--'}
            </span>
          ),
        },
        {
          title: '拨打/接听时间',
          render: (text, record) => (
            <span>
              {String(record.direction) === '0' ? record.callDate ? record.callDate: '--' :  record.answerTime ? record.answerTime : '--'}
            </span>
          ),
        },
        {
          title: '拨打/接听时长',
          render: (text, record) => (
            <span>
              {record.callDuration ? record.callDuration:  '--'}
            </span>
          ),
        },
        {
          title: '录音名称',
          render: (text, record) => (
            <span>
              {record.recFileName ? record.recFileName:  '--'}
            </span>
          ),
        },
        {
          title: '操作',
          render: (text, record) => (
            <span>
             {record.recordId ? (
                <Button type='link'  onClick={
                  () => {
                    this.downLoadFile(record.recordId)
                  }
                }
                >录音下载</Button>) : '--'
              }
            </span>
          ),
        }
      ],
      searchParams: {
        model: '',
        loco: '',
        driverName: '',
        workno: '',
        startTime: '',
        endTime: '',
        mobile: '',
        directEnum: 'CALL_ALL'
      },
      callRecordsData: [
      ],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 1,
      },
      loading: false,
    }
  }
  componentDidMount() {
    this.getCallRecords()
  }
  promiseApi = ({ pageNum, pageSize }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = [
          {
            direction: 0,
            recFileName: pageNum + 'John Brown' + 0,
            recFile: null,
            recordName:null,
            answerTime: null,
            handlerMan: '张三',
            handlerDesc: 'New York No. 1 dsd Padddrk',
            evaluation: 'New York No. 1 dsddsd Pfdfark',
            mobile: '1876554783' + pageNum,
            callDuration: null,
            recordId: 9,
            recordMax: '1200kb',
            callDate: '2019-08-09 12:20:30'
          },
          {
            direction: 1,
            mobile: '1876554783' + pageNum,
            recFileName: pageNum + 'John Brown' + 1,
            recFile: pageNum + 'John Brown' + 1,
            answerTime: '2019-08-09 12:23:30',
            recordName: pageNum + 'John Brown' + 1,
            handlerMan: '张三',
            handlerDesc: 'New York No. 1 dsd Padddrk',
            evaluation: 'New York No. 1 dsddsd Pfdfark',
            finalHandlerMan: '王五',
            createDate: '2019-08-09 12:23:30',
            callDuration: '120s',
            recordMax: '1200kb',
            recordId: '23232434',
            callDate: '2019-08-09 12:20:30'
          },
          {
            direction: 1,
            mobile: '1876554783' + pageNum + 2,
            recFileName: pageNum + 'John Brown' + 2,
            recFile: pageNum + 'John Brown' + 2,
            answerTime: '2019-08-09 12:23:30',
            recordName: pageNum + 'John Brown' + 2,
            handlerMan: '张三',
            handlerDesc: 'New York No. 1 dsd Padddrk',
            evaluation: 'New York No. 1 dsddsd Pfdfark',
            finalHandlerMan: '王五',
            createDate: '2019-08-09 12:23:30',
            callDuration: '120s',
            recordMax: '1200kb',
            recordId: '3245343',
            callDate: '2019-08-09 12:20:30'
          },
          {
            direction: 0,
            trainNum: "K7789",
            mobile: '1876554783' + pageNum + 3,
            recFileName: pageNum + 'John Brown' + 3,
            recFile: pageNum + 'John Brown' + 3,
            answerTime: '2019-08-09 12:23:30',
            recordName: pageNum + 'John Brown' + 3,
            handlerMan: '张三',
            handlerDesc: 'New York No. 1 dsd Padddrk',
            evaluation: 'New York No. 1 dsddsd Pfdfark',
            finalHandlerMan: '王五',
            createDate: '2019-08-09 12:23:30',
            callDuration: '120s',
            recordMax: '1200kb',
            recordId: '867676',
            callDate: '2019-08-09 12:20:30'
          },
          {
            direction: 1,
            mobile: '1876554783' + pageNum + 4,
            recFileName: pageNum + 'John Brown' + 0,
            recFile: pageNum + 'John Brown' + 0,
            answerTime: '2019-08-09 12:23:30',
            recordName: pageNum + 'John Brown' + 4,
            handlerMan: '张三',
            handlerDesc: 'New York No. 1 dsd Padddrk',
            evaluation: 'New York No. 1 dsddsd Pfdfark',
            finalHandlerMan: '王五',
            createDate: '2019-08-09 12:23:30',
            callDuration: '120s',
            recordMax: '1200kb',
            recordId: '0878787',
            callDate: '2019-08-09 12:20:30'
          },
          {
            direction: 0,
            recFileName: pageNum + 'John Brown' + 0,
            recFile: pageNum + 'John Brown' + 0,
            recordName: pageNum + 'John Brown' + 5,
            handlerMan: '张三',
            handlerDesc: 'New York No. 1 dsd Padddrk',
            evaluation: 'New York No. 1 dsddsd Pfdfark',
            finalHandlerMan: '王五',
            createDate: '2019-08-09 12:23:30',
            callDuration: '120s',
            recordMax: '1200kb',
            recordId: '0878787',
            callDate: '2019-08-09 12:20:30'
          },
          {
            direction: 0,
            recFileName: pageNum + 'John Brown' + 0,
            recFile: pageNum + 'John Brown' + 0,
            answerTime: '2019-08-09 12:23:30',
            recordName: pageNum + 'John Brown' + 6,
            handlerMan: '张三',
            handlerDesc: 'New York No. 1 dsd Padddrk',
            evaluation: 'New York No. 1 dsddsd Pfdfark',
            finalHandlerMan: '王五',
            createDate: '2019-08-09 12:23:30',
            callDuration: '120s',
            recordMax: '1200kb',
            recordId: '0878787',
            callDate: '2019-08-09 12:20:30'
          },
          {
            direction: 0,
            recFileName: pageNum + 'John Brown' + 0,
            recFile: pageNum + 'John Brown' + 0,
            answerTime: '2019-08-09 12:23:30',
            recordName: pageNum + 'John Brown' + 7,
            handlerMan: '张三',
            handlerDesc: 'New York No. 1 dsd Padddrk',
            evaluation: 'New York No. 1 dsddsd Pfdfark',
            finalHandlerMan: '王五',
            createDate: '2019-08-09 12:23:30',
            callDuration: '120s',
            recordMax: '1200kb',
            recordId: '0878787',
            callDate: '2019-08-09 12:20:30'
          },
          {
            direction: 1,
            recFileName: pageNum + 'John Brown' + 0,
            recFile: pageNum + 'John Brown' + 0,
            answerTime: '2019-08-09 12:23:30',
            recordName: pageNum + 'John Brown' + 8,
            handlerMan: '张三',
            handlerDesc: 'New York No. 1 dsd Padddrk',
            evaluation: 'New York No. 1 dsddsd Pfdfark',
            finalHandlerMan: '王五',
            createDate: '2019-08-09 12:23:30',
            callDuration: '120s',
            recordMax: '1200kb',
            recordId: '0878787',
            callDate: '2019-08-09 12:20:30'
          }, {
            callDate: null,
            callDuration: "60",
            callStatus: null,
            createDate: "2019-05-24 15:34:47",
            evaluation: null,
            finalHandlerMan: null,
            handlerDesc: null,
            handlerMan: null,
            mobile: null,
            name: null,
            recordId: null,
            recordMax: "-",
            recordName: null,
          }
        ]
        const obj = {
          data: {
            content: {
              endRow: 1,
              firstPage: 1,
              hasNextPage: true,
              hasPreviousPage: false,
              isFirstPage: true,
              isLastPage: false,
              lastPage: 8,
              list: data.slice(0, pageSize),
              navigatePages: 8,
              navigatepageNums: [1, 2, 3, 4, 5, 6, 7, 8],
              nextPage: 0,
              pageNum: 1,
              pageSize: 10,
              pages: 1,
              prePage: 0,
              size: 2,
              startRow: 0,
              total: 100
            },
            code: 0
          }
        }
        resolve(obj)
      }, 2000)
    })
  }

  getCallRecords = async () => {
   
    const { current: pageNum, pageSize } = this.state.pagination
    const searchParams = { ...this.state.searchParams, pageNum, pageSize }
    try {
      this.setState({
        loading: true
      })
      const { data } = await getCallRecordHistory(searchParams)
      // const {data}  = await this.promiseApi(searchParams)
      if (data.code === 0) {
        const pagination = { ...this.state.pagination, total: data.content.total };
        this.setState({
          callRecordsData: data.content.list,
          pagination
        })
      }
      this.setState({
        loading: false
      })
    } catch (error) {
      this.setState({
        loading: false
      })
      console.log(error)
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
          const { data } = await downLoadSoundFile({ recordId })
          if (data.code !== 0) {
            message.error(data.msg)
          }
          getrecordfile(data.content.recFile)
        } catch (error) {
          message.error('接口故障')
        }
      },
      onCancel: () => {
        message.info('你取消了此操作')
      }
    });
    console.log("recordId", recordId)
  }
  changeInputValue = ({ currentTarget: { value } }, type) => {
    this.setState({searchParams:{ ...this.state.searchParams, [type]: value }})
  }

  handleTableChange = (pagination) => {
    console.log(pagination)
    this.setState({
      pagination
    }, () => {
      this.getCallRecords()
    })
  }
  handleChange = (val, index) => {
    console.log(val, index)
    const directEnum = val
    this.setState({
      searchParams: {
        ...this.state.searchParams,
        directEnum
      }
    })
  }
  onTimeChange = (date, dateString) => {
    if(dateString.length>0) {
      const startTime = dateString[0]
      const endTime = dateString[1]
      this.setState({
        searchParams: {
          ...this.state.searchParams,
          startTime,
          endTime
        }
      })
    }

  }
  
  render() {
    const { callRecordsData, pagination, loading, callRecordsColumns } = this.state
    return (
      <div>
        <CallRecordsBox>
          <InputGroupSearch>
            <Row gutter={8}>
              <Col span={2}> 电话：</Col>
              <Col span={5}>
                <Input onChange={(e) => this.changeInputValue(e, 'mobile')} placeholder="请输入电话关键字" />
              </Col>
              <Col span={2} >时间：</Col>
              <Col span={8} style={{textAlign: 'left'}}>
                <RangePicker  locale={locale} onChange={this.onTimeChange} />
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={2}> 类型：</Col>
              <Col span={5}>
              <Select defaultValue="CALL_ALL" style={{ width:'100%' }} onChange={this.handleChange}>
                <Option value="CALL_ALL">全部</Option>
                <Option value="CALL_IN">来电</Option>
                <Option value="CALL_OUT">拨打</Option>
              </Select>
              </Col>
              <Col span={2}></Col>
              <Col span={3} style={{textAlign: 'left'}}>
                <Button type='primary' onClick={() => { this.getCallRecords() }}>筛选</Button>
              </Col>
            </Row>
          </InputGroupSearch>
          <Table rowKey={record => record.recordId} loading={loading} bordered columns={callRecordsColumns} onChange={this.handleTableChange} pagination={pagination} dataSource={callRecordsData}
          />
        </CallRecordsBox>
        {/* <CallRecords 
            data={{callRecordsColumns: this.callRecordsColumns, callRecordsData, pagination, loading  }}
            event={{changeInputValue: this.changeInputValue, handleTableChange: this.handleTableChange, getCallRecords: this.getCallRecords }}
          /> */}
      </div>
    )
  }
}
const mapStateToProps = (state) => ({                  // owProps 是这个容器组件接收的props值，因为在处理时可能要用到他
})
const mapDispatchToProps = (dispatch) => ({            // 引用全局actions中定义方法
})
export default connect(mapStateToProps, mapDispatchToProps)(CallRecordsCase)
