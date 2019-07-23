import React from 'react';
import PropTypes from 'prop-types'


import { Button, Card, Input, Modal, Table } from 'antd' 

import styled from 'styled-components'

import color from '../../utils/color'
import config from '../../utils/config'


const Search = Input.Search;
function Console({data,event}) {
  const {mobile,callDate,answerDate,hangupDate,callDuration } = data.commationInfomation
  const ConsoleBox = styled.div `
    display: flex;
    .call-info{
      width: 25%;
      border-radius: 5px;
      height: 100%;
      .phone{
        text-align: center;
        font-size: 16px;
        margin: 30px 0;
      }
      .timer {
        text-align: center;
        font-size: 22px;
        margin: 30px 0;
        color: ${color.$primary};
        font-weight: bold;
      }
      .call-history{
        text-align: center;
        margin-bottom: 50px;
        .text{
          color: ${color.$content};
          margin-right: 5px;
        }
      }
    }
  `
  const RtBox = styled.div `
    flex: 1;
    display: flex;
    flex-direction: column;
    .train-info{
      border-radius: 5px;
      margin-left: ${config.CONTENT_PADDING + 'px'};
      .view{
        display: flex;
        flex-wrap: wrap;
        .view-item{
          width: 33.3333%;
          margin: 8px 0;
        }
      }
    }
    .search-card {
      border-radius: 5px;
      margin: ${config.CONTENT_PADDING + 'px'};
      margin-right:0;
      .search-box{
        display: flex;
        .search-input{
          margin-right: 20px;
        }
      }
    }
    .video-card{
      border-radius: 5px;
      margin-left: ${config.CONTENT_PADDING + 'px'};
      flex: 1;
    }
  `
  const Title = styled.div `
    font-weight: bold;
    font-size: 14px;
    color: ${color.$desc};
    margin-bottom: 20px;
  `
  const Timer = styled.div`
    margin: 40px 0;
  `
  const Bold = styled.span `
    font-weight: bold;
    margin-left: 5px;
  `
  return (
    <ConsoleBox style={{height: '100%'}}>
      <Card  hoverable  className='call-info'>
        <Title>当前通话概况</Title>
        <div className='phone'>{mobile}</div>
        <div className='timer'>{data.timer}</div>
        <div className='call-history'><Button type="link" onClick={()=>{event.historyShowEvent()}}> <span className='text'>通话历史（{data.callHistoryLength}）</span>  点击查看</Button></div>
        <Title>来电详情</Title>
        <Timer>来电时间：{callDate}</Timer>  
        <Timer>接听时间：{answerDate}</Timer>  
        <Timer>挂断时间：{hangupDate}</Timer>  
        <Timer>通话时长：{callDuration}</Timer>  
      </Card>
      <RtBox>
        <Card hoverable className='train-info'>
          <Title>来电车次信息</Title>
          <div className="view">
            {data.trainData.map((item)=>{
              return (
                <div className="view-item" 
                  key={item.id} 
                  style={{color: item.event ? color.$primary : ''}} 
                  onClick={()=>{item.event && event[item.event](data.trainValueInfo[item.id], item.id)}}
                >
                  {item.name}: <Bold>{data.trainValueInfo[item.id]}</Bold>   
                </div>
              )
            })}
          </div>
        </Card>
        {/* 这版本不上 */}
        {/* <Card hoverable className='search-card'>
          <div className="search-box">
            <Search placeholder="看板查询" className='search-input' onSearch={value => console.log(value)} enterButton />
            <Search placeholder="通讯录查询" onSearch={value => console.log(value)} enterButton />
          </div>
        </Card>
        <Card hoverable className='video-card'>
         
        </Card> */}
      </RtBox>
    </ConsoleBox>
  );
}
Console.propTypes = {
  // menuData: PropTypes.array.isRequired,
}
export default Console;