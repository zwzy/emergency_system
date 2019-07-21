
// 单人通讯录
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {findAllDeptInfo, findUserByDept, callRecord } from '../../api/call'
import {callOutPhone} from '../../utils/umo'

import { Button, Select, Input, Empty } from 'antd' 
import styled from 'styled-components'
const Search = Input.Search
const Option = Select.Option
const BaseCommunicationBox = styled.div `
   .rt-box-title{
      font-weight: bold;
      color: #333;
      padding-bottom: 10px;
    }
    .filter-box{
      display: flex;
      padding-right: 20px;
      padding-bottom: 8px;
      justify-content: space-between;
    }
    .address-box{
      height: 357px;
      padding-right: 20px;
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
const CallOutBox = styled.div`
  display: flex;
  justify-content: space-between;
  .lf-box{
    width: 50%;
    border-right: 1px solid #eee;
    padding: 0 20px;
    box-sizing: border-box;
    .lf-box-title{
      font-weight: bold;
      color: #333;
      padding-bottom: 10px;
    }
    .history-box{
      padding-right: 20px;
      height: 400px;
      overflow: auto;
    }
    .callout-item{
      padding: 10px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #eee;
      .desc{
        color: #999;
        font-size: 12px;
      }
    }
  }
  .rt-box{
    width: 50%;
    padding: 0 20px;
    box-sizing: border-box;
    overflow: auto;
  }
  `
export default class BaseCallOutModal extends Component {
  static propTypes = {
    // prop: PropTypes
  }
  constructor(props) {
    super(props)
    this.timer = null
    this.state = {
      callOutAllDept: [],
      deptParams: {
        deptNo: '',
        keyword: ''
      },
      callOutBook: [],
      callOutHistoryCall: [
      ]
    }
  }
  componentWillReceiveProps(props) {
    if(!props.callOutIsShow) {
      clearTimeout(this.timer)
    }
  }
  componentDidMount() {
    this.getCallBook()
    this.getAllDeptInfo()
    this.getHandUpCallRecord()
  }
  // 得到顺利挂断记录
  getHandUpCallRecord = async() => {
    try {
      const {data} = await callRecord({callStatus: 'CALL_HANGUP'})
      if(data.code === 0) {
        this.setState({
          callOutHistoryCall: data.content
        })
      }
      this.timer = setTimeout(()=>{this.getHandUpCallRecord()}, 5000)
    } catch (error) {
      console.log(error)
    }
  }
  getCallBook = async() =>{
    const {deptParams} = this.state
    try {
      const {data} = await findUserByDept(deptParams)
      if(data.content.length> 100) {
        this.setState({
          callOutBook: data.content.slice(0, 100)
        })
      } else {
        this.setState({
          callOutBook: data.content
        })
      }
      
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
  searchBykeyWord = (key) => {
    const {deptParams} = this.state
    this.setState({
      deptParams: {...deptParams, keyword: key}
    }, ()=>{
      this.getCallBook()
    })
  }
  
  render() {
    const {callOutAllDept, callOutBook, callOutHistoryCall} = this.state
    return (
      <CallOutBox>
        <div className="lf-box">
          <div className='lf-box-title'>历史通话记录</div>
          <div className='history-box'>
          {callOutHistoryCall.map((item, index)=>{
            return (
              <div className="callout-item" key={index}>
                <div className="lf-item">
                    <div><span className='right-divider'>{item.name}</span> <span>{item.mobile}</span></div>
                    <div className='desc'><span className='right-divider'>{item.callDate}</span> <span>{item.timeLong}</span></div>
                </div>
                <div className="rt-item">
                  <Button type="primary" shape="circle" icon="phone" onClick={() => callOutPhone({phoneNumber: item.mobile, uud: '4555', gid: '@0'})} />
                </div>
              </div>
            )
            })
          }
          {!callOutHistoryCall.length && <Empty style={{marginTop: '140px' }} image={Empty.PRESENTED_IMAGE_SIMPLE}/>}
          </div>
        </div>
        <div className="rt-box">
        <BaseCommunicationBox>
          <div className='rt-box-title'>通讯录</div>
            <div className="filter-box">
            <Select 
              placeholder="请选择部门"
              style={{ width: 150 }} 
              onChange={ this.handleSelectChange }>
                {callOutAllDept.map((item)=>{
                  return(
                    <Option key={item.deptNo} value={item.deptNo}>{item.deptName}</Option>
                  )
                })}
              </Select>
            <Search
              placeholder="关键字搜索"
              onSearch={this.searchBykeyWord}
              style={{ width: 150 }}
            />
            </div>
            <div className='address-box'>
            { callOutBook.map((item, index)=>{
              return (
                <div className="address-item" key={index}>
                  <div><span className='right-divider'>{item.userName}</span></div>
                  <div><span className='right-divider'>{item.deptName}</span></div>
                  <div><span className='right-divider'>{item.mobile}</span></div>
                  <Button type="primary" shape="circle" icon="phone"  onClick={() => callOutPhone({phoneNumber: item.mobile, uud: '4555', gid: '@0'})} />
                </div>
              )
              })
            }
            {!callOutBook.length && <Empty style={{marginTop: '100px' }} image={Empty.PRESENTED_IMAGE_SIMPLE}/>}
          </div>
        </BaseCommunicationBox>
      </div>
     </CallOutBox>  
    )
  }
}

