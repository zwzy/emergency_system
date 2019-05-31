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
        {key: 1, username: '张三', userdept: '开发三部', mobile: '1000'},
        {key: 2, username: '李四', userdept: '技术部', mobile: '1001'},
        {key: 3, username: '王五', userdept: '运营部', mobile: '1002'},
        {key: 4, username: '李蛋', userdept: '行政部', mobile: '1003'},
        {key: 5, username: '池子', userdept: '咨询部', mobile: '1004'},
        {key: 6, username: '梁海源', userdept: '产品部', mobile: '1005'},
        {key: 7, username: '赵钱', userdept: '测试部', mobile: '1006'},
        {key: 8, username: '孙膑', userdept: '外购部', mobile: '1007'},
        {key: 9, username: '卫通', userdept: '应急部', mobile: '1008'},
        {key: 10, username: '高杰', userdept: '处理事宜部', mobile: '1009'},
        {key: 11, username: '鲍旺', userdept: '运营部', mobile: '1010'},
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
