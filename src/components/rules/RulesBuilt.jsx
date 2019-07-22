import React from 'react';
import PropTypes from 'prop-types'

import { Button, Input } from 'antd' 

import styled from 'styled-components'
import color from '../../utils/color'


function RulesBuilt({username, userphone, handeleClick}) {
  const RulesBuiltBox = styled.div `
  `
  const Search = Input.Search;
  return (
    <RulesBuiltBox>
      <div className='search-wrap'>
        <span>关键词搜索：</span>
        <Search
          placeholder="input search text"
          enterButton="Search"
          onSearch={value => console.log(value)}
        />
      </div>
    </RulesBuiltBox>
  );
}
RulesBuilt.propTypes = {
  // menuData: PropTypes.array.isRequired,
}
export default RulesBuilt;
