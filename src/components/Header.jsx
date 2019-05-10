import React from 'react';
import styled from 'styled-components'
import color from '../utils/color'
import config from '../utils/config'
import PropTypes from 'prop-types'

const logoImg = require('../images/account_logo.png')
function Header({userName, isLogin, theme, updateUserInformation}) {
  const Header = styled.header `
    height: ${config.HEADER_HEIGHT}px;
    display: flex;
    justify-content: space-between;
    padding: 0 50px;
    align-items: center;
    background: ${color.$base_white_bg};
    /* color: ${color.baseColor} */
  `
  const LArea = styled.div `
    display: flex;
    height: 60px;
    align-items: center;
    span{
      margin-left: 6px;
    }
    .logo{
      background: url(${logoImg}) no-repeat center;
      background-size: 100% 100%;
      height: 32px;
      width: 32px;
    }
  `
  const RArea = styled.div `
    display: flex;
    height: 60px;
    line-height: 1;
    align-items: center;
    .menu-item{
      margin-left: 10px;
      padding: 10px;
      display: flex;
      align-items: center;
      &:hover {
        color: #2e90e5;
      }
      .iconfont{
        margin-right: 4px;
      }
    }
  `
  return (
    <Header>
      <LArea>
        <div className='logo'></div>
        <span>私人小金库</span>
      </LArea>
      <RArea>
        <div className='menu-item pointer' onClick={()=>{updateUserInformation()}}>
          <span className='iconfont icon-theme'></span> { theme === 'white' ? '简洁白' : '酷炫黑'}
        </div>  
        <div className='menu-item pointer'>
          <span className='iconfont icon-1USER'></span> {isLogin ? userName : '未登录' }
        </div>
        <div className='menu-item pointer'>
          <span className='iconfont icon-log-out'></span>注销
        </div>  
       
      </RArea>
    </Header>
  );
}
Header.propTypes = {
  // userInformation: PropTypes.array.isRequired,
}
export default Header;
