import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Sider from '../components/Sider'
// router
import { withRouter } from 'react-router-dom'
// uitls
import { menuList } from '../utils/config'

export class SiderCase extends Component {
  
  static propTypes = {
    theme: PropTypes.string
  }
  state = {
    menu: '',
    openKey: ''
  }
  componentDidMount(){
    const activePath = this.props.location.pathname
    const activeMenu = activePath.slice(1)
    const subMenu = activeMenu.split('_')[0]
    // 判断路由_分开后是否相等
    // 相等即没有子菜单
    // 不相等有子菜单
    // 则需要把当前路由联系的SubMenu展开
    if(activeMenu === subMenu) {
      if(activeMenu === '') {
      console.log(8888, activeMenu)
        this.setState({
          menu: 'console'
        })
      } else {
        this.setState({
          menu: activeMenu
        })
      }
    } else {
      console.log(999, activeMenu, subMenu)
      if(activeMenu === '/') {
        this.setState({
          menu: 'console'
        })
      } else {
        this.setState({
          menu: activeMenu,
          openKey: subMenu
        })
      }
    }
  }
  handleClick = (e) => {
    if(this.state.menu === e.key) return 
    if(e.key === 'console') {
      this.props.history.push({pathname: '/'})
    } else {
      // 点击item, 看是否带子内容的，若带就给他加个menu入参
      this.props.history.push({pathname: e.key})
    }
  }
  onOpenChange = (e) => {
    // 再次点击关闭
    if(e.length===0) {
      this.setState({
        openKey: ''
      });
      return
    }
    // 点击获取最新的subMenu 的id
    const selSubMenu =  e[e.length-1]
    // 当前路由所在的subMenu
    const subMenu =  this.state.menu.split('_')[0]
    // 找到最新点击的subMenu的所对应的数组
    // 若前一个路由所在的subMenu不是点击的这个 即默认选中最新点击subMenu与它下面的第一个子菜单
    const array = menuList.filter((item) => {
      return item.subId === selSubMenu
    })
    // 当然，若他们相等我们将再次打开这个subMenu,不改变路由
    if(subMenu === selSubMenu) {
      this.setState({
        openKey: array[0].subId
      });
    } else {
      this.setState({
        openKey: array[0].subId,
      });
      this.handleClick({key: array[0].menus[0].id})
    }
  }
  render() {
    const {menu, openKey} = this.state
    return (
      <Sider
        handleClick={this.handleClick} 
        openKey={openKey}
        menu={menu}
        menuList={menuList}
        onOpenChange={this.onOpenChange}>
      </Sider>  
    )
  }
}

export default withRouter(SiderCase)
