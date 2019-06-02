import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'                           // 用来连接redux中reducer中全局数据的
import { Divider, Button,Empty } from 'antd'
import Group from '../../components/communication/Group'                 // 引用的ui组件
import { addGroup, updateGroup, listGroup, findAllDeptInfo, findUserByDept } from '../../api/call'

export class GroupCase extends Component {
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
          title: '群组名',
          dataIndex: 'groupName',
        },
        {
          title: '群组成员',
          dataIndex: 'userNames',
          render: (text,record) => (
            <div>
              {
                text.map((item, itemIndex) => {
                  return (
                    <span key={itemIndex}>{itemIndex === text.length-1 ? item : item + '、'}</span>
                  )
                })
              }
              {!text.length && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>}
            </div>
          )
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
      tableData:[],
      addGroupModal: false, // 弹窗
      callOutBook: [],
      callOutAllDept: [], // 部门
      deptParams: {
        deptNo: '',
        keyword: ''
      }
    }
  }
  componentDidMount(){
    this.getListGroup()
    this.getAllDeptInfo()
    this.getCallBook()
  }
  // 新增按钮
  clickAdd = () => {
    this.setState({
      addGroupModal: true
    })
  }
  // 弹窗取消
  handleCancelAdd = () => {
    this.setState({
      addGroupModal: false
    })
  }
  // 弹窗确认
  handleConfrimAdd = () => {

  }
  // 得到部门
  getAllDeptInfo = async() => {
    try {
      const {data} = await findAllDeptInfo()
      this.setState({
        callOutAllDept: data.content
      })
    } catch (error) {
    }
  }
  // 通讯录
  getCallBook = async() =>{
    const {deptParams} = this.state
    try {
      const {data} = await findUserByDept(deptParams)
      this.setState({
        callOutBook: data.content
      })
    } catch (error) {
      throw new Error(error)
    }
  }
  // 通讯群组
  getListGroup = async() =>{
    try {
      const {data} = await listGroup(this.searchParams)
      console.log('getListGroup==',data)
      let grouplist = data.content.list
      grouplist.forEach((item,index)=>{
        item.username = ''
      })
      this.setState({
        tableData: grouplist
      })
    } catch (error) {
      throw new Error(error)
    }
  }
  // 部门选择
  handleSelectChange = (value) => {
    console.log(`selected ${value}`);
    const {deptParams} = this.state
    this.setState({
      deptParams: {...deptParams, deptNo: value},
      activeDept: value
    }, ()=>{
      this.getCallBook()
    })
  }
  // 通讯录关键字搜索
  searchBykeyWord = (key) => {
    const {deptParams} = this.state
    this.setState({
      deptParams: {...deptParams, keyword: key}
    }, ()=>{
      this.getCallBook()
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
    let {tableColumns,tableData,addGroupModal,callOutBook,callOutAllDept,deptParams} = this.state
    return (
      <div>
        <Group 
          data = {{
            tableData,
            tableColumns,
            addGroupModal,
            callOutBook,
            callOutAllDept,
            deptParams
          }}
          event = {{
            handleInputVal: this.handleInputVal,
            clickSearch:this.clickSearch,
            handleConfrimAdd: this.handleConfrimAdd,
            handleCancelAdd: this.handleCancelAdd,
            clickAdd: this.clickAdd,
            searchBykeyWord: this.searchBykeyWord,
            handleSelectChange: this.handleSelectChange,
            getCallBook: this.getCallBook,
            getAllDeptInfo: this.getAllDeptInfo
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
export default connect(mapStateToProps, mapDispatchToProps)(GroupCase)
