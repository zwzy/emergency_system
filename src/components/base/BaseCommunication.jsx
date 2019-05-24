
// 单人通讯录

import React from 'react';
import PropTypes from 'prop-types'

import { Button, Select, Input } from 'antd' 

import styled from 'styled-components'
const Search = Input.Search
const Option = Select.Option


function BaseCommunication({callHistoryData, handleSelectChange}) {
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
  return (
    <BaseCommunicationBox>
         <div className='rt-box-title'>通讯录</div>
          <div className="filter-box">
          <Select 
            placeholder="请选择部门"
            style={{ width: 150 }} 
            onChange={ handleSelectChange }>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
            </Select>
          <Search
            placeholder="关键字搜索"
            onSearch={value => console.log(value)}
            style={{ width: 150 }}
          />
          </div>
          <div className='address-box'>
          { callHistoryData.map((item, index)=>{
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
  );
}
BaseCommunication.propTypes = {
  // menuData: PropTypes.array.isRequired,
}
export default BaseCommunication;
