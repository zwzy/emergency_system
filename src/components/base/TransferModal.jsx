import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {startTransferPhone} from '../../utils/umo'
import { Table, Button } from 'antd' 
import { signList } from '../../api/user'


export default class TransferModal extends Component {
  static propTypes = {
    // prop: PropTypes
  }
 
  constructor(props) {
    super(props)
    this.TransferColumns =[ // 签到记录表头
      {
        title: '姓名',
        dataIndex: 'userName',
        width: 200,

      },
      {
        title: '所在部门',
        dataIndex: 'deptName',
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
      ]
    }
  }
  componentDidMount() {
    const signDate = (new Date()).toISOString().substr(0,10)
    this.getNowDaySignList(signDate)
  }
  async getNowDaySignList(date) {
    let params = {// 筛选条件
      pageSize: 100,
      pageNum: 1,
      deptName: '',
      roleName: '',
      userName:'',
      date
    }
    const {data} = await signList(params)
    // const data = {
    //   content: {
    //     list:[{createTime:1563721897965,
    //       deptName:"段值班领导",ip:"192.168.22.11",mobile:"13655556666",modifyTime:1563721897965,roleName:"段值班领导",userName:"张三",workno:8888}
    //   ]}
    // }
    this.setState({
      TransferData: data.content.list
    })

  }
  render() {
    const {TransferData} = this.state
    return (
      <Table width={700} columns={this.TransferColumns} dataSource={TransferData} scroll={{y: 300}} pagination={false} />
    )
  }
}
