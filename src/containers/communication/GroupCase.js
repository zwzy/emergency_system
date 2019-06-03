import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'                           // 用来连接redux中reducer中全局数据的
import { Divider, Button,Empty,Input,Table,Modal,Tag,Select } from 'antd'
import Group from '../../components/communication/Group'                 // 引用的ui组件
import { addGroup, updateGroup, listGroup, findAllDeptInfo, findUserByDept } from '../../api/call'
import styled from 'styled-components'
const Search = Input.Search
const Option = Select.Option
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
      let grouplist = data.content.list
      grouplist.forEach((item,index)=>{
        item.key = index
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
  // 输入框
  handleInputVal = (e) => {
    this.searchParams.keyword = e.target.value
  }
  clickSearch= ()=>{
    console.log('searchParams=',this.searchParams)
  }
  render() {
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
    let {tableColumns,tableData,addGroupModal,callOutBook,callOutAllDept} = this.state
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
                <Input onChange={(e) => this.handleInputVal(e)}  style={{width:'360px'}}/> 
              </div>
            </div>
            <div className='modal-item'>
              <div className='modal-txt'>已选择成员：</div>
              <div className='taglist'>
                <Tag style={{marginBottom:'6px'}} closable>Tag 2</Tag>
                <Tag style={{marginBottom:'6px'}} closable>Tag 2</Tag>
                <Tag style={{marginBottom:'6px'}} closable>Tag 2</Tag>
                <Tag style={{marginBottom:'6px'}} closable>Tag 2</Tag>
              </div>
            </div>
            <BaseCommunicationBox>
              <div className="filter-box">
                <div className='rt-box-title'>查询通讯录：</div>
                <Select 
                  placeholder="请选择部门"
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
                    <div className="address-item" key={index}>
                      <div><span className='right-divider'>{item.userName}</span></div>
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
