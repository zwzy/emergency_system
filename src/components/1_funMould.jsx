import React from 'react';
import PropTypes from 'prop-types'

import styled from 'styled-components'
import color from '../utils/color'



function Module({username, userphone, handeleClick}) {
  const ModuleBox = styled.div `
  `
  return (
    <ModuleBox onclick={handeleClick()}>
    </ModuleBox>
  );
}
Module.propTypes = {
  menuData: PropTypes.array.isRequired,
}
export default Module;
