import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'                           // 用来连接redux中reducer中全局数据的
import { Divider, Button } from 'antd'
import Group from '../../components/communication/Group'                 // 引用的ui组件

export class GroupCase extends Component {
  static propTypes = {
    // prop: PropTypes
  }
  constructor(props) {
    super(props)
    this.state = {
      tableColumns: [
        {
          title: '群组名',
          dataIndex: 'age',
        },
        {
          title: '群组成员',
          dataIndex: 'address',
        },
        {
          title: '操作',
          dataIndex: 'operate',
          render: (text, record) => (
            <span>
              <Button type='primary'>修改</Button>
              <Divider type="vertical" />
              <Button type='danger'>删除</Button>
              <Divider type="vertical" />
              <Button type='primary'>拨打</Button>
            </span>
          )
        }
      ],
      tableData:[]
    }
  }
  componentDidMount(){
    let tempData = []
    for (let i = 0; i < 46; i++) {
      tempData.push({
        key: i,
        age: 32,
        address: `London, Park Lane no. ${i}`
      })
    }
    this.setState({
      tableData: tempData
    })
  }
  render() {
    let {tableColumns,tableData} = this.state
    return (
      <div>
        <Group 
          tableData = {tableData}
          tableColumns = {tableColumns}
        />
      </div>
    )
  }
}
const mapStateToProps = (state) => ({                  // owProps 是这个容器组件接收的props值，因为在处理时可能要用到他
})
const mapDispatchToProps = (dispatch) => ({            // 引用全局actions中定义方法
})
export default connect(mapStateToProps, mapDispatchToProps)(GroupCase)
