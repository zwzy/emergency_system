import React from 'react';
import PropTypes from 'prop-types'

import { Button,Input } from 'antd' 

import styled from 'styled-components'
import color from '../../utils/color'



function DutyPlan({username, userphone, handeleClick}) {
  const DutyPlanBox = styled.div `
    ul li {
      list-style:none;
    }
    .title {
      color: rgba(42, 130, 228, 1);
	    font-size: 20px;
    }
    .input-ul {
      overflow:hidden;
      width: 800px;
      margin-top: 20px;
      margin-bottom: 29px;
      li {
        float:left;
        margin: 29px 46px 0 0;
        .input-tit {
          display:inline-block;
          width: 80px;
          margin-right: 12px;
        }
      }
    }
  `
  return (
    <DutyPlanBox>
      <div className="title">新建值班计划</div>
      <ul className='input-ul'>
        <li>
          <span className='input-tit'>部门:</span>
          <Input style={{width:'188px'}}/>
        </li>
        <li>
          <span className='input-tit'>职位:</span>
          <Input style={{width:'188px'}}/>
        </li>
        <li>
          <span className='input-tit'>姓名:</span>
          <Input style={{width:'188px'}}/>
        </li>
        <li>
          <span className='input-tit'>值班时间:</span>
          <Input style={{width:'188px'}}/>
        </li>
      </ul>
      <Button type="primary">保存</Button>
    </DutyPlanBox>
  );
}
DutyPlan.propTypes = {
  // menuData: PropTypes.array.isRequired,
}
export default DutyPlan;