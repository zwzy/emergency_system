import React from 'react';
import PropTypes from 'prop-types'

import { Button } from 'antd' 

import styled from 'styled-components'
import color from '../../utils/color'


function RulesGroup({username, userphone, handeleClick}) {
  const RulesGroupBox = styled.div `
  `
  return (
    <RulesGroupBox>
       <Button type='primary'>RulesGroupBox</Button>
    </RulesGroupBox>
  );
}
RulesGroup.propTypes = {
  // menuData: PropTypes.array.isRequired,
}
export default RulesGroup;
