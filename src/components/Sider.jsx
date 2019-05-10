import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components'
import color from '../utils/color'
import config from '../utils/config'

const SiderBox = styled.div `
  display: flex;
  flex-direction: column;
  width: ${config.SIDER_WIDTH}px;
  box-sizing: border-box;
  border-radius: 5px;
  padding:15px 0;
  background: ${color.$base_white_bg};
  .menu-item{
    &.active{
      color:${color.$darkPrimary};
      background: ${color.$lightPrimaryBg};
    }
    padding:10px 15px;
  }
  `
function Sider({siderMenuData, activeIndex, onSwitchMenu}) {
  return (
    <SiderBox>
      <div>
        {
          siderMenuData.map((item,index)=>{
            return (
              <div 
                key={index} 
                className={activeIndex === index ? 'menu-item active': 'menu-item'}
                onClick={()=>{onSwitchMenu(index)}}
                >
                {item.name}
              </div>
            )
          })
        }
      </div>
    </SiderBox>
  );
}
Sider.propTypes = {
  siderMenuData: PropTypes.array.isRequired,
}
export default Sider;
