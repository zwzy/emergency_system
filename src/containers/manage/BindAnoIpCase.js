import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'                           // 用来连接redux中reducer中全局数据的
import {  Table, Button, message, Row, Col, Input } from 'antd'
import styled from 'styled-components'

import {getIpBindList } from '../../api/user'
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
            extNum: '张三',
            createTime: '2019-08-09 12:23:30',
            modifyTime: '2019-08-09 12:20:30'
          },
          {
            ip: pageNum + 'John Brown' + 1,
            extNum: '张三',
            createTime: '2019-08-09 12:23:30',
            modifyTime: '2019-08-09 12:20:30'
          },
          {
            ip: pageNum + 'John Brown' + 2,
            extNum: '张三',
            createTime: '2019-08-09 12:23:30',
            modifyTime: '2019-08-09 12:20:30'
          },
          {
            ip: pageNum + 'John Brown' + 3,
            extNum: '张三',
            createTime: '2019-08-09 12:23:30',
            modifyTime: '2019-08-09 12:20:30'
          },
          {
            ip: pageNum + 'John Brown' + 4,
            extNum: '张三',
            createTime: '2019-08-09 12:23:30',
            modifyTime: '2019-08-09 12:20:30'
          },
          {
            ip: pageNum + 'John Brown' + 5,
            extNum: '张三',
            createTime: '2019-08-09 12:23:30',
            modifyTime: '2019-08-09 12:20:30'
          },
          {
            ip: pageNum + 'John Brown' + 6,
            extNum: '张三',
            createTime: '2019-08-09 12:23:30',
            modifyTime: '2019-08-09 12:20:30'
          },
          {
            ip: pageNum + 'John Brown' + 7,
            extNum: '张三',
            createTime: '2019-08-09 12:23:30',
            modifyTime: '2019-08-09 12:20:30'
          },
          {
            ip: pageNum + 'John Brown' + 8,
            extNum: '张三',
            createTime: '2019-08-09 12:23:30',
            modifyTime: '2019-08-09 12:20:30'
          }, {
            ip: pageNum + 'John Brown' + 9,
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
  render() {
    const { ipBindList, pagination, loading, callRecordsColumns } = this.state
    return (
      <div>
        <CallRecordsBox>
          <Table rowKey={record => record.recordId} loading={loading} bordered columns={callRecordsColumns} onChange={this.handleTableChange} pagination={pagination} dataSource={ipBindList}
          />
        </CallRecordsBox>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({                  // owProps 是这个容器组件接收的props值，因为在处理时可能要用到他
})
const mapDispatchToProps = (dispatch) => ({            // 引用全局actions中定义方法
})
export default connect(mapStateToProps, mapDispatchToProps)(BindAnoIp)
