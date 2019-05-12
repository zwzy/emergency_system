import React from 'react';
import PropTypes from 'prop-types'

import { Button } from 'antd' 

import styled from 'styled-components'
import color from '../../utils/color'


function RulesBuilt({username, userphone, handeleClick}) {
  const RulesBuiltBox = styled.div `
  `
  return (
    <RulesBuiltBox>
       <Button type='primary'>RulesBuiltBox</Button>
    </RulesBuiltBox>
  );
}
RulesBuilt.propTypes = {
  // menuData: PropTypes.array.isRequired,
}
export default RulesBuilt;
