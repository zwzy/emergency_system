import React from 'react';
import PropTypes from 'prop-types'


import { Button } from 'antd' 

import styled from 'styled-components'

import color from '../../utils/color'



function Rules({username, userphone, handeleClick}) {
  const RulesBox = styled.div `
  `
  return (
    <RulesBox>
       <Button type='primary'>RulesBox</Button>
    </RulesBox>
  );
}
Rules.propTypes = {
  // menuData: PropTypes.array.isRequired,
}
export default Rules;
