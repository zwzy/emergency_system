import React from 'react';
import PropTypes from 'prop-types'

import { Button } from 'antd' 

import styled from 'styled-components'
import color from '../../utils/color'



function ManageKanBanUpdate({username, userphone, handeleClick}) {
  const ManageKanBanUpdateBox = styled.div `
  `
  return (
    <ManageKanBanUpdateBox>
       <Button type='primary'>ManageKanBanUpdateBox</Button>
    </ManageKanBanUpdateBox>
  );
}
ManageKanBanUpdate.propTypes = {
  // menuData: PropTypes.array.isRequired,
}
export default ManageKanBanUpdate;
