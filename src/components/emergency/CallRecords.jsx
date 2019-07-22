import React from 'react';

import { Table, Input, Button, Row, Col } from 'antd' 

import styled from 'styled-components'
import {InputGroupSearch} from '../../utils/styled'

function CallRecords({data, event}) {
  const CallRecordsBox = styled.div `
  `
  return (
    <CallRecordsBox>
       <InputGroupSearch>
          <Row gutter={8}>
            <Col span={2}> 工号：</Col>
            <Col span={5}>
              <Input onChange={(e)=>event.changeInputValue(e, 'gongHao')} placeholder="Basic usage" />
            </Col>
            <Col span={2} > 车型：</Col>
            <Col span={5}>
              <Input onChange={(e)=>event.changeInputValue(e, 'cheType')} placeholder="Basic usage" />
            </Col>
            <Col span={2}> 司机姓名：</Col>
            <Col span={5}>
              <Input onChange={(e)=>event.changeInputValue(e, 'dirverName')} placeholder="Basic usage" />
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={2}> 车号：</Col>
            <Col span={5}>     
              <Input onChange={(e)=>event.changeInputValue(e, 'cheNum')} placeholder="Basic usage" />
            </Col>
            <Col span={2}> 关键字：</Col>
            <Col span={5}>
              <Input onChange={(e)=>event.changeInputValue(e, 'keyWord')} placeholder="Basic usage" />
            </Col>
          </Row>
        </InputGroupSearch>
    
      <Table bordered columns={data.callRecordsColumns} dataSource={data.callRecordsData} 
      />
    </CallRecordsBox>
  );
}

CallRecords.propTypes = {
  // menuData: PropTypes.array.isRequired,
}
export default  CallRecords;
