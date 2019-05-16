import React from 'react';
import PropTypes from 'prop-types'

import { Table, Input, Button, Row, Col } from 'antd' 

import styled from 'styled-components'
import color from '../../utils/color'

const InputGroup = Input.Group
// const handleSubmit = e => {
//   e.preventDefault();
//   this.props.form.validateFields((err, values) => {
//     if (!err) {
//       console.log('Received values of form: ', values);
//     }
//   });
// };
function CallRecords({data}) {
  const CallRecordsBox = styled.div `
  `
  return (
    <CallRecordsBox>
       <InputGroup style={{lineHeight: '32px'}}>
          <Row gutter={8} style={{margin: '20px 0'}}>
            <Col span={2} style={{textAlign: "right"}}> 工号：</Col>
            <Col span={5}>
              <Input style={{display: 'inline-block'}} placeholder="Basic usage" />
            </Col>
            <Col span={2} style={{textAlign: "right"}}> 车型：</Col>
            <Col span={5}>
               <Input placeholder="Basic usage" />
            </Col>
            <Col span={2} style={{textAlign: "right"}}> 司机姓名：</Col>
            <Col span={5}>
              <Input placeholder="Basic usage" />
            </Col>
          </Row>
          <Row gutter={8} style={{margin: '20px 0'}}>
            <Col span={2} style={{textAlign: "right"}}> 车号：</Col>
            <Col span={5}>
               <Input placeholder="Basic usage" />
            </Col>
            <Col span={2} style={{textAlign: "right"}}> 关键字：</Col>
            <Col span={5}>
              <Input placeholder="Basic usage" />
            </Col>
          </Row>
        </InputGroup>
    
      <Table bordered columns={data.callRecordsColumns} dataSource={data.callRecordsData} />
    </CallRecordsBox>
  );
}

CallRecords.propTypes = {
  // menuData: PropTypes.array.isRequired,
}
export default  CallRecords;
