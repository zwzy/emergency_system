import React from 'react';
import styled from 'styled-components'
import color from '../utils/color'
import config from '../utils/config'
import BaseCommunication from '../components/base/BaseCommunication'
import PropTypes from 'prop-types'

import { Icon, Button, Modal, Table, } from 'antd';

const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1185107_8eej21cbtne.js', // 在 iconfont.cn 上生成
});

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
    height: 320px;
    border: 1px solid ${color.$border};
    padding: 10px;
    text-align: center;
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
  const CallOutBox = styled.div`
    display: flex;
    justify-content: space-between;
    .lf-box{
      width: 50%;
      border-right: 1px solid #eee;
      padding: 0 20px;
      box-sizing: border-box;
      .lf-box-title{
        font-weight: bold;
        color: #333;
        padding-bottom: 10px;
      }
      .history-box{
        padding-right: 20px;
        height: 400px;
        overflow: auto;
      }
      .callout-item{
        padding: 10px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #eee;
        .desc{
          color: #999;
          font-size: 12px;
        }
      }
    }
    .rt-box{
      width: 50%;
      padding: 0 20px;
      box-sizing: border-box;
      overflow: auto;
    }
  `
  const TransferBox = styled.div`
    display: flex;
    justify-content: space-between;
    .lf-box{
      width: 50%;
      border-right: 1px solid #eee;
      padding: 0 20px;
      box-sizing: border-box;
    }
    .rt-box{
      width: 50%;
      padding: 0 20px;
      box-sizing: border-box;
      overflow: auto;
      .rt-title{
        font-weight: bold;
        color: #333;
        padding-bottom: 10px;
      }
      .table-title-box{
        margin-bottom: 7px;
        height: 40px;
        line-height: 40px;
        display: flex;
        background: #f3f5f7;
        border-radius: 3px;
        .table-title-item{
          flex: 1;
          text-align: center;
        }
      }
      .table-item-box{
        display: flex;
        border-bottom: 1px solid #eee;
        align-items:center;
        padding: 10px 0;
        .table-item{
          flex: 1;
          text-align: center;
        }
      }
    }
  `
  return (
    <div>
      <Header>
        <LArea>
        <div className='logo'></div>
          <div className='logo-info'>
            <div>应急处置值守人员：<strong>王五</strong></div>
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
      
      <Modal
        /* 拨出modal */
        width={800}
        title='拨打'
        visible={data.callOutIsShow}
        onCancel={()=>event.callOutShowEvent()}
        footer={null}>
        <CallOutBox>
          <div className="lf-box">
            <div className='lf-box-title'>历史通话记录</div>
            <div className='history-box'>
            { data.callOutData.callHistoryData.map((item, index)=>{
              return (
                <div className="callout-item" key={index}>
                  <div className="lf-item">
                      <div><span className='right-divider'>{item.userName}</span> <span>{item.userPhone}</span></div>
                      <div className='desc'><span className='right-divider'>{item.time}</span> <span>{item.timeLong}</span></div>
                  </div>
                  <div className="rt-item">
                    <Button type="primary" shape="circle" icon="phone" />
                  </div>
                </div>
              )
              })
            }
            </div>
          </div>
          <div className="rt-box">
             <BaseCommunication 
              callHistoryData={data.callOutData.callHistoryData} 
              handleSelectChange={event.handleSelectChange}
              onSearch={event.searchBykeyWord}>
              </BaseCommunication>
          </div>
        </CallOutBox>  
      </Modal>


      <Modal
        /* 转接modal */
        width={900}
        title='转接通讯列表'
        visible={data.callOtherIsShow}
        onCancel={()=>event.callOtherShowEvent()}
        footer={null}>
        <TransferBox>
          <div className="lf-box">
            <BaseCommunication 
              callHistoryData={data.callOutData.callHistoryData} 
              handleSelectChange={event.handleSelectChange}
              onSearch={event.searchBykeyWord}>
            </BaseCommunication>
          </div>
          <div className="rt-box">
            <div className="rt-title">
              群组通讯录
            </div>
            <div className="table-title-box">
              <div className='table-title-item'>群组名</div>
              <div className='table-title-item'>拨打</div>
            </div>
            <div className="table-item-box">
              <div className="table-item">应急交流群1</div>
              <div className="table-item">
                <Button type="primary" shape="circle" icon="phone" />
              </div>
            </div>
            <div className="table-item-box">
              <div className="table-item">应急交流群1</div>
              <div className="table-item">
                <Button type="primary" shape="circle" icon="phone" />
              </div>
            </div>
            <div className="table-item-box">
              <div className="table-item">应急交流群1</div>
              <div className="table-item">
                <Button type="primary" shape="circle" icon="phone" />
              </div>
            </div>
          </div>
        </TransferBox>
      </Modal>

      <Modal
        /* 队列列表modal */
        width={900}
        title='呼叫队列'
        visible={data.callInListIsShow}
        onCancel={()=>event.callInListShowEvent()}
        footer={null}>
        <Table columns={data.callInListColumns} dataSource={data.callInListData} scroll={{y: 265}} pagination={false} />
      </Modal>
      {
        data.callInModalIsShow && <CallInModal>
          <div className='title'> <Icon type="phone" /> 来电信息</div>
          <div className='content'>
            <div style={data.modalItemStyle}>来电号码： <strong>{data.callinInfo.trainPhone}</strong></div>
            <div style={data.modalItemStyle}>司机姓名： <strong>{data.callinInfo.trainDirverName}</strong></div>
            <div style={data.modalItemStyle}>机班人员： <strong>{data.callinInfo.trainDirverNames}</strong></div>
            <div style={data.modalItemStyle}>车间班组： <strong>{data.callinInfo.trainByGroup}</strong></div>
            <div style={data.modalItemStyle}>机型车号： <strong>{data.callinInfo.trainNum}</strong></div>
            <div style={data.modalItemStyle}>所在位置： <strong>{data.callinInfo.trainPosition}</strong></div>
            <div style={data.modalItemStyle}>机车最近故障记录： <strong>{data.callinInfo.trainBreakRuleInfo}</strong></div>
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
