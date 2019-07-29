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
              <Input onChange={(e)=>event.changeInputValue(e, 'workno')} placeholder="请输入工号" />
            </Col>
            <Col span={2} > 车型：</Col>
            <Col span={5}>
              <Input onChange={(e)=>event.changeInputValue(e, 'model')} placeholder="请输入车型" />
            </Col>
            <Col span={2}> 司机姓名：</Col>
            <Col span={5}>
              <Input onChange={(e)=>event.changeInputValue(e, 'driverName')} placeholder="请输司机姓名" />
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={2}> 车号：</Col>
            <Col span={5}>     
              <Input onChange={(e)=>event.changeInputValue(e, 'loco')} placeholder="请输入车号" />
            </Col>
            <Col span={4}>  
              <Button type='primary' onClick={()=>{event.getCallRecords()}}>筛选</Button>
            </Col>
          </Row>
        </InputGroupSearch>
        <Table bordered columns={data.callRecordsColumns} onChange={event.handleTableChange} pagination={this.state.pagination} dataSource={data.callRecordsData} 
      />
    </CallRecordsBox>
  );
}

CallRecords.propTypes = {
  // menuData: PropTypes.array.isRequired,
}
export default  CallRecords;
