import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import color from '../utils/color'

import { message, Form, Icon, Input, Button, Checkbox,} from 'antd' 

const LoginPage = styled.div `
  background: ${color.$content};
  position: fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  display: flex;
  justify-content: center;
  align-items: center;
`
const LoginBox = styled.div `
  width: 300px;
`
const Desc = styled.div `
  display: flex;
  color: $lightText;
  justify-content: space-between;
`
export class LoginCase extends Component {
  
  static propTypes = {
  }
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
    if(localStorage.getItem('userInfo')) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      this.props.form.setFieldsValue({
        password: userInfo.password,
        remember: true,
        userName: userInfo.user
      })
    }
   
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if (values.remember === true) {
          const userInfo = {
            user: values.userName,
            password: values.password
          }
          localStorage.setItem('userInfo',JSON.stringify(userInfo))
        } else {
          localStorage.removeItem('userInfo')
        }
        if(values.userName==='admin' && values.password==='12345'){
          sessionStorage.setItem('isLogin', true)
          this.props.history.push('/')
        } else {
          message.error('你输入的用户名或密码有误！');
        }
      } else {
        console.log(values)
      }
    });
  }

  render() {
    const {getFieldDecorator} = this.props.form
    return (
      <LoginPage>
        <Form onSubmit={this.handleSubmit}>
          <LoginBox>
            <Form.Item>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input size='large' prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input size='large' prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
            </Form.Item>
            <Form.Item>
              <Button  size='large' type="primary" block htmlType="submit" className="login-form-button">
                登 录
              </Button>
            </Form.Item>            
            <Form.Item>
            <Desc>
              <div>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: false,
                })(
                  <Checkbox  style={{color: '#fff'}}>记住密码</Checkbox>
                )}
              </div>
              <div>
                <a className="login-form-forgot" href="https://www.baidu.com/">忘记密码</a>
                <span className='x-margin'> 或者 </span> <a href="https://www.baidu.com/">立即注册</a>
              </div>
            </Desc>
          </Form.Item>
          </LoginBox>
        </Form>
      </LoginPage> 
    )
  }
}



export default Form.create({ name: 'normal_login' })(LoginCase);
