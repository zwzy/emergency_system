import React from 'react'

import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux'  
                         // 用来连接redux中reducer中全局数据的
import { Breadcrumb } from 'antd';

import styled from 'styled-components'
import config from './utils/config'
import color from './utils/color'

import HeaderCase from './containers/HeaderCase.js'
import SiderCase from './containers/SiderCase'
// 控制台
import ConsoleCase from './containers/menu/ConsoleCase'
// 规章制度
import RulesGroupCase from './containers/rules/RulesGroupCase'
import RulesBuiltCase from './containers/rules/RulesBuiltCase'
// 通讯分组
import GroupCase from './containers/communication/GroupCase'
import ContactCase from './containers/communication/ContactCase'
// 统计
import CountAssessCase from './containers/count/CountAssessCase'
import CountHandleCase from './containers/count/CountHandleCase'
import CountSignCase from './containers/count/CountSignCase'
// 值班
import DutyCase from './containers/menu/DutyCase'
// 应急处置
import ClassicCase from './containers/emergency/ClassicCase'
import EvaluationCase from './containers/emergency/EvaluationCase'
import HandleCase from './containers/emergency/HandleCase'
import CallRecordsCase from './containers/emergency/CallRecordsCase'
// 系统设置
import BindAnoIpCase from './containers/manage/BindAnoIpCase'
import ManageAccountCase from './containers/manage/ManageAccountCase'
import ManagekanBanUpdateCase from './containers/manage/ManagekanBanUpdateCase'
import ManageOperationLogCase from './containers/manage/ManageOperationLogCase'
import ManageUserCase from './containers/manage/ManageUserCase'


import {ThemeContext, PowerContext} from './utils/context'

import { menuList } from './utils/config'

import './styles/App.css';
import './styles/common.css';

function getBreadCrumdArray (history) {
  // const isLogin = sessionStorage.getItem('isLogin')
  // if(!isLogin) {
  //  history.push({pathname: '/login'})
  // } 
  // 1、获取当前路径
  // 如果没有父菜单： 即没有 pathname.split('_')[1] = undefined
  const pathname = history.location.pathname  // 当前路径
  if(pathname === '/') return
  const parentMenu =  pathname.split('_')[0]  // 父菜单名称
  const childMenu =  pathname.split('_')[1]   // 判断是不是有父菜单
  const breadCrumdArr = []                    // 面包屑的数据{name, path}
  // 有父菜单逻辑
  // 找到父组件菜单所在的数组  获取到他的名字  并赋到面包屑中
  if(childMenu) {
    const array = menuList.filter((item) => {
      return item.id === parentMenu.slice(1)
    })
    breadCrumdArr.push({name: array[0].subName, path: '/' + array[0].id})
    const childArray = array[0].menus.filter((item)=>{
      return item.id === pathname.slice(1)
    })
    breadCrumdArr.push({name: childArray[0].name, path: '/' + childArray[0].id})
  } else if(parentMenu){
    const array = menuList.filter((item) => {
      return item.id === parentMenu.slice(1)
    })
    if(array.length) {
      breadCrumdArr.push({name: array[0].subName, path: '/' + array[0].id})
    }
  }
  return breadCrumdArr
} 

function PrivateRoute({ component: Component, ...rest }) {
  const isLogin = sessionStorage.getItem('isLogin')
  return (
    <Route
      {...rest}
      render={props =>
        isLogin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}
function App({history}) {
  const breadCrumdArr = getBreadCrumdArray(history)
  const Section = styled.section `
    display: flex;
    position: fixed;
    left:  ${config.DIVIDER_HEIGHT}px;
    border-radius: 5px;
    right: ${config.DIVIDER_HEIGHT}px;
    margin: 0 auto;
    top: ${config.HEADER_HEIGHT+config.DIVIDER_HEIGHT}px;
    bottom: ${config.DIVIDER_HEIGHT}px;
 `
  const Content = styled.div `
    flex:1;
    overflow: auto;
    flex-direction: column;
    min-width: 960px;
    padding: ${config.CONTENT_PADDING}px;
    border-radius: 5px;
    margin-left: ${config.DIVIDER_HEIGHT}px;
    background: ${color.$base_white_bg};
    min-height: 600px;
  `
  const BreadCrumdBox = styled.div `
    padding-bottom: 12px;
    border-radius: 5px;
  `
  return (
    <div className="App">
      <ThemeContext.Provider>
        <PowerContext.Provider>
          {/* 头部 */}
          <HeaderCase></HeaderCase>
          <Section style={{minWidth: '1200px'}}>
            {/* 侧边栏 */}
            <SiderCase></SiderCase>
            {/* 主体内容区域 */}
              <Content>
                {/* 内容模块组件 */}
                { breadCrumdArr && (
                  <BreadCrumdBox>
                    <Breadcrumb>
                      {breadCrumdArr.map((item)=>{
                        return(
                          <Breadcrumb.Item key={item.path}>{item.name}</Breadcrumb.Item>
                        )
                      })}
                    </Breadcrumb>
                  </BreadCrumdBox>
                  )
                }
                <Switch>
                  <PrivateRoute path='/rules_group' component={RulesGroupCase}></PrivateRoute>
                  <PrivateRoute path='/rules_built' component={RulesBuiltCase}></PrivateRoute>
                  <PrivateRoute path='/emergency_telegram' component={CallRecordsCase}></PrivateRoute>
                  <PrivateRoute path='/emergency_handle' component={HandleCase}></PrivateRoute>
                  <PrivateRoute path='/emergency_evaluation' component={EvaluationCase}></PrivateRoute>
                  <PrivateRoute path='/emergency_classic' component={ClassicCase}></PrivateRoute>
                  <PrivateRoute path='/attendance' component={DutyCase}></PrivateRoute>
                  <PrivateRoute path='/communication_group' component={GroupCase}></PrivateRoute>
                  <PrivateRoute path='/communication_contact' component={ContactCase}></PrivateRoute>
                  <PrivateRoute path='/count_sign' component={CountSignCase}></PrivateRoute>
                  <PrivateRoute path='/count_assess' component={CountAssessCase}></PrivateRoute>
                  <PrivateRoute path='/count_handle' component={CountHandleCase}></PrivateRoute>
                  <PrivateRoute path='/setting_user' component={ManageUserCase}></PrivateRoute>
                  <PrivateRoute path='/setting_account' component={ManageAccountCase}></PrivateRoute>
                  <PrivateRoute path='/setting_operationLog' component={ManageOperationLogCase}></PrivateRoute>
                  <PrivateRoute path='/setting_kanBanUpdate' component={ManagekanBanUpdateCase}></PrivateRoute>
                  <PrivateRoute path='/setting_bindAnoIp' component={BindAnoIpCase}></PrivateRoute>
                  <PrivateRoute path='/' component={ConsoleCase}></PrivateRoute>
                </Switch>
              </Content>
          </Section>
        </PowerContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
}

const mapStateToProps = (state) => ({                  // owProps 是这个容器组件接收的props值，因为在处理时可能要用到他
  // userInformation: state.userInformation
})
export default connect(mapStateToProps)(App)
