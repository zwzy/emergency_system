import React from 'react';
import PropTypes from 'prop-types'
import { Menu } from 'antd';

import config from '../utils/config'


const SubMenu = Menu.SubMenu;

function Sider({openKey, handleClick, menu, menuList, onOpenChange}) {
  return (
    <Menu
    onClick={handleClick}
    style={{ width: config.SIDER_WIDTH, overflowY: 'auto',overflowX: 'hidden', borderRadius: '5px', padding: '5px 0', border: 'none'}}
    // defaultOpenKeys={[openKey]}
    openKeys={[openKey]}
    selectedKeys={[menu]}
    onOpenChange={onOpenChange}
    mode="inline"
    >
    {
      menuList.map((subItem) => {
        const menuItem = (
          // style样式 解决 移入存在抖动的bug
          <Menu.Item  key={subItem.subId} style={{width: "auto"}}>
             <span className={`${subItem.subIcon} iconfont`}></span>
            {subItem.subName}
          </Menu.Item>
        )
        const subMenu = (
          <SubMenu key={subItem.subId} title={<span>
              <span className={`${subItem.subIcon} iconfont icon`}></span>
              <span>{subItem.subName}</span>
            </span>}>
            {
              subItem.menus.map((item) => {
                return(
                  <Menu.Item key={item.id}>{item.name}</Menu.Item>
                )
              })
            }
          </SubMenu>
        )
        return  subItem.menus.length ? subMenu : menuItem
      })
    }
  </Menu>
  )
}
Sider.propTypes = {
  // siderMenuData: PropTypes.array.isRequired,
}
export default Sider;
