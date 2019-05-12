import React from 'react';
import PropTypes from 'prop-types'

import { Button } from 'antd' 

import styled from 'styled-components'
import color from '../../utils/color'



function Telgram({username, userphone, handeleClick}) {
  const TelgramBox = styled.div `
  `
  return (
    <TelgramBox>
       <Button type='primary'>TelgramBox</Button>
    </TelgramBox>
  );
}
Telgram.propTypes = {
  // menuData: PropTypes.array.isRequired,
}
export default Telgram;
