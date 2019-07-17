import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import color from '../utils/color'
import { connect } from 'react-redux'                           // 用来连接redux中reducer中全局数据的
import {userLoginACD} from '../utils/umo'
import {updateUmoEventState, resetUmoEventState} from '../actions/umo'
import {updateUserInformation} from '../actions/user'

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
      loading: false
    }
  }
  componentDidMount() {
    if(localStorage.getItem('userInfo')) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      this.props.form.setFieldsValue({
        password: userInfo.passWord,
        remember: true,
        userName: userInfo.userName,
        domain: userInfo.domain
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
            userName: values.userName,
            passWord: values.password,
            domain: values.domain,
            userPost: '应急人员'
          }
          localStorage.setItem('userInfo',JSON.stringify(userInfo))
        } else {
          localStorage.setItem('userInfo',JSON.stringify(userInfo))
        }
        const userInfo = {
          userName: values.userName,
          passWord: values.password,
          domain: values.domain
        }
        this.props.updateUserInformation({
          userName: values.userName,
          passWord:  values.password,
          domain: values.domain,
          extNumber: values.userName
        })
        // 登录成功
        this.loginUmoSystem(userInfo)
        this.setState({
          loading: false
        })
        // sessionStorage.setItem('isLogin', true)
        // this.props.history.push('/')
      } else {
        
      }
    });
  }
  loginUmoSystem = (userInfo) => {
    this.setState({
      loading: true
    })
    userLoginACD(userInfo, {
      onReadyState: (status)=>{
        console.log(status)
        const {id} = this.props.umoEvent.onReadyState
        this.props.updateUmoEventState({
          onReadyState: {
            id: id+1, 
            status: status
          }
        })
      },
      onCallincome: (ano, bno ,uud) => {
        const {id} = this.props.umoEvent.onCallincome
        this.props.updateUmoEventState({
          onCallincome: {
            id: id+1, 
            ano,
            bno,
            uud
          }
        })
      }, 
      onTalked: (ano, bno ,uud) => {
        const {id} = this.props.umoEvent.onTalked
        this.props.updateUmoEventState({
          onTalked: {
            id: id+1, 
            ano,
            bno,
            uud
          }
        })
      },
      onRingStoped: () => {
        const {id} = this.props.umoEvent.onRingStoped
        this.props.updateUmoEventState({
          onRingStoped: {
            id: id+1
          }
        })
      },
      onHookChanged: (status) => {
        const {id} = this.props.umoEvent.onHookChanged
        console.log(2222222, status)
        this.props.updateUmoEventState({
          onHookChanged: {
            id: id+1,
            status
          }
        })
      },
      onAgentChanged: (status) => {
        const {id} = this.props.umoEvent.onAgentChanged
        this.props.updateUmoEventState({
          onAgentChanged: {
            id: id+1,
            status
          }
        })
      },
      onAsyncFinished: (atype, taskid, ret, desc) => {
        const {id} = this.props.umoEvent.onAsyncFinished
        this.props.updateUmoEventState({
          onAsyncFinished: {
            id: id+1,
            atype,
            taskid,
            ret,
            desc
          }
        })
      },
      onAllBusy: () => {
        const {id} = this.props.umoEvent.onAllBusy
        this.props.updateUmoEventState({
          onAllBusy: {
            id: id+1
          }
        })
      },
      onQuelen: () => {
        const {id} = this.props.umoEvent.onQuelen
        this.props.updateUmoEventState({
          onQuelen: {
            id: id+1
          }
        })
      },
      onSmsincome: (dtime, from, content, slot) => {
        const {id} = this.props.umoEvent.onSmsincome
        this.props.updateUmoEventState({
          onSmsincome: {
            id: id+1,
            dtime,
            from,
            content,
            slot
          }
        })
      }
    }, () => {
      this.setState({
        loading: false
      })
      message.success('登录成功，1s后跳转控制台')
      setTimeout (()=>{
        sessionStorage.setItem('isLogin', true)
        this.props.history.push('/')
      }, 1000)
    }, (msg) => {
      this.setState({
        loading: false
      })
      message.error( msg || '你输入的账号或域名不正确，请重试...', 5)
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form
    return (
      <LoginPage>
        <Form onSubmit={this.handleSubmit}>
          <LoginBox>
            <Form.Item>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: '请输入用户名!' }],
              })(
                <Input size='large' prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="分机号" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }],
              })(
                <Input size='large' prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('domain', {
                rules: [{ required: true, message: '请输入密码虚拟机域名!' }],
              })(
                <Input size='large' prefix={<Icon type="chrome" style={{ color: 'rgba(0,0,0,.25)' }} />} type="domain" placeholder="域名" />
              )}
            </Form.Item>
            <Form.Item>
              <Button  size='large' type="primary" block htmlType="submit"  loading={this.state.loading} className="login-form-button">
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

const mapStateToProps = (state) => ({                  // owProps 是这个容器组件接收的props值，因为在处理时可能要用到他
  umoEvent: state.umoEvent
})
const mapDispatchToProps = (dispatch) => ({            // 引用全局actions中定义方法
  updateUmoEventState: (umoEventState)=>dispatch(updateUmoEventState(umoEventState)),
  updateUserInformation: (userInfo) => dispatch(updateUserInformation(userInfo)),
  resetUmoEventState: ()=>dispatch(resetUmoEventState())
})

const LoginCaseForm = Form.create({ name: 'normal_login' })(LoginCase);
export default connect(mapStateToProps, mapDispatchToProps)(LoginCaseForm)
