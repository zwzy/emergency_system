import React from 'react';
import PropTypes from 'prop-types'

import { Button,Input,Table } from 'antd'

import styled from 'styled-components'
import color from '../../utils/color'

function Contact({data, event}) {
  const ContactBox = styled.div `
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
    <ContactBox>
      <div className='search-wrap'>
        <span className='search-tit'>快速搜索：</span>
        <Input onChange={(e) => event.handleInputVal(e)}  style={{width:'500px',marginLeft:'23px',marginRight:'35px'}}/>
        <Button type="primary" onClick={() => event.clickSearch()}>搜索</Button>
      </div>
      <div className='btn-wrap'>
        <Button type='primary'>新增联系人</Button>
      </div>
      <div>
        <Table bordered columns={data.tableColumns} dataSource={data.tableData} />
      </div>
    </ContactBox>
  );
}
Contact.propTypes = {
  // menuData: PropTypes.array.isRequired,
}
export default Contact;
