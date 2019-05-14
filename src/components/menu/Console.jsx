import React from 'react';
import PropTypes from 'prop-types'


import { Button, Card } from 'antd' 

import styled from 'styled-components'

import color from '../../utils/color'
import config from '../../utils/config'



function Console({username, userphone, handeleClick}) {
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
        .lf{
          color: ${color.$content}
          margin-right: 5px;
        }
      }
    }
    .train-info{
      flex: 1;
      border-radius: 5px;
      margin-left: ${config.CONTENT_PADDING + 'px'}
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
  return (
    <ConsoleBox style={{height: '100%'}}> 
      <Card  hoverable  className='call-info'>
        <Title>当前通话概况</Title>
        <div className='phone'>18755489161</div>
        <div className='timer'>05:23:00</div>
        <div className='call-history'><Button type="link"> <span class='lf'>通话历史（9）</span>  点击查看</Button></div>
        <Title>来电详情</Title>
        <Timer>来电时间：2019-03-11 17:14:28</Timer>  
        <Timer>接听时间：2019-03-11 17:14:28</Timer>  
        <Timer>挂断时间：-------------------</Timer>  
        <Timer>通话时长：05：04： 31</Timer>  
      </Card>
      <Card className='train-info'>
      </Card>  
    </ConsoleBox>
  );
}
Console.propTypes = {
  // menuData: PropTypes.array.isRequired,
}
export default Console;