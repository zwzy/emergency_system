import React from 'react';
import PropTypes from 'prop-types'

import { Button } from 'antd' 

import styled from 'styled-components'
import color from '../../utils/color'


function ManageOperationLog({username, userphone, handeleClick}) {
  const ManageOperationLogBox = styled.div `
  `
  return (
    <ManageOperationLogBox>
       <Button type='primary'>ManageOperationLogBox</Button>
    </ManageOperationLogBox>
  );
}
ManageOperationLog.propTypes = {
  // menuData: PropTypes.array.isRequired,
}
export default ManageOperationLog;

