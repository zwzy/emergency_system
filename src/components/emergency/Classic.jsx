import React from 'react';
import PropTypes from 'prop-types'

import { Button } from 'antd' 

import styled from 'styled-components'
import color from '../../utils/color'


function Classic({username, userphone, handeleClick}) {
  const ClassicBox = styled.div `
  `
  return (
    <ClassicBox>
       <Button type='primary'>ClassicBox</Button>
    </ClassicBox>
  );
}
Classic.propTypes = {
  // menuData: PropTypes.array.isRequired,
}
export default Classic;