import React from 'react';
import PropTypes from 'prop-types'

import { Button,Input,Table } from 'antd'

import styled from 'styled-components'
import color from '../../utils/color'

function Group({tableColumns,tableData}) {
  const GroupBox = styled.div `
    .search-wrap {
      width: 100%;
      height: 79px;
      line-height: 79px;
      background-color: rgba(229, 229, 229, 1);
      padding: 0 26px;
      .search-tit {
        font-size: 16px;
      }
    }
    .btn-wrap {
      margin-top: 14px;
      margin-bottom: 14px;
      Button {
        margin-right: 20px;
      }
    }
  `
  return (
    <GroupBox>
      <div className='search-wrap'>
        <span className='search-tit'>快速搜索：</span>
        <Input style={{width:'500px',marginLeft:'23px',marginRight:'35px'}}/>
        <Button type="primary">搜索</Button>
      </div>
      <div className='btn-wrap'>
        <Button type='primary'>新增群组</Button>
      </div>
      <div>
        <Table bordered columns={tableColumns} dataSource={tableData} />
      </div>
    </GroupBox>
  );
}
Group.propTypes = {
  // menuData: PropTypes.array.isRequired,
}
export default Group;
