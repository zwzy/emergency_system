import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'                           // 用来连接redux中reducer中全局数据的
import {  Table, Modal, Button, message, Input } from 'antd'
import styled from 'styled-components'

import {getIpBindList, createIpBindExtNum , updateIpBindExtNum, deleteIpBindExtNum} from '../../api/user'
// import CallRecords from '../../components/emergency/CallRecords'                 // 引用的ui组件
const CallRecordsBox = styled.div`
`
export class BindAnoIp extends Component {
  static propTypes = {
    // prop: PropTypes
  }
  constructor(props) {
    super(props)
    this.state = {
      callRecordsColumns: [
        {
          title: 'ip',
          dataIndex: 'ip',
        },
        {
          title: '分机号',
          dataIndex: 'extNum',
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
        },
        {
          title: '修改时间',
          dataIndex: 'modifyTime',
        },
        {
          title: '操作',
          render: (text, record) => (
            <span>
              <Button type='link'  onClick={
                () => {
                  this.showUpdateModal(record.id, record.ip, record.extNum)
                }
              }
              >修改</Button>
               <Button type='link'  onClick={
                () => {
                  this.delbindIpClick(record.id)
                }
              }
              >删除</Button>
            </span>
          ),
        }
      ],
      ipBindList: [
      ],
      pagination: {
        current: 1,
        pageSize: 10,
        total: 1,
      },
      loading: false,
      isShowCreateModal: false,
      isShowUpdateModal: false,
      params: {
        ip: '',
        extNum: ''
      },
      updateParams: {
        ip: '',
        extNum: '',
        id: ''
      }
    }
  }
  componentDidMount() {
    this.getIpBindData()
  }
  promiseApi = ({ pageNum, pageSize }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = [
          {
            ip: pageNum + 'John Brown' + 0,
            id: pageNum + 'John Brown' + 0,
            extNum: '张三',
            createTime: '2019-08-09 12:23:30',
            modifyTime: '2019-08-09 12:20:30'
          },
          {
            ip: pageNum + 'John Brown' + 1,
            id: pageNum + 'John Brown' + 1,
            extNum: '张三',
            createTime: '2019-08-09 12:23:30',
            modifyTime: '2019-08-09 12:20:30'
          },
          {
            ip: pageNum + 'John Brown' + 2,
            id: pageNum + 'John Brown' + 2,
            extNum: '张三',
            createTime: '2019-08-09 12:23:30',
            modifyTime: '2019-08-09 12:20:30'
          },
          {
            ip: pageNum + 'John Brown' + 3,
            id: pageNum + 'John Brown' + 3,
            extNum: '张三',
            createTime: '2019-08-09 12:23:30',
            modifyTime: '2019-08-09 12:20:30'
          },
          {
            ip: pageNum + 'John Brown' + 4,
            id: pageNum + 'John Brown' + 4,
            extNum: '张三',
            createTime: '2019-08-09 12:23:30',
            modifyTime: '2019-08-09 12:20:30'
          },
          {
            ip: pageNum + 'John Brown' + 5,
            id: pageNum + 'John Brown' + 5,
            extNum: '张三',
            createTime: '2019-08-09 12:23:30',
            modifyTime: '2019-08-09 12:20:30'
          },
          {
            ip: pageNum + 'John Brown' + 6,
            id: pageNum + 'John Brown' + 6,
            extNum: '张三',
            createTime: '2019-08-09 12:23:30',
            modifyTime: '2019-08-09 12:20:30'
          },
          {
            ip: pageNum + 'John Brown' + 7,
            id: pageNum + 'John Brown' + 7,
            extNum: '张三',
            createTime: '2019-08-09 12:23:30',
            modifyTime: '2019-08-09 12:20:30'
          },
          {
            ip: pageNum + 'John Brown' + 8,
            id: pageNum + 'John Brown' + 8,
            extNum: '张三',
            createTime: '2019-08-09 12:23:30',
            modifyTime: '2019-08-09 12:20:30'
          }, {
            ip: pageNum + 'John Brown' + 9,
            id: pageNum + 'John Brown' + 9,
            extNum: '张三',
            createTime: '2019-08-09 12:23:30',
            modifyTime: '2019-08-09 12:20:30'
          }
        ]
        const obj = {
          data: {
            content: {
              endRow: 1,
              firstPage: 1,
              hasNextPage: true,
              hasPreviousPage: false,
              isFirstPage: true,
              isLastPage: false,
              lastPage: 8,
              list: data.slice(0, pageSize),
              navigatePages: 8,
              navigatepageNums: [1, 2, 3, 4, 5, 6, 7, 8],
              nextPage: 0,
              pageNum: 1,
              pageSize: 10,
              pages: 1,
              prePage: 0,
              size: 2,
              startRow: 0,
              total: 100
            },
            code: 0
          }
        }
        resolve(obj)
      }, 2000)
    })
  }

  getIpBindData = async () => {
   
    const { current: pageNum, pageSize } = this.state.pagination
    const params = { pageNum, pageSize, ip: '', extNum: '' }
    try {
      this.setState({
        loading: true
      })
      const { data } = await getIpBindList(params)
      // const {data}  = await this.promiseApi(params)
      if (data.code === 0) {
        const pagination = { ...this.state.pagination, total: data.content.total };
        this.setState({
          ipBindList: data.content.list,
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
 
  handleTableChange = (pagination) => {
    console.log(pagination)
    this.setState({
      pagination
    }, () => {
      this.getIpBindData()
    })
  }

  showCreateBindIP = () => {
    this.setState({
      isShowCreateModal: !this.state.isShowCreateModal
    })
  }
  delbindIpClick = (id) => {
    Modal.confirm({
      title: '删除',
      content: '确定删除该IP绑定信息？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        try {
          const {data} = await deleteIpBindExtNum({id})
          if(data.code === 0) {
            message.success(data.message)
            this.getIpBindData()
          } else {
            message.error(data.message)
          }
        } catch (error) {
          message.error('接口故障')
        }
      },
      onCancel: () => {
        message.info('你取消了此操作')
      }
    });
  }
  showUpdateModal = ( id= '', ip = '', extNum = '')=>{
    this.setState({
      isShowUpdateModal: !this.state.isShowUpdateModal
    }, ()=>{
      const {isShowUpdateModal} = this.state 
      if(isShowUpdateModal) {
        this.setState({
          updateParams:{
            ...this.state.updateParams, id, ip, extNum
          }
        })
      }
    })
  }

  updateParams = ({ currentTarget: { value } }, type, isCreate = true) => {
    if(isCreate) {
      this.setState({
        params: {...this.state.params, [type]: value}
      }, ()=>{
        console.log(this.state.params)
      })
    } else {
      this.setState({
        updateParams: {...this.state.updateParams, [type]: value}
      }, ()=>{
        console.log(this.state.updateParams)
      })
    }
  }
  handleSubmit= async () =>{
    const {params} = this.state
    try {
      const {data} = await createIpBindExtNum(params)
      // const data = {
      //   code:0,
      //   message: '插入成功'
      // }
      if(data.code === 0) {
        message.success(data.message)
        this.showCreateBindIP()
        this.getIpBindData()
      } else {
        message.error(data.message)
      }
    } catch (error) {
      message.error('接口故障，请重试！')
    }
  }
  handleSubmitUpdateIpBind = async() => {
    const {updateParams} = this.state
    try {
      const {data} = await updateIpBindExtNum(updateParams)
      // const data = {
      //   code:0,
      //   message: '更新成功'
      // }
      if(data.code === 0) {
        message.success(data.message)
        this.showUpdateModal()
        this.getIpBindData()
      } else {
        message.error(data.message)
      }
    } catch (error) {
      message.error('接口故障，请重试！')
    }
  }
  render() {
    const { ipBindList, pagination, loading, callRecordsColumns } = this.state
    return (
      <div>
        <Button type='primary' style={{marginBottom: '10px'}} onClick={()=>this.showCreateBindIP()}>新建</Button>
        <CallRecordsBox>
          <Table rowKey={record => record.id} loading={loading} bordered columns={callRecordsColumns} onChange={this.handleTableChange} pagination={pagination} dataSource={ipBindList}
          />
        </CallRecordsBox>
        <Modal
          title="新增IP"
          visible={this.state.isShowCreateModal}
          onCancel={this.showCreateBindIP}
          footer={[
            <Button key="submit" type='primary' block onClick={()=>this.handleSubmit()}>
              确定
            </Button>,
          ]}
        >
         <Input placeholder='请输入IP' style={{marginBottom: '10px'}} onChange={(e)=>{this.updateParams(e, 'ip')}}></Input>
         <Input placeholder='请输入分机号' onChange={(e)=>{this.updateParams(e, 'extNum')}}></Input>
        </Modal>
        <Modal
          title="修改IP"
          visible={this.state.isShowUpdateModal}
          onCancel={this.showUpdateModal}
          footer={[
            <Button key="submit" type='primary' block onClick={()=>this.handleSubmitUpdateIpBind()}>
              确定
            </Button>,
          ]}
        >
         <Input placeholder='请输入IP' value={this.state.updateParams.ip} style={{marginBottom: '10px'}} onChange={(e)=>{this.updateParams(e, 'ip', false)}}></Input>
         <Input placeholder='请输入分机号' value={this.state.updateParams.extNum} onChange={(e)=>{this.updateParams(e, 'extNum', false)}}></Input>
        </Modal>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({                  // owProps 是这个容器组件接收的props值，因为在处理时可能要用到他
})
const mapDispatchToProps = (dispatch) => ({            // 引用全局actions中定义方法
})
export default connect(mapStateToProps, mapDispatchToProps)(BindAnoIp)
