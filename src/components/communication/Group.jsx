import React from 'react';
import PropTypes from 'prop-types'

import { Button } from 'antd' 

import styled from 'styled-components'
import color from '../../utils/color'



function Group({username, userphone, handeleClick}) {
  const GroupBox = styled.div `
  `
  return (
    <GroupBox>
       <Button type='primary'>GroupBox</Button>
    </GroupBox>
  );
}
Group.propTypes = {
  // menuData: PropTypes.array.isRequired,
}
export default Group;
