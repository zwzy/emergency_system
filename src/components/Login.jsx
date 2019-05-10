import React from 'react';
import PropTypes from 'prop-types'

import styled from 'styled-components'
import color from '../utils/color'



function Login({}) {
  const LoginBox = styled.div `
    background: ${color.$base_white_bg};
  `
  return (
    <LoginBox>
        登录   登录   登录   登录
    </LoginBox>
  );
}
Login.propTypes = {
  // menuData: PropTypes.array.isRequired,
}
export default Login;
