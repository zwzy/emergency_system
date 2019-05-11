import React from 'react';
import styled from 'styled-components'
import color from '../utils/color'
import config from '../utils/config'
import PropTypes from 'prop-types'
import { Button } from 'antd';
const logoImg = require('../images/account_logo.png')
const btnlist = [
  {src: require('../images/account_logo.png'),tit: '接听'},
  {src: require('../images/account_logo.png'),tit: '挂断'},
  {src: require('../images/account_logo.png'),tit: '拨打'},
  {src: require('../images/account_logo.png'),tit: '保持'},
  {src: require('../images/account_logo.png'),tit: '转接'},
  {src: require('../images/account_logo.png'),tit: '队列'}
]
function Header({userName, isLogin, theme, updateUserInformation}) {
  const Header = styled.header `
    height: ${config.HEADER_HEIGHT}px;
    display: flex;
    justify-content: space-between;
    padding: 0 50px;
    align-items: center;
    background-color: rgba(42, 130, 228, 1);
    /* color: ${color.baseColor} */
  `
  const LArea = styled.div `
    display: flex;
    height: 60px;
    align-items: center;
    .logo{
      background: url(${logoImg}) no-repeat center;
      background-size: 100% 100%;
      height: 45px;
      width: 45px;
      border-radius: 50%;
      margin-right: 19px;
    }
    .login-info {
      color: #ffffff;
      .btn-wrap{
        margin-top: 4px;
      }
      .btn-wrap .btn-left {
        margin-right: 23px;
      }
    }
  `
  const CArea = styled.div `
    display:flex;
    align-items: center;
    width: 293px;
    justify-content: space-between;
    font-size: 14px;
    color: #ffffff;
    img {
      display:block;
      width: 31px;
      height: 31px;
      border-radius:50%;
    }
    div {
      text-align:center;
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
        <div className='login-info'>
          <div>应急处置值守人员：王五</div>
          <div className='btn-wrap'>
            <Button className='btn-left' size="small">签到</Button>
            <Button size="small">退出</Button>
          </div>
        </div>
      </LArea>
      <CArea>
        {
          btnlist.map((btn,index)=>{
            return (
              <div key={index}>
                <img src={btn.src} alt=""/>
                <div>{btn.tit}</div>
              </div>
            )
          })
        }
      </CArea>
      <RArea>
        <Button>填写台账</Button>
      </RArea>
    </Header>
  );
}
Header.propTypes = {
  // userInformation: PropTypes.array.isRequired,
}
export default Header;
