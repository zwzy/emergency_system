import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import color from '../utils/color'
import {GetQueryString} from '../utils/common'
import { connect } from 'react-redux'                           // 用来连接redux中reducer中全局数据的
import {userLoginACD} from '../utils/umo'
import {login} from '../api/user'
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
    this.handleLogin()
  }
  handleLogin = async () => {
    const workno = GetQueryString('workno')
    const password = GetQueryString('password')
    if(!workno || !password) {
      message.info('url上没有带对应的参数')
      return
    }
    try {
      // const {data} = await login({workno, password})
      const data = {
        code: 0,
        content: {
          deptName: '上海',
          roleList: [{id:1,roleName:'组长'}, {id:2,roleName:'普通员工'}],
          extNum: 1001,
          userName: '张太胖'
        }
      }
      if(data.code === 0) {
        const {roleList, extNum, userName, deptName} = data.content
        // 保存状态
        const userInfo = {
          userName, // 工号
          extNum, // 密码
          roleList: roleList,
          deptName,
          workno,
        }
        localStorage.setItem('userInfo',JSON.stringify(userInfo))
        this.props.updateUserInformation({
         ...userInfo
        })
        const loginUmoInfo = {
          ...userInfo,
          domain: '10.131.172.82',
          passWord: '123456'
        }
        const isHasExtNum = roleList.findIndex((item)=>item.id == 1)
        if(isHasExtNum !== -1) {
          this.loginUmoSystem(loginUmoInfo)
        }
        this.setState({
          loading: false
        })
         sessionStorage.setItem('isLogin', true)
         this.props.history.push('/')
      } else {
      }
    } catch (error) {
      console.log(error)
    } 
  }
  // handleSubmit = async (e) => {
  //   e.preventDefault();
  //   this.props.form.validateFields( async (err, values) => {
  //     if (!err) {
  //       console.log('Received values of form: ', values);
  //       const {workno, password} = values
  //       try {
  //         // const data = {
  //         //   code: 0,
  //         //   content: {
  //         //     deptName: '上海',
  //         //     roleList: [{id:1,roleName:'组长'}, {id:2,roleName:'普通员工'}],
  //         //     extNum: 1001,
  //         //     userName: '张太胖'
  //         //   }
  //         // }
  //         if(data.code === 0) {
  //           const {roleList, extNum, userName, deptName} = data.content
  //           // 保存状态
  //           const userInfo = {
  //             userName, // 工号
  //             extNum, // 密码
  //             roleList: roleList,
  //             deptName,
  //             workno,
  //           }

  //           localStorage.setItem('userInfo',JSON.stringify(userInfo))

  //           this.props.updateUserInformation({
  //            ...userInfo
  //           })
  //           const loginUmoInfo = {
  //             ...userInfo,
  //             domain: '10.131.172.82',
  //             passWord: '123456'
  //           }
  //           this.loginUmoSystem(loginUmoInfo)
  //           this.setState({
  //             loading: false
  //           })
  //            sessionStorage.setItem('isLogin', true)
  //            this.props.history.push('/')
  //         } else {

  //         }
  //       } catch (error) {
          
  //       }
        
       
      

        
  //       // userName: jsonUserInformation.userName || '',
  //       // extNum: jsonUserInformation.extNum || '',
  //       // roleList: jsonUserInformation.roleList || [],
  //       // deptName:  jsonUserInformation.deptName || '',
  //       // workno:  jsonUserInformation.workno || '',
  //         // localStorage.setItem('userInfo',JSON.stringify(userInfo))
    
  //       // 登录成功
        
       
  //     } else {
        
  //     }
  //   });
  // }
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
      return null
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
