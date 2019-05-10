import React from 'react';
import PropTypes from 'prop-types'

import { Button } from 'antd' 

import styled from 'styled-components'
import color from '../../utils/color'



function Income({username, userphone, handeleClick}) {
  const IncomeBox = styled.div `
  `
  let divRef = React.createRef();
  function handleClick() {
    console.log(divRef)
    if (divRef.current.style.color) {
      divRef.current.style.color = ''
    } else {
      divRef.current.style.color = 'red'
    }
  }
  return (
    <IncomeBox>
       收入
       <div ref={divRef}>
        颜色即将改变
       </div>
       <Button type='primary' onClick={handleClick}>获取ref实例</Button>
    </IncomeBox>
  );
}
Income.propTypes = {
  // menuData: PropTypes.array.isRequired,
}
export default Income;
