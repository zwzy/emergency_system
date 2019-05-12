import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Sider from '../components/Sider'
// router
import { withRouter } from 'react-router-dom'
// uitls
import { getRouterParams } from '../utils/common'

export class SiderCase extends Component {
  
  static propTypes = {
    theme: PropTypes.string
  }
  state = {
    menuList: [
      {
        subId: 'console',
        subName: '控制台',
        subIcon: 'icon-normal',
        menus:[]
      },
      { 
        path: 'emergency',
        subId: 'emergency',
        subName: '应急处置',
        subIcon: 'icon-yingjichuli',
        menus: [
          {
            id: 'emergency_telegram',
            name: '来电记录',
          },
          {
            id: 'emergency_handle',
            name: '处置记录'
          },
          {
            id: 'emergency_evaluation',
            name: '分析评价'
          },
          {
            id: 'emergency_classic',
            name: '经典案例'
          },
          
        ]
      },
      {
        subId: 'attendance',
        subName: '值班签到',
        subIcon: 'icon-Sign',
        menus: [
          {
            id: 'attendance_plan',
            name: '值班计划',
          },
          {
            id: 'attendance_management',
            name: '值班管理',
          },
        ]
      },
      {
        subId: 'communication',
        subName: '应急通讯录',
        subIcon: 'icon-tongxunlu',
        menus: [
          {
            id: 'communication_group',
            name: '通讯群组',
          },
        ]
      },
      {
        subId: 'rules',
        path: 'rules',
        subName: '规章制度',
        subIcon: 'icon-cz-gzzd',
        menus:[
          {
            id:'rules_group',
            name: '规章制度',
          },
          {
            id:'rules_built',
            name: '新建规章制度'
          }
        ]
      },
      {
        subId: 'count',
        subName: '统计查询',
        subIcon: 'icon-tongji',
        menus: [
          {
            id: 'count_sign',
            name: '签到查询',
          },
          {
            id: 'count_assess',
            name: '评价查询',
          },
          {
            id: 'count_handle',
            name: '应急处置分析',
          },
        ]
      },
      {
        subId: 'setting',
        subName: '系统设置',
        subIcon: 'icon-xitongshezhi1',
        menus: [
          {
            id: 'setting_user',
            name: '角色管理',
          },
          {
            id: 'setting_account',
            name: '账号管理',
          },
          {
            id: 'setting_operationLog',
            name: '操作日志',
          },
          {
            id: 'setting_kanBanUpdate',
            name: '看板维护',
          },
        ]
      },
    ],
    menu: '',
    openKey: ''
  }
  componentWillUpdate(props,state) {
  }
  componentDidMount(){
    const {menuList} = this.state
    const activePath = this.props.location.pathname
    const activeMenu = activePath.slice(1)
    const subMenu = activeMenu.split('_')[0]
    // 判断路由_分开后是否相等
    // 相等即没有子菜单
    // 不相等有子菜单
    // 则需要把当前路由联系的SubMenu展开
    if(activeMenu === subMenu) {
      if(activeMenu === '') {
        this.setState({
          menu: 'console'
        })
      } else {
        this.setState({
          menu: activeMenu
        })
      }
    } else {
      console.log(activeMenu, subMenu)
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
   
    // this.setRouterParams(activemenu, 'menu')
  }
  // 如果没有menu  默认选中的sub菜单为第一个数组，
  // 如果有参数，将其中的选中的item为当前路由指定的菜单
  setRouterParams(routerParams, type) {
    const {menuList} = this.state
    const defaultmenuId = menuList[0].subId
    if(!routerParams){
      this.setState({
        menu: defaultmenuId
      },() => {
        this.props.history.push({search:`menu=${this.state.menu}`})
      })
    } else {
      this.setState({
        [type]: routerParams
      });
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
        openKey: []
      });
      return
    }
    // 点击获取最新的subMenu 的id
    const selSubMenu =  e[e.length-1]
    // 当前路由所在的subMenu
    const subMenu =  this.state.menu.split('_')[0]
    // 找到最新点击的subMenu的所对应的数组
    // 若前一个路由所在的subMenu不是点击的这个 即默认选中最新点击subMenu与它下面的第一个子菜单
    const array = this.state.menuList.filter((item) => {
      return item.subId === selSubMenu
    })
    // 当然，若他们相等我们将再次打开这个subMenu,不改变路由
    if(subMenu === selSubMenu) {
      // this.handleClick({key: array[0].subId })
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
    const {menuList, menu, openKey} = this.state
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
