import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd' 
import {callRecord } from '../../api/call'
const callInListColumns = [
  {
    title: '联系电话',
    dataIndex: 'mobile',
    width: 250
  },
  {
    title: '来电时间',
    dataIndex: 'callDate',
    width: 250
  },
  {
    title: '状态',
    dataIndex: 'callStatus',
    width: 250
  }
];
export default class BaseCallOnLineListModal extends Component {
  static propTypes = {
    // prop: PropTypes
  }
  constructor(props) {
    super(props)
    this.timer = null
    this.state = {
      callInListData: [
        // {mobile: '1001', callDate: '2019-02-01 04:02:32', callStatus: '未接通'}
      ],
    }
  }
  componentDidMount() {
    this.getCallRecord()
  }
  componentWillUnmount() {
    clearTimeout(this.timer)
  }
 // 得到失败记录
 getCallRecord = async() => {
  clearTimeout(this.timer1)
  try {
   const {data} = await callRecord({callStatus: 'CALL_FAILURE'})
   if(data.code === 0) {
     this.setState({
       callInListData: data.content
     })
   } else {
   }
   this.timer = setTimeout(()=>{this.getCallRecord()}, 5000)
  } catch (error) {
    console.log(error)
  }
  
 }
  render() {
    const { callInListData} = this.state
    return (
      <Table columns={callInListColumns} rowKey={(record)=>record.mobile + record.callDate} dataSource={callInListData} scroll={{y: 265}} pagination={false} />
    )
  }
}
