import React from 'react'

import { Route, Switch } from "react-router-dom";
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
// 统计
import CountAssessCase from './containers/count/CountAssessCase'
import CountHandleCase from './containers/count/CountHandleCase'
import CountSignCase from './containers/count/CountSignCase'
// 值班
import DutyCase from './containers/menu/DutyCase'
// import DutyManagementCase from './containers/duty/DutyManagementCase'
// import DutyPlanCase from './containers/duty/DutyPlanCase'
// 应急处置
import ClassicCase from './containers/emergency/ClassicCase'
import EvaluationCase from './containers/emergency/EvaluationCase'
import HandleCase from './containers/emergency/HandleCase'
import TelgramCase from './containers/emergency/TelgramCase'
// 系统设置
import ManageAccountCase from './containers/manage/ManageAccountCase'
import ManagekanBanUpdateCase from './containers/manage/ManagekanBanUpdateCase'
import ManageOperationLogCase from './containers/manage/ManageOperationLogCase'
import ManageUserCase from './containers/manage/ManageUserCase'


import {ThemeContext, PowerContext} from './utils/context'

import { menuList } from './utils/config'


import './styles/App.css';
import './styles/common.css';


function getBreadCrumdArray (history) {
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
      return item.subId === parentMenu.slice(1)
    })
    breadCrumdArr.push({name: array[0].subName, path: '/' + array[0].subId})
    const childArray = array[0].menus.filter((item)=>{
      return item.id === pathname.slice(1)
    })
    breadCrumdArr.push({name: childArray[0].name, path: '/' + childArray[0].id})
  } else {
    const array = menuList.filter((item) => {
      return item.subId === parentMenu.slice(1)
    })
    breadCrumdArr.push({name: array[0].subName, path: '/' + array[0].subId})
  }
  return breadCrumdArr
} 
function App({history}) {
  
  const breadCrumdArr = getBreadCrumdArray(history)
  console.log(2222, breadCrumdArr)
  // 当前路由所在的subMenu
  // // 找到最新点击的subMenu的所对应的数组
  // // 若前一个路由所在的subMenu不是点击的这个 即默认选中最新点击subMenu与它下面的第一个子菜单
  // const array = menuList.filter((item) => {
  //   return item.subId === selSubMenu
  // })
  // // 当然，若他们相等我们将再次打开这个subMenu,不改变路由
  // if(subMenu === selSubMenu) {
  //   this.setState({
  //     openKey: array[0].subId
  //   });
  // } else {
  //   this.setState({
  //     openKey: array[0].subId,
  //   });
  // }
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
    padding: 8px 0;
    border-radius: 5px;
    margin-bottom: 10px;
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
                  <Route path='/rules_group' component={RulesGroupCase}></Route>
                  <Route path='/rules_built' component={RulesBuiltCase}></Route>
                  <Route path='/emergency_telegram' component={TelgramCase}></Route>
                  <Route path='/emergency_handle' component={HandleCase}></Route>
                  <Route path='/emergency_evaluation' component={EvaluationCase}></Route>
                  <Route path='/emergency_classic' component={ClassicCase}></Route>
                  {/* <Route path='/attendance_plan' component={DutyPlanCase}></Route>
                  <Route path='/attendance_management' component={DutyManagementCase}></Route> */}
                  <Route path='/attendance' component={DutyCase}></Route>
                  <Route path='/communication_group' component={GroupCase}></Route>
                  <Route path='/count_sign' component={CountSignCase}></Route>
                  <Route path='/count_assess' component={CountAssessCase}></Route>
                  <Route path='/count_handle' component={CountHandleCase}></Route>
                  <Route path='/setting_user' component={ManageUserCase}></Route>
                  <Route path='/setting_account' component={ManageAccountCase}></Route>
                  <Route path='/setting_operationLog' component={ManageOperationLogCase}></Route>
                  <Route path='/setting_kanBanUpdate' component={ManagekanBanUpdateCase}></Route>
                  <Route path='/' component={ConsoleCase}></Route>
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
