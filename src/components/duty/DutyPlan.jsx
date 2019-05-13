import React from 'react';
import PropTypes from 'prop-types'

import { Button,Input } from 'antd' 

import styled from 'styled-components'
import color from '../../utils/color'



function DutyPlan({username, userphone, handeleClick}) {
  const DutyPlanBox = styled.div `
    .input-wrap {
      
    }
  `
  return (
    <DutyPlanBox>
      <div className='input-wrap'>
        <div></div>
      </div>
      <Input placeholder="Basic usage" />
    </DutyPlanBox>
  );
}
DutyPlan.propTypes = {
  // menuData: PropTypes.array.isRequired,
}
export default DutyPlan;