import React from 'react';
import PropTypes from 'prop-types'

import { Menu, Icon } from 'antd';

const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1185107_h0dd94yrxum.js', // 在 iconfont.cn 上生成
});
const SubMenu = Menu.SubMenu;
function Sider({openKey, handleClick, menu, menuList, onOpenChange}) {
  return (
    openKey &&  <Menu
    onClick={handleClick}
    style={{ width: 256, overflowY: 'auto',overflowX: 'hidden', borderRadius: '5px', padding: '5px 0', border: 'none'}}
    defaultOpenKeys={[openKey]}
    openKeys={[openKey]}
    selectedKeys={[menu]}
    onOpenChange={onOpenChange}
    mode="inline"
    >
    {
      menuList.map((subItem) => {
        return(
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
      })
    }
  </Menu>
  )
}
Sider.propTypes = {
  // siderMenuData: PropTypes.array.isRequired,
}
export default Sider;
