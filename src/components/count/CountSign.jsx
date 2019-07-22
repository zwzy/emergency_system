import React from 'react';
import PropTypes from 'prop-types'

import { Button } from 'antd' 

import styled from 'styled-components'
import color from '../../utils/color'



function CountSign({username, userphone, handeleClick}) {
  const CountSignBox = styled.div `
  `
  return (
    <CountSignBox>
       <Button type='primary'>CountSignBox</Button>
    </CountSignBox>
  );
}
CountSign.propTypes = {
  // menuData: PropTypes.array.isRequired,
}
export default CountSign;
