import React from 'react';
import PropTypes from 'prop-types'

import {Alert} from 'antd'

import styled from 'styled-components'
import color from '../../utils/color'



function Pay({theme, power}) {
  const PayBox = styled.div `
  `
  console.log(window.compose)
  return (
    <PayBox>
       <Alert type='success' message={theme}></Alert>
       <Alert type='error' message={power}></Alert>
       支出
    </PayBox>
  );
}
Pay.propTypes = {
  // menuData: PropTypes.array.isRequired,
}
export default Pay;
