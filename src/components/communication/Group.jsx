import React from 'react';
import PropTypes from 'prop-types'
import { Button,Input,Table,Modal,Tag,Select,Empty } from 'antd'
import styled from 'styled-components'
import color from '../../utils/color'

const Search = Input.Search
const Option = Select.Option
function Group({data, event}) {
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
  const ModalWrap = styled.div `
    .modal-item {
      margin-bottom: 10px;
      display: flex;
      flex-direction: row;
      .modal-txt {
        width: 90px;
      }
      .taglist {
        width: 360px;
      }
    }
  `
  const BaseCommunicationBox = styled.div `
    .filter-box{
      display: flex;
      align-items: center;
      padding-bottom: 8px;
      .rt-box-title {
        width: 90px;
      }
    }
    .address-box{
      height: 357px;
      overflow: auto;
      .address-item{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        border-bottom: 1px solid #eee;
      }
    }
  `

  return (
    <GroupBox>
      <div className='search-wrap'>
        <span className='search-tit'>快速搜索：</span>
        <Input onChange={(e) => event.handleInputVal(e)}  style={{width:'500px',marginLeft:'23px',marginRight:'35px'}}/>
        <Button type="primary" onClick={() => event.clickSearch()}>搜索</Button>
      </div>
      <div className='btn-wrap'>
        <Button type='primary' onClick={() => event.clickAdd()}>新增群组</Button>
      </div>
      <div>
        <Table bordered columns={data.tableColumns} dataSource={data.tableData} />
      </div>
      <Modal
        title="新增通讯群组"
        visible={data.addGroupModal}
        onOk={event.handleConfrimAdd}
        onCancel={event.handleCancelAdd}
        cancelText="取消"
        okText="确定"
      > 
        <ModalWrap>
          <div className='modal-item'>
            <div className='modal-txt'>群组名：</div>
            <div>
              <Input onChange={(e) => event.handleInputVal(e)}  style={{width:'360px'}}/> 
            </div>
          </div>
          <div className='modal-item'>
            <div className='modal-txt'>已选择成员：</div>
            <div className='taglist'>
              <Tag style={{marginBottom:'6px'}} closable>Tag 2</Tag>
              <Tag style={{marginBottom:'6px'}} closable>Tag 2</Tag>
              <Tag style={{marginBottom:'6px'}} closable>Tag 2</Tag>
              <Tag style={{marginBottom:'6px'}} closable>Tag 2</Tag>
            </div>
          </div>
          <BaseCommunicationBox>
            <div className="filter-box">
              <div className='rt-box-title'>查询通讯录：</div>
              <Select 
                placeholder="请选择部门"
                style={{ width: 150 }} 
                onChange={ event.handleSelectChange }
                >
                  {data.callOutAllDept.map((item)=>{
                    return(
                      <Option key={item.deptNo} value={item.deptNo}>{item.deptName}</Option>
                    )
                  })}
                </Select>
              <Search
                placeholder="关键字搜索"
                onSearch={event.searchBykeyWord}
                style={{ width: 150,marginLeft:'20px' }}
              />
            </div>
            <div className='address-box'>
              { data.callOutBook.map((item, index)=>{
                return (
                  <div className="address-item" key={index}>
                    <div><span className='right-divider'>{item.userName}</span></div>
                    <div><span className='right-divider'>{item.work}</span></div>
                  </div>
                )
                })
              }
              {!data.callOutBook.length && <Empty style={{marginTop: '100px' }} image={Empty.PRESENTED_IMAGE_SIMPLE}/>}
            </div>
          </BaseCommunicationBox>
        </ModalWrap>
      </Modal>
    </GroupBox>
  );
}
Group.propTypes = {
  // menuData: PropTypes.array.isRequired,
}
export default Group;
