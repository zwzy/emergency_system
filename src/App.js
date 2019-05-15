import React from 'react'

import { Route, Switch } from "react-router-dom";
import { connect } from 'react-redux'                           // 用来连接redux中reducer中全局数据的

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

import './styles/App.css';
import './styles/common.css';

function App({userInformation}) {
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
  return (
    <div className="App">
      <ThemeContext.Provider value={userInformation.theme}>
        <PowerContext.Provider value={userInformation.power}>
          {/* 头部 */}
          <HeaderCase></HeaderCase>
          <Section style={{minWidth: '1200px'}}>
            {/* 侧边栏 */}
            <SiderCase></SiderCase>
            {/* 主体内容区域 */}
              <Content>
                {/* 内容模块组件 */}
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
  userInformation: state.userInformation
})
export default connect(mapStateToProps)(App)
