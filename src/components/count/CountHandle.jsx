import React from 'react';
import PropTypes from 'prop-types'

import { Button } from 'antd' 

import styled from 'styled-components'
import color from '../../utils/color'


function CountHandle({username, userphone, handeleClick}) {
  const CountHandleBox = styled.div `
  `
  return (
    <CountHandleBox>
       <Button type='primary'>CountHandleBox</Button>
    </CountHandleBox>
  );
}
CountHandle.propTypes = {
  // menuData: PropTypes.array.isRequired,
}
export default CountHandle;