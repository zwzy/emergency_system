import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'                           // 用来连接redux中reducer中全局数据的
import { Button , Input , Table, message } from 'antd'
import { findUserByDept } from '../../api/call'
import {callOutPhone} from '../../utils/umo'
import styled from 'styled-components'

const Contact = styled.div `
.search-wrap {
  width: 100%;
  height: 79px;
  line-height: 79px;
  background-color: rgba(229, 229, 229, 1);
  border-radius: 5px;
  padding: 0 26px;
  margin-bottom: 20px;
  .search-tit {
    font-size: 16px;
  }
}
.btn-wrap {
  margin-top: 14px;
  margin-bottom: 14px;
  Button {
    margin-right: 20px;
  }
}
`
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
          dataIndex: 'userName',
          key: 'userName'
        },
        {
          title: '联系人号码',
          dataIndex: 'mobile',
          key: 'mobile'

        },
        {
          title: '操作',
          dataIndex: 'operate',
          render: (text, record) => (
            <span>
              <Button type='primary' onClick={
                () => {
                  console.log(1111, text, record.mobile)
                  callOutPhone({phoneNumber: record.mobile, uud: '4555', gid: '@0'} )
              }
              }
              >拨打</Button>
            </span>
          ),
          key: ''
        }
      ],
      tableData: [],
      deptParams: {
        deptNo: '',
        keyword: ''
      },
    }
  }
  componentDidMount(){
    // this.getCallBook()
  }
  // 得到通讯录，根据条件
  getCallBook = async() =>{
    const {deptParams} = this.state
    try {
      const {data} = await findUserByDept(deptParams)
      // const data = {
      //   content : [...this.state.tableData, ...this.state.tableData]
      // }
      this.setState({
        tableData: data.content
      })
    } catch (error) {
       console.log(error)
    }
  }

    // 输入框
    handleInputVal = (e) => {
      this.setState({
        deptParams: {
          ...this.state.deptParams, keyword: e.target.value
        }
      })
    }
    clickSearch= ()=>{
      const {deptParams} = this.state 
      if(deptParams.keyword) {
        this.getCallBook()
      } else {
        message.error('关键字不能为空')
      }

    }
  render() {
    let {tableColumns,tableData} = this.state
    return (
      <div>
        <Contact>
          <div className='search-wrap'>
            <span className='search-tit'>快速搜索：</span>
            <Input onChange={(e) => this.handleInputVal(e)} placeholder='请输入关键字搜索'  style={{width:'500px',marginLeft:'23px',marginRight:'35px'}}/>
            <Button type="primary" onClick={() => this.clickSearch()}>搜索</Button>
          </div>
          <div>
            <Table bordered columns={tableColumns} dataSource={tableData} />
          </div>
        </Contact> 
      </div>
    )
  }
}
const mapStateToProps = (state) => ({                  // owProps 是这个容器组件接收的props值，因为在处理时可能要用到他
})
const mapDispatchToProps = (dispatch) => ({            // 引用全局actions中定义方法
})
export default connect(mapStateToProps, mapDispatchToProps)(ContactCase)
