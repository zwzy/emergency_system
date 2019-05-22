import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'                           // 用来连接redux中reducer中全局数据的
import { Divider, Button } from 'antd'
import Contact from '../../components/communication/Contact'                 // 引用的ui组件

export class ContactCase extends Component {
  static propTypes = {
    // prop: PropTypes
  }
  constructor(props) {
    super(props)
    this.searchParams = {// 筛选条件
      pageSize: 10,
      pageIndex: 1,
      keyword:''
    }
    this.state = {
      tableColumns: [
        {
          title: '联系人姓名',
          dataIndex: 'age',
        },
        {
          title: '联系人号码',
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
  // 输入框
  handleInputVal = (e) => {
    this.searchParams.keyword = e.target.value
  }
  clickSearch= ()=>{
    console.log('searchParams=',this.searchParams)
  }
  render() {
    let {tableColumns,tableData} = this.state
    return (
      <div>
        <Contact 
          data = {{
            tableData,
            tableColumns
          }}
          event = {{
            handleInputVal: this.handleInputVal,
            clickSearch:this.clickSearch
          }}
        />
      </div>
    )
  }
}
const mapStateToProps = (state) => ({                  // owProps 是这个容器组件接收的props值，因为在处理时可能要用到他
})
const mapDispatchToProps = (dispatch) => ({            // 引用全局actions中定义方法
})
export default connect(mapStateToProps, mapDispatchToProps)(ContactCase)
