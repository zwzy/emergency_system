import React from 'react';
import styled from 'styled-components'
import color from '../utils/color'
import config from '../utils/config'
import PropTypes from 'prop-types'

import { Icon, Button } from 'antd';

const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1185107_8eej21cbtne.js', // 在 iconfont.cn 上生成
});

const logoImg = require('../images/avatar.png')

const btnlist = [
  {cla:'icon-dianhua1', tit: '接听'},
  {cla:'icon-guaduan', tit: '挂断'},
  {cla:'icon-mobile', tit: '拨打'},
  {cla:'icon-Hold-TheLine', tit: '保持'},
  {cla:'icon-zhuanjie', tit: '转接'},
  {cla:'icon-bhjpaidui', tit: '队列z'}
]
function Header({userName, isLogin, theme, updateUserInformation}) {
  const Header = styled.header `
    height: ${config.HEADER_HEIGHT}px;
    display: flex;
    justify-content: space-between;
    padding: 0 50px;
    align-items: center;
    background: ${color.$darkPrimary};
    color: ${color.baseColor}
  `
  const CArea = styled.div `
    display:flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    .item{
      padding: 0 15px;
      cursor: pointer;
    }
    .icon{
      width: 28px;
      height: 28px;
      color: ${color.$primary};
      border-radius: 100%;
      background: ${color.baseColor};
      font-size: 19px;
    }
    div{
      margin-top: 2px;
      text-align:center;
      color: ${color.baseColor};
    }
  `
  const LArea = styled.div `
    display: flex;
    height: 60px;
    align-items: center;
    .logo-info{
      margin-left: 10px;
      .btn-wrap{
        margin-top: 3px;
        line-height: 1.5;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .btn-icon{
          font-size: 13px;
        }
      }
    }
    .logo{
      background: url(${logoImg}) no-repeat center;
      background-size: 100% 100%;
      height: 48px;
      width: 48px;
    }
  `
  const RArea = styled.div `
    display: flex;
    height: 60px;
    margin-left: 110px;
    line-height: 1;
    align-items: center;
  `
  return (
    <Header>
      <LArea>
      <div className='logo'></div>
        <div className='logo-info'>
          <div>应急处置值守人员：<strong>王五</strong></div>
          <div className='btn-wrap'>
            <Button className='btn-icon' icon='calendar' size="small">签到</Button>
            <Button className='btn-icon'  size="small"  icon='logout' type='danger'>退出</Button>
          </div>
        </div>
      </LArea>
      <CArea>
        {
          btnlist.map((btn,index)=>{
            return (
              <div className='item' key={index}>
                <div className='icon'>
                  <MyIcon type={btn.cla}/>
                </div>
                <div>{btn.tit}</div>
              </div>
            )
          })
        }
      </CArea>
      <RArea>
        <Button icon='edit'>填写台账</Button>
      </RArea>
    </Header>
  );
}
Header.propTypes = {
  // userInformation: PropTypes.array.isRequired,
}
export default Header;
