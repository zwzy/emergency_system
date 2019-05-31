import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {startTransferPhone} from '../../utils/umo'
import { Table, Button } from 'antd' 

export default class TransferModal extends Component {
  static propTypes = {
    // prop: PropTypes
  }
  constructor(props) {
    super(props)
    this.TransferColumns = [
      {
        title: '姓名',
        dataIndex: 'username',
        width: 200,
      },
      {
        title: '所在部门',
        dataIndex: 'userdept',
        width: 250,
      },
      {
        title: '电话',
        dataIndex: 'mobile',
        width: 250,
      },
      {
        title: '操作',
        dataIndex: '',
        render: (val) => {
         return (<Button type="primary" shape="circle" icon="phone" onClick={() => { console.log(val); startTransferPhone({phoneNumber: val.mobile})}} />)
        }
      }
    ]
    this.state = {
      TransferData: [
        {key: 1, username: '张三', userdept: '开发三部', mobile: '18765747343'},
        {key: 2, username: '张三', userdept: '开发三部', mobile: '18765747343'},
        {key: 3, username: '张三', userdept: '开发三部', mobile: '18765747343'},
        {key: 4, username: '张三', userdept: '开发三部', mobile: '18765747343'},
        {key: 5, username: '张三', userdept: '开发三部', mobile: '18765747343'},
        {key: 6, username: '张三', userdept: '开发三部', mobile: '18765747343'},
        {key: 7, username: '张三', userdept: '开发三部', mobile: '18765747343'}
      ]
    }
  }
  render() {
    const {TransferData} = this.state
    return (
      <Table width={700} columns={this.TransferColumns} dataSource={TransferData} scroll={{y: 300}} pagination={false} />
    )
  }
}
