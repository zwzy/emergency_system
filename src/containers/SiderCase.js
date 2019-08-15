import React, { Component } from 'react'
import { connect } from 'react-redux'                           // 用来连接redux中reducer中全局数据的
import PropTypes from 'prop-types'
import config from '../utils/config'

// router
import { withRouter } from 'react-router-dom'
// uitls
import { Menu } from 'antd';

import { menuList } from '../utils/config'
const SubMenu = Menu.SubMenu;

export class SiderCase extends Component {

  static propTypes = {
    theme: PropTypes.string
  }
  constructor(props) {
    super(props)
    this.state = {
      menu: '',
      openKey: []
    }
  }
  componentDidMount() {
    const { userInfo } = this.props
    const isHasExtNum = userInfo.roleList.findIndex((item) => String(item.id) === '1')
    if (isHasExtNum === -1) {
      if (menuList[0].id === 'console') {
        menuList.splice(0, 1)
      }
      if (this.props.location.pathname === '/') {
        this.props.history.push({ pathname: '/attendance' })
      }
    }
    const activePath = this.props.location.pathname
    const activeMenu = activePath.slice(1)
    const subMenuArr = activeMenu.split('_')
    const subMenu = subMenuArr.slice(0, subMenuArr.length-1)
    if(subMenu.length === 1) {
      this.setState({
        openKey: subMenu
      })
    } else {
      this.setState({
        openKey: [subMenu[0], subMenu.join('_')]
      })
    }
  }
  componentWillReceiveProps(props) {
  }
  handleClick = (e) => {
    if (this.state.menu === e.key) return
    if (e.key === 'console') {
      this.props.history.push({ pathname: '/' })
    } else {
      // 点击item, 看是否带子内容的，若带就给他加个menu入参
      this.props.history.push({ pathname: e.key })
    }
  }
  onOpenChange = (e) => {
    const {openKey} = this.state
    this.setState({
      openKey: e
    })
  }
  render() {
    const { openKey } = this.state
    return (
      <Menu
        onClick={this.handleClick}
        style={{ width: config.SIDER_WIDTH, overflowY: 'auto', overflowX: 'hidden', borderRadius: '5px', padding: '5px 0', border: 'none' }}
        // defaultSelectedKeys={[menu]}
        // defaultOpenKeys={openKey}
        openKeys={openKey}
        selectedKeys={[this.props.history.location.pathname.slice(1)||'console']}
        onOpenChange={this.onOpenChange}
        mode="inline"
      >
        {
          menuList.map((subItem) => {
            const menuItem = (
              // style样式 解决 移入存在抖动的bug
              <Menu.Item key={subItem.id} style={{ width: "auto" }}>
                <span className={`${subItem.subIcon} iconfont`}></span>
                {subItem.subName}
              </Menu.Item>
            )
            const subMenu = (
              <SubMenu key={subItem.id} title={<span>
                <span className={`${subItem.subIcon} iconfont icon`}></span>
                <span>{subItem.subName}</span>
              </span>}>
                {
                  subItem.menus.map((item) => {
                    const menuItem1 = (
                      // style样式 解决 移入存在抖动的bug
                      <Menu.Item key={item.id} style={{ width: "auto" }}>
                        {item.name}
                      </Menu.Item>
                    )
                    const subMenu1 = (
                      <SubMenu key={item.id} title={<span>
                        <span>{item.name}</span>
                      </span>}>
                        {
                          item.menus && item.menus.map((threeItem) => {
                            return (
                              <Menu.Item key={threeItem.id}>{threeItem.name}</Menu.Item>
                            )
                          })
                        }
                      </SubMenu>
                    )
                    return item.menus && item.menus.length ? subMenu1 : menuItem1
                  })
                }
              </SubMenu>
            )
            return subItem.menus.length ? subMenu : menuItem
          })
        }
      </Menu>
    )
  }
}

const mapStateToProps = (state) => ({                  // owProps 是这个容器组件接收的props值，因为在处理时可能要用到他
  userInfo: state.user
})
const mapDispatchToProps = (dispatch) => ({            // 引用全局actions中定义方法
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SiderCase))
