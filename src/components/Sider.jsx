import React from 'react';
import PropTypes from 'prop-types'
import { Menu } from 'antd';

import config from '../utils/config'



function Sider({openKey, handleClick, menu, menuList, onOpenChange}) {
  return (
    <Menu
    onClick={handleClick}
    style={{ width: config.SIDER_WIDTH, overflowY: 'auto',overflowX: 'hidden', borderRadius: '5px', padding: '5px 0', border: 'none'}}
    defaultSelectedKeys={['console']}
    // openKeys={['openKey']}
    // selectedKeys={[menu]}
    // onOpenChange={onOpenChange}
    mode="inline"
    >
    {
      menuList.map((subItem) => {
        const menuItem = (
          // style样式 解决 移入存在抖动的bug
          <Menu.Item  key={subItem.id} style={{width: "auto"}}>
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
                  <Menu.Item  key={item.id} style={{width: "auto"}}>
                    {item.name}
                  </Menu.Item>
                )
                const subMenu1 = (
                  <SubMenu key={item.id} title={<span>
                      <span>{item.name}</span>
                    </span>}>
                    {
                     item.menus && item.menus.map((threeItem) => {
                          return(
                            <Menu.Item key={threeItem.id}>{threeItem.name}</Menu.Item>
                          )
                      })
                    }
                  </SubMenu>
                )
                return  item.menus && item.menus.length ? subMenu1 : menuItem1
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
