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
      pageSize: 10,
      pageIndex: 1,
      apartment:'',
      job:'',
      username:'',
      worktime: ''
    }
    this.state = {
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
      tableData: [] // 签到记录表数据
    }
  }
  getSignList = async() => {
    let { tableData } = this.state
    try {
      let params = {// 筛选条件
        pageSize: this.searchParams.pageSize,
        pageNum: this.searchParams.pageIndex,
        deptName: this.searchParams.apartment,
        roleName:this.searchParams.job,
        userName:this.searchParams.username,
        date: this.searchParams.worktime
      }
      const {data} = await signList(params)
      console.log('signlist==',data)
      if(data.code == 0) {
        tableData = data.content.list
        tableData.forEach((item,index) => {
          item.key = index + 1
        })
      }
      this.setState({
        tableData:tableData
      },() => {
        // console.log(this.state.tableData)
      })
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
        <Table bordered columns={this.state.tableColumns} dataSource={this.state.tableData} />
      </div>
    )
  }
}
