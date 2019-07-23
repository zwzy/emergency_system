import React from 'react';
import PropTypes from 'prop-types'

import { Button } from 'antd' 

import styled from 'styled-components'
import color from '../../utils/color'



function Handle({username, userphone, handeleClick}) {
  const HandleBox = styled.div `
  `
  return (
    <HandleBox>
       <Button type='primary'>HandleBox</Button>
    </HandleBox>
  );
}
Handle.propTypes = {
  // menuData: PropTypes.array.isRequired,
}
export default Handle;