import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Input,Table,Button,DatePicker  } from 'antd' 
import { signList } from '../../api/user'
// import moment from 'moment';
const dateFormat = 'YYYY-MM-DD';

export default class DutySearch extends Component {
  constructor(props) {
    super(props)
    this.searchParams = {// 筛选条件
      apartment:'',
      job:'',
      username:'',
      worktime: ''
    }
    this.state = {
      loading: false, 
      tableColumns: [ // 签到记录表头
        {
          title: '序号',
          dataIndex: 'key',
        },
        {
          title: '部门',
          dataIndex: 'deptName',
        },
        {
          title: '职位',
          dataIndex: 'roleName'
        },
        {
          title: '姓名',
          dataIndex: 'userName',
        },
        {
          title: 'IP',
          dataIndex: 'ip',
        },
        {
          title: '签到时间',
          dataIndex: 'signTime'
        }
      ],
      tableData: [], // 签到记录表数据
      pagination: {
        current: 1, 
        pageSize: 10,
        total:1
      }
    }
  }
  promiseApi = ({date,userName,roleName,deptName, pageNum, pageSize}) => {
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
            total: 200
          },
          code: 0
        }
      }
        resolve(obj)
      }, 2000)
    })
  }
  getSignList = async() => {
    this.setState({
      loading: true
    })
    let { tableData } = this.state
    let {current: pageNum , pageSize } = this.state.pagination
    try {
      let params = {// 筛选条件
        pageSize: pageSize,
        pageNum: pageNum,
        deptName: this.searchParams.apartment,
        roleName:this.searchParams.job,
        userName:this.searchParams.username,
        date: this.searchParams.worktime
      }
      const {data} = await signList(params)
      // const {data} = await this.promiseApi(params)
      this.setState({
        loading: false
      })
      console.log('signlist==',data)
      if(data.code === 0) {
        let pagination = {...this.state.pagination , total: data.content.total }
        tableData = data.content.list
        tableData.forEach((item,index) => {
          item.key = index + 1
        })
        this.setState({
          tableData:tableData,
          pagination: pagination
        },() => {
          // console.log(this.state.tableData)
        })
      }
    } catch (error) {
    }
  }
  // 输入框筛选条件
  handleInputVal = (e, type) => {
    this.searchParams[type] = e.target.value
  }
  dateChange = (e,v) => {
    // console.log(v)
    this.searchParams['worktime'] = v
  }
  clickSearch= ()=> {
    this.getSignList()
  }
  componentDidMount() {
    this.getSignList()
  }
  handleTable = (pagination, filters, sorter) => {
      console.log(pagination)
      this.setState({
        pagination
      }, ()=>{
        this.getSignList()
      })
  }
  render() {
    return (
      <div className='duty-wrap'>
        <ul className='input-ul'>
          <li>
            <span className='input-tit'>部门:</span>
            <Input placeholder="请输入部门" allowClear onChange={(e) => this.handleInputVal(e,'apartment')} style={{width:'188px'}}/>
          </li>
          <li>
            <span className='input-tit'>职位:</span>
            <Input placeholder="请输入职位" allowClear onChange={(e) => this.handleInputVal(e,'job')} style={{width:'188px'}}/>
          </li>
          <li>
            <span className='input-tit'>姓名:</span>
            <Input placeholder="请输入姓名" allowClear onChange={(e) => this.handleInputVal(e,'username')} style={{width:'188px'}}/>
          </li>
          <li>
            <span className='input-tit'>值班时间:</span>
            <DatePicker placeholder="请选择时间" onChange={(e,v) => this.dateChange(e,v)} format={dateFormat} style={{width:'188px'}}/>
          </li>
          <li>
            <Button type="primary" onClick={() => this.clickSearch()}>搜索</Button>
          </li>
        </ul>
        <Table bordered loading={this.state.loading}  columns={this.state.tableColumns} onChange={this.handleTable} pagination={this.state.pagination} dataSource={this.state.tableData} />
      </div>
    )
  }
}
