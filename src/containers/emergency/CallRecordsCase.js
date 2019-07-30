import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'                           // 用来连接redux中reducer中全局数据的
import { Modal, Table, Button, message, Row, Col, Input } from 'antd'
import styled from 'styled-components'
import { getrecordfile } from '../../utils/umo'
import { InputGroupSearch } from '../../utils/styled'

import { downLoadSoundFile, getCallRecordHistory } from '../../api/call'
// import CallRecords from '../../components/emergency/CallRecords'                 // 引用的ui组件
const CallRecordsBox = styled.div`
`
export class CallRecordsCase extends Component {
  static propTypes = {
    // prop: PropTypes
  }
  constructor(props) {
    super(props)
    this.state = {
      callRecordsColumns: [
        {
          title: '名称',
          dataIndex: 'recordName',
        },
        {
          title: '处置人',
          dataIndex: 'handlerMan',
        },
        {
          title: '处置情况',
          dataIndex: 'handlerDesc',
        },
        {
          title: '评价',
          dataIndex: 'evaluation',
        },
        {
          title: '最终处置人',
          dataIndex: 'finalHandlerMan',
        },
        {
          title: '处置时间',
          dataIndex: 'handlerTime',
        },
        {
          title: '来电时间',
          dataIndex: 'callDate',
        },
        {
          title: '录音时长',
          dataIndex: 'callDuration',
        },
        {
          title: '录音文件大小',
          dataIndex: 'recordMax',
        },
        {
          title: '录音下载',
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
        }
      ],
      searchParams: {
        model: '',
        loco: '',
        driverName: '',
        workno: ''
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
            recordName: pageNum + 'John Brown' + 0,
            handlerMan: '张三',
            handlerDesc: 'New York No. 1 dsd Padddrk',
            evaluation: 'New York No. 1 dsddsd Pfdfark',
            finalHandlerMan: '王五',
            createDate: '2019-08-09 12:23:30',
            callDuration: '120s',
            recordMax: '1200kb',
            recordId: '12233443',
            callDate: '2019-08-09 12:20:30'
          },
          {
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
  render() {
    const { callRecordsData, pagination, loading, callRecordsColumns } = this.state
    return (
      <div>
        <CallRecordsBox>
          <InputGroupSearch>
            <Row gutter={8}>
              <Col span={2}> 工号：</Col>
              <Col span={5}>
                <Input onChange={(e) => this.changeInputValue(e, 'workno')} placeholder="请输入工号" />
              </Col>
              <Col span={2} > 车型：</Col>
              <Col span={5}>
                <Input onChange={(e) => this.changeInputValue(e, 'model')} placeholder="请输入车型" />
              </Col>
              <Col span={2}> 司机姓名：</Col>
              <Col span={5}>
                <Input onChange={(e) => this.changeInputValue(e, 'driverName')} placeholder="请输司机姓名" />
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={2}> 车号：</Col>
              <Col span={5}>
                <Input onChange={(e) => this.changeInputValue(e, 'loco')} placeholder="请输入车号" />
              </Col>
              <Col span={4}>
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
