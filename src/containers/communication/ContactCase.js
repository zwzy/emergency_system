import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'                           // 用来连接redux中reducer中全局数据的
import { Button , Input , Table, message } from 'antd'
import { findCallBook } from '../../api/call'
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
      loading: false,
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
      tableData: [
      ],
      params: {
        keyword: '',
      },
      pagination: {
        current: 1,
        pageSize: 5,
        total:1,
      }
    }
  }
  componentDidMount(){
    this.getCallBook()
  }
  promiseApi = ({keyword, pageNum, pageSize}) => {
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        const data = [
          {mobile: '18755489161', userName: '张三'+pageNum +0, userId:  '张'+pageNum +0},
          {mobile: '18755489161', userName: '张三'+pageNum +1, userId:  '张'+pageNum +1},
          {mobile: '18755489161', userName: '张三'+pageNum +2, userId:  '张'+pageNum +2},
          {mobile: '18755489161', userName: '张三'+pageNum +3, userId:  '张'+pageNum +3},
          {mobile: '18755489161', userName: '张三'+pageNum +4, userId:  '张'+ pageNum +4},
          {mobile: '18755489161', userName: '张三'+pageNum +5, userId:  '张'+ pageNum +5},
          {mobile: '18755489161', userName: '张三'+pageNum +6, userId:  '张'+ pageNum +6},
          {mobile: '18755489161', userName: '张三'+pageNum +7, userId:  '张'+ pageNum +7},
          {mobile: '18755489161', userName: '张三'+pageNum +8, userId:  '张'+ pageNum +8},
          {mobile: '18755489161', userName: '张三'+pageNum +9, userId:  '张'+ pageNum +9}
      ]
      const obj = {
        data: {
          content:{
            endRow: 1,
            firstPage: 1,
            hasNextPage: false,
            hasPreviousPage: false,
            isFirstPage: true,
            isLastPage: true,
            lastPage: 1,
            list: data.slice(0, pageSize),
            navigatePages: 8,
            navigatepageNums: [1],
            nextPage: 0,
            pageNum: 1,
            pageSize: 10,
            pages: 1,
            prePage: 0,
            size: 2,
            startRow: 0,
            total: 2
          },
          code: 0
        }
      }
        resolve(obj)
      }, 2000)
    })
  }
  // 得到通讯录，根据条件
  getCallBook = async() =>{
    const {current: pageNum , pageSize} = this.state.pagination
    const {keyword} = this.state.params
    console.log(pageNum, pageSize)
    try {
      this.setState({
        loading: true
      })
      const {data} = await findCallBook({keyword, pageNum, pageSize})
      // const {data}  = await this.promiseApi({keyword, pageNum, pageSize})
      if(data.code === 0) {
        const pagination = { ...this.state.pagination, total: data.content.total };
        this.setState({
          tableData:data.content.list,
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

    // 输入框
    handleInputVal = (e) => {
      this.setState({
        params: {
          ...this.state.params, keyword: e.target.value
        }
      })
    }
    clickSearch= ()=>{
      const {params} = this.state 
      if(params.keyword) {
        this.getCallBook()
      } else {
        message.error('关键字不能为空')
      }

    }
    handleTableChange = (pagination, filters, sorter) => {
      console.log(pagination)
      this.setState({
        pagination
      }, ()=>{
        this.getCallBook()
      })
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
            <Table  rowKey={record => record.userId} bordered columns={tableColumns}  loading={this.state.loading}  onChange={this.handleTableChange} pagination={this.state.pagination}  dataSource={tableData} />
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
