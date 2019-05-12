import React from 'react';
import PropTypes from 'prop-types'

import { Button } from 'antd' 

import styled from 'styled-components'
import color from '../../utils/color'




function ManageUser({username, userphone, handeleClick}) {
  const ManageUserBox = styled.div `
  `
  return (
    <ManageUserBox>
       <Button type='primary'>ManageUserBox</Button>
    </ManageUserBox>
  );
}
ManageUser.propTypes = {
  // menuData: PropTypes.array.isRequired,
}
export default ManageUser;