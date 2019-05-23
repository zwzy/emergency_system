import React from 'react';
import PropTypes from 'prop-types'

import { Button, Table, Select, Input } from 'antd' 

import styled from 'styled-components'


function CountAssess({username, userphone, handeleClick}) {
  const BaseCommunicationBox = styled.div `
  `
  return (
    <BaseCommunicationBox>
       <Button type='primary'>BaseCommunication</Button>
    </BaseCommunicationBox>
  );
}
BaseCommunication.propTypes = {
  // menuData: PropTypes.array.isRequired,
}
export default BaseCommunication;
