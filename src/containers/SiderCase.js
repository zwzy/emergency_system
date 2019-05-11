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
        id: 'console',
        subName: '控制台',
        subIcon: 'icon-kongzhitai',
        menus:[]
      },
      {
        subId: 'emergency',
        subName: '应急处置',
        subIcon: 'icon-yingjichuli',
        menus: [
          {
            id: 'telegram',
            name: '来电记录',
          },
          {
            id: 'handle',
            name: '处置记录'
          },
          {
            id: 'evaluation',
            name: '分析评价'
          },
          {
            id: 'classic',
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
            id: 'plan',
            name: '值班计划',
          },
          {
            id: 'management',
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
            id: 'communicationGroup',
            name: '通讯群组',
          },
        ]
      },
      {
        subId: 'rules',
        subName: '规章制度',
        subIcon: 'icon-cz-gzzd',
        menus:[]
      },
      {
        subId: 'count',
        subName: '统计查询',
        subIcon: 'icon-tongji1',
        menus: [
          {
            id: 'signCount',
            name: '签到查询',
          },
          {
            id: 'assessCount',
            name: '评价查询',
          },
          {
            id: 'handleCount',
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
            id: 'userManage',
            name: '角色管理',
          },
          {
            id: 'accountManage',
            name: '账号管理',
          },
          {
            id: 'operationLog',
            name: '操作日志',
          },
          {
            id: 'kanBanUpdate',
            name: '看板维护',
          },
        ]
      },
    ],
    menu: '',
  }
  componentWillUpdate(props,state) {
    if(state.menu !== this.state.menu) {
      // 防止刷新页面时重新渲染,因为路径菜单一样，就没必要再执行这个了
      if(getRouterParams(this.props.location.search, 'menu') === state.menu) return 
      const {match} = this.props
      // this.props.history.push({pathname:`${match.path}/${state.menu.replace('_','/')}`,search:`menu=${state.menu}`})
    }
  }
  componentDidMount(){
    const activemenu = getRouterParams(this.props.location.search, 'menu')
    this.setRouterParams(activemenu, 'menu')
  }
  // 如果没有menu  默认选中的sub菜单为第一个数组，
  // 如果有参数，将其中的选中的item为当前路由指定的菜单
  setRouterParams(routerParams, type) {
    const {menuList} = this.state
    const defaultmenuId = menuList[1].menus[0].id
    if(!routerParams){
      this.setState({
        [type]: defaultmenuId,
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
    this.setState({
      menu: e.key,
    });
  }
  onOpenChange = (e) => {
    console.log(e)
    if(e.length===0) return
    const activeSubMenu = e[e.length-1]
    const array =  this.state.menuList.filter((item) => {
      return item.subId === activeSubMenu
    })
    this.setState({
      menu: array[0].menus[0].id,
    });
  }
  render() {
    const {menuList, menu} = this.state
    const openKey = menu.split('_')[0]
    return (
      <Sider 
        handleClick={()=>this.handleClick} 
        openKey={openKey}
        menu={menu}
        menuList={menuList}
        onOpenChange={this.onOpenChange}>
      </Sider>  
    )
  }
}

export default withRouter(SiderCase)
