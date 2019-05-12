import React from 'react';
import PropTypes from 'prop-types'

import { Menu, Icon } from 'antd';

const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1185107_8eej21cbtne.js', // 在 iconfont.cn 上生成
});
const SubMenu = Menu.SubMenu;

function Sider({openKey, handleClick, menu, menuList, onOpenChange}) {
  return (
    <Menu
    onClick={handleClick}
    style={{ width: 256, overflowY: 'auto',overflowX: 'hidden', borderRadius: '5px', padding: '5px 0', border: 'none'}}
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
            <MyIcon  type={subItem.subIcon} />
            {subItem.subName}
          </Menu.Item>
        )
        const subMenu = (
          <SubMenu key={subItem.subId} title={<span><MyIcon type={subItem.subIcon} /><span>{subItem.subName}</span></span>}>
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
