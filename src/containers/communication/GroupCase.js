import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'                           // 用来连接redux中reducer中全局数据的
import { Divider, Button,Empty,Input,Modal,Select,Icon,message } from 'antd'
import Group from '../../components/communication/Group'                 // 引用的ui组件
import { addGroup, updateGroup, listGroup, findAllDeptInfo, findUserByDept } from '../../api/call'
import styled from 'styled-components'
const Search = Input.Search
const Option = Select.Option
const ModalWrap = styled.div `
.modal-item {
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  .modal-txt {
    width: 90px;
  }
  .taglist {
    width: 360px;
    .tags {
      box-sizing: border-box;
      color: rgba(0, 0, 0, 0.65);
      font-size: 14px;
      display: inline-block;
      margin-right: 8px;
      margin-bottom: 6px;
      padding: 0 7px;
      font-size: 12px;
      line-height: 20px;
      background: #fafafa;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
    }
  }
}
`
const BaseCommunicationBox = styled.div `
.filter-box{
  display: flex;
  align-items: center;
  padding-bottom: 8px;
  .rt-box-title {
    width: 90px;
  }
}
.address-box{
  height: 357px;
  overflow: auto;
  .address-item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #eee;
  }
}
`
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
          render: (text) => (
            <span>
              <Button type='primary' onClick={(text) => this.toEditGroup()}>修改</Button>
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
      },
      secUserlist: [], // 选择的列表
      newGroupName: '',
      groupId: '' // 选择修改的群组id
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
  // 修改按钮
  toEditGroup = (id) => {
    console.log(11,id)
  }
  // 弹窗取消
  handleCancelAdd = () => {
    this.setState({
      addGroupModal: false
    })
  }
  // 弹窗确认
  handleConfrimAdd = () => {
    if(this.state.newGroupName === ''){
      message.error('请输入群组名');
      return false
    }
    if(this.state.secUserlist.length === 0){
      message.error('请选择群组成员');
      return false
    }
    let ids = []
    this.state.secUserlist.forEach((item,index) => {
      ids.push(item.userId)
    })
    console.log(this.state.newGroupName)
    console.log(ids)
    let postParams = null
    if(this.state.groupId !== '') { // 编辑
      postParams = {
        ids:ids,
        groupId: this.state.groupId,
        groupName:this.state.newGroupName
      }
      this.updateGroupOfOne(postParams)
    } else { // 新增
      postParams = {
        ids:ids,
        groupName:this.state.newGroupName
      }
      this.postGropAdd(postParams)
    }
  }
  // 新增群组的接口
  postGropAdd = async(params) => {
    try {
      const {data} = await addGroup(params)
      console.log('新增是否成功？',data)
    } catch (error) {
      console.log(error)
    }
  }
  // 更新某个分组
  updateGroupOfOne = async(params) => {
    try {
      const {data} = await updateGroup(params)
      console.log('更新是否成功？',data)
    } catch (error) {
      console.log(error)
    }
  }
  // 得到部门
  getAllDeptInfo = async() => {
    try {
      const {data} = await findAllDeptInfo()
      this.setState({
        callOutAllDept: data.content
      })
    } catch (error) {
      console.log(error)
    }
  }
  // 通讯录
  getCallBook = async() =>{
    const {deptParams,secUserlist} = this.state
    try {
      const {data} = await findUserByDept(deptParams)
      data.content.forEach((item)=>{
        let hasit = secUserlist.find((itemfind) => {
          return item.userId === itemfind.userId
        })
        if(hasit === undefined) {
          item.isSec = false  // 没选择
        } else {
          item.isSec = true
        }
      })
      this.setState({
        callOutBook: data.content
      })
    } catch (error) {
      console.log(error)
    }
  }
  // 通讯群组
  getListGroup = async() =>{
    try {
      const {data} = await listGroup(this.searchParams)
      let grouplist = data.content.list
      grouplist.forEach((item,index)=>{
        item.key = index
      })
      this.setState({
        tableData: grouplist
      })
    } catch (error) {
      console.log(error)
    }
  }
  // 部门选择
  handleSelectChange = (value) => {
    console.log(`selected ${value}`);
    const {deptParams} = this.state
    this.setState({
      deptParams: {...deptParams, deptNo: value}
      // activeDept: value
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
  // 选择通讯录人员加入群组
  clickToSec = (index) => {
    let {callOutBook,secUserlist} = this.state
    callOutBook[index].isSec = !callOutBook[index].isSec
    callOutBook.forEach((item,idx)=>{
      let hasit = secUserlist.find((itemfind) => {
        return item.userId === itemfind.userId
      })
      if(hasit === undefined && item.isSec) { // 如果原本里面没有,但是现在选中了，就push
        secUserlist.push(item)
      }
      if(hasit !== undefined && !item.isSec) { // 如果里面存在，但是现在取消选择了，就要从里面删掉  
        let indexfind = secUserlist.findIndex(itemfind => {
          return item.userId === itemfind.userId
        })
        secUserlist.splice(indexfind ,1)
      }
    })
    this.setState({
      callOutBook: callOutBook,
      secUserlist : secUserlist
    })
  }
  // tag 标签的删除
  delSeclist = (item,index) => {
    console.log('index==',index)
    let {callOutBook,secUserlist} = this.state
    let hasit = callOutBook.find((itemfind) => {
      return item.userId === itemfind.userId
    })
    if(hasit !== undefined) { 
      // 如果当前通讯列表中存在它，修改那一条选中状态标记，再把已选列表里面那条删除
      let indexfind = callOutBook.findIndex(itemfind => {
        return item.userId === itemfind.userId
      })
      callOutBook[indexfind].isSec = false
      secUserlist.splice(index,1)
    } else {
      // 如果当前通讯列表中没它 表示搜索了或者筛选部门了，直接把已选列表里面那条删除
      secUserlist.splice(index,1)
    }
    console.log('996==',secUserlist)
    this.setState({
      callOutBook:callOutBook,
      secUserlist:secUserlist
    })
  }
  // 输入框
  handleInputVal = (e) => {
    this.searchParams.keyword = e.target.value
  }
  // 新增的群组名
  handleNewGroup = (e) => {
    this.setState({
      newGroupName: e.target.value 
    })
  }
  clickSearch= ()=>{
    console.log('searchParams=',this.searchParams)
  }
  render() {
    let {tableColumns,tableData,addGroupModal,callOutBook,callOutAllDept,secUserlist,newGroupName} = this.state
    return (
      <div>
        <Group 
          data = {{
            tableData,
            tableColumns
          }}
          event = {{
            handleInputVal: this.handleInputVal,
            clickSearch:this.clickSearch,
            handleConfrimAdd: this.handleConfrimAdd,
            handleCancelAdd: this.handleCancelAdd,
            clickAdd: this.clickAdd
          }}
        ></Group>
        <Modal
          title="新增通讯群组"
          visible={addGroupModal}
          onOk={this.handleConfrimAdd}
          onCancel={this.handleCancelAdd}
          cancelText="取消"
          okText="确定"
        > 
          <ModalWrap>
            <div className='modal-item'>
              <div className='modal-txt'>群组名：</div>
              <div>
                <Input value={newGroupName} onChange={(e) => this.handleNewGroup(e)}  style={{width:'360px'}}/> 
              </div>
            </div>
            <div className='modal-item'>
              <div className='modal-txt'>已选择成员：</div>
              <div className='taglist'>
              {
                secUserlist.map((item,index)=>{
                  return (
                    <span className='tags' key={index}>
                      {item.userName}
                      <Icon type="close" onClick={() => this.delSeclist(item,index)} style={{backgroundGround:'#cacaca',marginLeft:'4px'}}/>
                    </span>
                  )
                })
              }
              {!secUserlist.length && <span style={{display:'inline-block' ,marginBottom:'7px'}}>无</span>}
              </div>
            </div>
            <BaseCommunicationBox>
              <div className="filter-box">
                <div className='rt-box-title'>查询通讯录：</div>
                <Select 
                  placeholder="请选择部门"
                  allowClear
                  style={{ width: 150 }} 
                  onChange={ this.handleSelectChange }
                >
                  {callOutAllDept.map((item)=>{
                    return(
                      <Option key={item.deptNo} value={item.deptNo}>{item.deptName}</Option>
                    )
                  })}
                </Select>
                <Search
                  placeholder="关键字搜索"
                  onSearch={this.searchBykeyWord}
                  style={{ width: 150,marginLeft:'20px'}}
                />
              </div>
              <div className='address-box'>
                { callOutBook.map((item, index)=>{
                  return (
                    <div className="address-item" style={{cursor:'pointer'}} key={index} onClick={() => this.clickToSec(index)}>
                      <div><span className='right-divider'>{item.userName}</span></div>
                      <div>
                        {
                          item.isSec ? <Icon type="check-circle" theme="twoTone" twoToneColor="#40a9ff"/> :
                          <Icon type="check-circle" theme="twoTone" twoToneColor="#cacaca"/>
                        }
                      </div>
                    </div>
                  )
                  })
                }
                {!callOutBook.length && <Empty style={{marginTop: '100px' }} image={Empty.PRESENTED_IMAGE_SIMPLE}/>}
              </div>
            </BaseCommunicationBox>
          </ModalWrap>
        </Modal>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({                  // owProps 是这个容器组件接收的props值，因为在处理时可能要用到他
})
const mapDispatchToProps = (dispatch) => ({            // 引用全局actions中定义方法
})
export default connect(mapStateToProps, mapDispatchToProps)(GroupCase)
