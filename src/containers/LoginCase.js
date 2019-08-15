import React, { Component } from 'react'
import {GetQueryString} from '../utils/common'
import color from '../utils/color'
import { connect } from 'react-redux'                           // 用来连接redux中reducer中全局数据的
import {updateUmoEventState, resetUmoEventState} from '../actions/umo'
import {updateUserInformation} from '../actions/user'
import {login} from '../api/user'
import { Redirect } from "react-router-dom";
import { message, Form, Input, Button, Icon} from 'antd' 
import styled from 'styled-components'

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
export class LoginCase extends Component {
  static propTypes = {
  }
  constructor(props) {
    super(props)
    this.state = {
      isLogin: false
    }
  }
  componentDidMount() {
    this.handleLogin()
  }
  // 自动登录
  handleLogin = async () => {
    const workno = GetQueryString('workno') || localStorage.getItem('workno')
    const password = GetQueryString('password') || localStorage.getItem('password')
    console.log(11, workno, password)
    if(!workno || !password) {
      message.info('url上没有带对应的参数')
      return
    }
    localStorage.setItem('workno', workno)
    localStorage.setItem('password', password)
    console.log(workno, password)
    try {
      // const {data} = await login({workno, password})
      const data = {
        code: 0,
        content: {
          deptName: '上海',
          roleList: [{id:1,roleName:'组长'}, {id:2,roleName:'普通员工'}],
          extNum: 1001,
          userName: '张太胖',
          mobile: '18755489161'
        }
      }
      if(data.code === 0) {
        const {roleList, extNum, userName, deptName, mobile} = data.content
        // 保存状态
        const userInfo = {
          userName, // 工号
          extNum, // 密码
          roleList: roleList,
          deptName,
          workno,
          mobile
        }
        sessionStorage.setItem('userInfo',JSON.stringify(userInfo))
        this.props.updateUserInformation({
         ...userInfo
        })
         sessionStorage.setItem('isLogin', true)
         this.setState({
           isLogin: true
         })
      } else {
      }
    } catch (error) {
      console.log(error)
    } 
  }

  
  // 手动登录
  handleSubmit = async (e) => {
    e.preventDefault();
    this.props.form.validateFields( async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const {workno, password} = values
        try {
          // const {data} = await login({workno, password})
          const data = {
            code: 0,
            content: {
              deptName: '上海',
              roleList: [{id:1,roleName:'组长'}, {id:2,roleName:'普通员工'}],
              extNum: 1001,
              userName: '张三'
            }
          }
          if(data.code === 0) {
            const {roleList, extNum, userName, deptName, mobile} = data.content
            // 保存状态
            const userInfo = {
              userName, // 工号
              extNum, // 密码
              roleList: roleList,
              deptName,
              workno,
              mobile
            }
            sessionStorage.setItem('userInfo',JSON.stringify(userInfo))
            this.props.updateUserInformation({
             ...userInfo
            })
             sessionStorage.setItem('isLogin', true)
             this.setState({
               isLogin: true
             })
          } else {
          }
        } catch (error) {
        }
      } else {
      }
    });
  }

  render() {
    let { from } = this.props.location.state || { from: { pathname: "/" } };
    let { isLogin } = this.state;
    if (isLogin) return (<Redirect to={from} />)
    const {getFieldDecorator} = this.props.form
    return  ( <LoginPage>
      <Form onSubmit={this.handleSubmit}>
        <LoginBox>
          <Form.Item>
            {getFieldDecorator('workno', {
              rules: [{ required: true, message: '请输入工号!' }],
            })(
              <Input size='large' prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="工号" />
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
            <Button  size='large' type="primary" block htmlType="submit"  loading={this.state.loading} className="login-form-button">
              登 录
            </Button>
          </Form.Item>            
        </LoginBox>
      </Form>
    </LoginPage> )
  
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
