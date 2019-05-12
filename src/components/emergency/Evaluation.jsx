import React from 'react';
import PropTypes from 'prop-types'

import { Button } from 'antd' 

import styled from 'styled-components'
import color from '../../utils/color'


function Evaluation({username, userphone, handeleClick}) {
  const EvaluationBox = styled.div `
  `
  return (
    <EvaluationBox>
       <Button type='primary'>EvaluationBox</Button>
    </EvaluationBox>
  );
}
Evaluation.propTypes = {
  // menuData: PropTypes.array.isRequired,
}
export default Evaluation;