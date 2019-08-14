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
  state = {
    menu: '',
    openKey: ''
  }
  componentDidMount() {
    const { userInfo } = this.props
    // console.log(this.props)
    const isHasExtNum = userInfo.roleList.findIndex((item) => String(item.id) === '1')
    if (isHasExtNum === -1) {
      if (menuList[0].id === 'console') {
        menuList.splice(0, 1)
      }
      if (this.props.location.pathname === '/') {
        this.props.history.push({ pathname: '/attendance' })
      }
    }

    // const activePath = this.props.location.pathname
    // const activeMenu = activePath.slice(1)
    // const subMenu = activeMenu.split('_')[0]
    // // 判断路由_分开后是否相等
    // // 相等即没有子菜单
    // // 不相等有子菜单
    // // 则需要把当前路由联系的SubMenu展开
    // if (activeMenu === subMenu) {
    //   if (activeMenu === '') {
    //     this.setState({
    //       menu: 'console'
    //     })
    //   } else {
    //     this.setState({
    //       menu: activeMenu
    //     })
    //   }
    // } else {
    //   console.log(999, activeMenu, subMenu)
    //   if (activeMenu === '/') {
    //     this.setState({
    //       menu: 'console'
    //     })
    //   } else {
    //     this.setState({
    //       menu: activeMenu,
    //       openKey: subMenu
    //     })
    //   }
    // }
  }
  componentWillReceiveProps(props) {
  }
  handleClick = (e) => {
    console.log(this.state.menu , e.key)
    if (this.state.menu === e.key) return
    if (e.key === 'console') {
      this.props.history.push({ pathname: '/' })
    } else {
      // 点击item, 看是否带子内容的，若带就给他加个menu入参
      this.props.history.push({ pathname: e.key })
    }
    this.setState({
      menu: e.key
    }, ()=>{
      console.log(this.state.menu)
    })
  }
  onOpenChange = (e) => {
    // console.log(8888, e)
    // // 再次点击关闭
    // if(e.length===0) {
    //   this.setState({
    //     openKey: ''
    //   });
    //   return
    // }
    // // 点击获取最新的subMenu 的id
    // const selSubMenu =  e[e.length-1]
    // // 当前路由所在的subMenu
    // const subMenu =  this.state.menu.split('_')[e.length-2]
    // // 找到最新点击的subMenu的所对应的数组
    // // 若前一个路由所在的subMenu不是点击的这个 即默认选中最新点击subMenu与它下面的第一个子菜单
    // console.log(selSubMenu, subMenu, menuList)
    // let array = []
    // console.log(e.length)
    // if(e.length === 1) {
    //   array = menuList.filter((item) => {
    //     return item.id === selSubMenu
    //   })
    // } else {
    //   const menuList1 = menuList.filter((item) => {
    //     return item.id === subMenu
    //   })
    //    array = menuList1.filter((item) => {
    //     return item.id === selSubMenu
    //   })
    // }

    // console.log(111, array)
    // // 当然，若他们相等我们将再次打开这个subMenu,不改变路由
    // if(subMenu === selSubMenu) {
    //   this.setState({
    //     openKey: array[e.length-1].id
    //   });
    // } else {
    //   this.setState({
    //     openKey: array[e.length-2].id,
    //   });
    //   this.handleClick({key: array[e.length-2].menus[e.length-2].id})
    // }
  }
  render() {
    const { menu, openKey } = this.state
    return (
      <Menu
        onClick={this.handleClick}
        style={{ width: config.SIDER_WIDTH, overflowY: 'auto', overflowX: 'hidden', borderRadius: '5px', padding: '5px 0', border: 'none' }}
        defaultSelectedKeys={['console']}
        defaultOpenKeys={['emergency']}
        // openKeys={['openKey']}
        selectedKeys={[this.props.history.location.pathname]}
        // onOpenChange={onOpenChange}
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
