import React from 'react';
import PropTypes from 'prop-types'


import { Button } from 'antd' 

import styled from 'styled-components'

import color from '../../utils/color'



function Console({username, userphone, handeleClick}) {
  const ConsoleBox = styled.div `
  `
  return (
    <ConsoleBox>
       <Button type='primary'>ConsoleBox</Button>
    </ConsoleBox>
  );
}
Console.propTypes = {
  // menuData: PropTypes.array.isRequired,
}
export default Console;