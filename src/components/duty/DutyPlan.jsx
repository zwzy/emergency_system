import React from 'react';
import PropTypes from 'prop-types'

import { Button } from 'antd' 

import styled from 'styled-components'
import color from '../../utils/color'



function DutyPlan({username, userphone, handeleClick}) {
  const DutyPlanBox = styled.div `
  `
  return (
    <DutyPlanBox>
       <Button type='primary'>DutyPlanBox</Button>
    </DutyPlanBox>
  );
}
DutyPlan.propTypes = {
  // menuData: PropTypes.array.isRequired,
}
export default DutyPlan;