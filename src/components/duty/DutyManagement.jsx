import React from 'react';
import PropTypes from 'prop-types'

import { Button,Input } from 'antd'

import styled from 'styled-components'
import color from '../../utils/color'


function DutyManagement({username, userphone, handeleClick}) {
const DutyManagementBox = styled.div `
`
return (
  <DutyManagementBox>
    <Button type='primary'>DutyManagementBox</Button>
  </DutyManagementBox>
);
}
DutyManagement.propTypes = {
// menuData: PropTypes.array.isRequired,
}
export default DutyManagement;