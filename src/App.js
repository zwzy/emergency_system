import React from 'react'
import { Route, Switch } from "react-router-dom";
import { connect } from 'react-redux'                           // 用来连接redux中reducer中全局数据的

import styled from 'styled-components'
import config from './utils/config'
import color from './utils/color'

import HeaderCase from './containers/HeaderCase.js'
import SiderCase from './containers/SiderCase'
import IncomeCase from './containers/modules/IncomeCase'
import PayCase from './containers/modules/PayCase'

import {ThemeContext, PowerContext} from './utils/context'

import './styles/App.css';
import './styles/common.css';

function App({userInformation}) {
  const Section = styled.section `
    display: flex;
    position: fixed;
    width: 80%;
    left: 10%;
    border-radius: 5px;
    right: 10%;
    margin: 0 auto;
    top: ${config.HEADER_HEIGHT+config.DIVIDER_HEIGHT}px;
    bottom: ${config.DIVIDER_HEIGHT}px;
 `
  const Content = styled.div `
    flex:1;
    flex-direction: column;
    padding: 20px;
    border-radius: 5px;
    margin-left: ${config.DIVIDER_HEIGHT}px;
    background: ${color.$base_white_bg};
  `
  return (
    <div className="App">
      <ThemeContext.Provider value={userInformation.theme}>
        <PowerContext.Provider value={userInformation.power}>

          {/* 头部 */}
          <HeaderCase></HeaderCase>
          <Section>
            {/* 侧边栏 */}
            <SiderCase></SiderCase>
            {/* 主体内容区域 */}
              <Content>
                {/* 内容模块组件 */}
                <Switch>
                  <Route path='/pay' component={PayCase}></Route>
                  <Route path='/' component={IncomeCase}></Route>
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
