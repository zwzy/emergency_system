
// 单人通讯录
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {findAllDeptInfo, findUserByDept } from '../../api/call'

import { Button, Select, Input } from 'antd' 
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
export default class BaseCommunication extends Component {
  static propTypes = {
    // prop: PropTypes
  }
  constructor(props) {
    super(props)
   
    this.state = {
      callOutAllDept: [],
      deptParams: {
        deptNo: '',
        keyword: ''
      },
      callOutBook: [],
    }
  }
  componentDidMount() {
    this.getCallBook()
    this.getAllDeptInfo()
  }
  getCallBook = async() =>{
    const {deptParams} = this.state
    try {
      const {data} = await findUserByDept(deptParams)
      console.log(data)
      this.setState({
        callOutBook: data.content
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  // 得到部门
  getAllDeptInfo = async() => {
    try {
      const {data} = await findAllDeptInfo()
      console.log(data)
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
    const {callOutAllDept, callOutBook} = this.state
    return (
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
                <div><span className='right-divider'>{item.work}</span></div>
                <Button type="primary" shape="circle" icon="phone" />
              </div>
            )
            })
          }
          </div>
    </BaseCommunicationBox>
    )
  }
}

