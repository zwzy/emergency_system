import React from 'react';
import styled from 'styled-components'
import color from '../utils/color'
import config from '../utils/config'
import BaseCallOnLineListModal from './base/BaseCallOnLineListModal'
import BaseCallOutModal from './base/BaseCallOutModal'
import TransferModal from './base/TransferModal'
import PropTypes from 'prop-types'
import { Icon, Button, Modal} from 'antd';
const logoImg = require('../images/avatar.png')

function Header({event, data}) {
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
          margin-right: 5px;
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
  const CallInModal = styled.div`
    position: fixed;
    z-index: 999;
    bottom: 30px;
    border-radius: 5px;
    box-shadow: 0 0 10px #000;
    background: #fff;
    right: 30px;
    width: 260px;
    overflow: auto;
    height: 240px;
    border: 1px solid ${color.$border};
    padding: 10px;
    text-align: center;
    .close-btn{
      position: absolute;
      top: 5px;
      right: 5px;
      /* margin-left: -16px; */
    }
    .title{
      text-align: center;
      font-size: 16px;
      margin-bottom: 10px;
      color: ${color.$desc};
    }
    .content{
      width: 80%;
      display: inline-block;
      text-align: left;
    }
  `
  return (
    <div>
      <Header>
        <LArea>
        <div className='logo'></div>
          <div className='logo-info'>
            <div>{data.userInfo.roleList.length ? data.userInfo.roleList[0].roleName : ''}：<strong>{data.userInfo.userName}</strong></div>
            <div className='btn-wrap'>
              <Button className='btn-icon' icon='calendar' size="small" onClick={()=>event.signEvent()}>签到</Button>
              <Button className='btn-icon'  size="small"  icon='logout' type='danger' onClick={()=>event.logOutEvent()}>退出</Button>
            </div>
          </div>
        </LArea>
        <CArea>
          {
            data.btnlist.map((btn,index)=>{
              return (
                <div className='item' key={index} onClick={() => { event[btn.eventName]() }}>
                  <div className='icon'>
                    <span className={`${btn.cla} iconfont`}></span>
                  </div>
                  <div>{btn.tit}</div>
                </div>
              )
            })
          }
        </CArea>
        <RArea>
        {/* <Button icon='edit' onClick={()=>{event.goToRouter()}}>填写台账</Button> */} 
      </RArea>
      </Header>
      
      <Modal
        /* 拨出modal */
        width={800}
        maskClosable = {false}
        title='拨打'
        visible={data.callOutIsShow}
        onCancel={()=>event.callOutShowEvent()}
        footer={null}>
        <BaseCallOutModal callOutIsShow={data.callOutIsShow}></BaseCallOutModal>
      </Modal>


      <Modal
        /* 转接modal */
        title='今日执班列表'
        width={900}
        maskClosable = {false}
        visible={data.callOtherIsShow}
        onCancel={()=>event.callOtherShowEvent()}
        footer={null}>
        <TransferModal />
      </Modal>

      <Modal
        /* 队列列表modal */
        width={900}
        maskClosable = {false}
        title='呼叫队列'
        visible={data.callInListIsShow}
        onCancel={()=>event.callInListShowEvent()}
        footer={null}>
        {data.callInListIsShow && <BaseCallOnLineListModal></BaseCallOnLineListModal>}
      </Modal>

      {
        data.callInModalIsShow && <CallInModal>
          <Icon className='close-btn' type="close-circle" onClick={()=>event.callInModalShowEvent()}  style={{fontSize: '32px'}} />
          <div className='title'> <Icon type="phone"/> 来电信息</div> 
          <div className='content'>
            <div style={data.modalItemStyle}>来电号码： <strong>{data.callinInfo.trainPhone}</strong></div>
            <div style={data.modalItemStyle}>司机姓名： <strong>{data.callinInfo.trainDirverName}</strong></div>
            <div style={data.modalItemStyle}>机班人员： <strong>{data.callinInfo.trainDirverNames}</strong></div>
            <div style={data.modalItemStyle}>车间班组： <strong>{data.callinInfo.trainByGroup}</strong></div>
            <div style={data.modalItemStyle}>机型车号： <strong>{data.callinInfo.trainNum}</strong></div>
          </div>
        </CallInModal>
      }

    </div>
   );
}
Header.propTypes = {
  // userInformation: PropTypes.array.isRequired,
}
export default Header;
