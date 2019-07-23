import React from 'react';
import PropTypes from 'prop-types'

import { Button } from 'antd' 

import styled from 'styled-components'
import color from '../../utils/color'



function ManageAccount({username, userphone, handeleClick}) {
  const ManageAccountBox = styled.div `
  `
  return (
    <ManageAccountBox>
       <Button type='primary'>ManageAccountBox</Button>
    </ManageAccountBox>
  );
}
ManageAccount.propTypes = {
  // menuData: PropTypes.array.isRequired,
}
export default ManageAccount;

