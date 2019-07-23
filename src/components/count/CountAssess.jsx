import React from 'react';
import PropTypes from 'prop-types'

import { Button } from 'antd' 

import styled from 'styled-components'
import color from '../../utils/color'


function CountAssess({username, userphone, handeleClick}) {
  const CountAssessBox = styled.div `
  `
  return (
    <CountAssessBox>
       <Button type='primary'>CountAssessBox</Button>
    </CountAssessBox>
  );
}
CountAssess.propTypes = {
  // menuData: PropTypes.array.isRequired,
}
export default CountAssess;
