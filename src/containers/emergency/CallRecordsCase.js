import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'                           // 用来连接redux中reducer中全局数据的

import CallRecords from '../../components/emergency/CallRecords'                 // 引用的ui组件
const callRecordsColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];
export class CallRecordsCase extends Component {
  static propTypes = {
    // prop: PropTypes
  }
  constructor(props) {
    super(props)
    this.searchParams = {
      gonghao: '',
      pageSize: '',
      pageNum: '',
      cheType: '',
      dirverName: '',
      cheNum: '',
      keyWord: '',
     }
    this.state = {
      callRecordsData: [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
        },
      ],
     
    }
  }

  keyWordSearch = () => {

  }
  changeInputValue = ({currentTarget:{value}}, type) => {
    this.searchParams = {...this.searchParams, [type]: value}
    console.log(this.searchParams)
  }
  componentWillUpdate(props, state) {
    console.log(state !== this.state)
    if(state !== this.state) {
      console.log(1111) 
      return false
    } else {
      console.log(2222) 
      return true
    }
  }
  render() {
    console.log(3333)
    const {callRecordsData} = this.state
    return (
      <div>
         <CallRecords 
            data={{callRecordsColumns, callRecordsData}}
            event={{changeInputValue: this.changeInputValue}}
          />
      </div>
    )
  }
}
const mapStateToProps = (state) => ({                  // owProps 是这个容器组件接收的props值，因为在处理时可能要用到他
})
const mapDispatchToProps = (dispatch) => ({            // 引用全局actions中定义方法
})
export default connect(mapStateToProps, mapDispatchToProps)(CallRecordsCase)
