import React, { Component } from 'react'
import {GetQueryString} from '../utils/common'
import { connect } from 'react-redux'                           // 用来连接redux中reducer中全局数据的
import {updateUmoEventState, resetUmoEventState} from '../actions/umo'
import {updateUserInformation} from '../actions/user'
import {login} from '../api/user'
import { Redirect } from "react-router-dom";
import { message, Form} from 'antd' 
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
  handleLogin = async () => {
    const workno = GetQueryString('workno') || localStorage.getItem('workno')
    const password = GetQueryString('password') || localStorage.getItem('password')
    if(!workno || !password) {
      message.info('url上没有带对应的参数')
      return
    }
    localStorage.setItem('workno', workno)
    localStorage.setItem('password', password)
    console.log(workno, password)
    try {
      const {data} = await login({workno, password})
      // const data = {
      //   code: 0,
      //   content: {
      //     deptName: '上海',
      //     roleList: [{id:1,roleName:'组长'}, {id:2,roleName:'普通员工'}],
      //     extNum: 1001,
      //     userName: '张太胖',
      //     mobile: '18755489161'
      //   }
      // }
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

  render() {
    let { from } = this.props.location.state || { from: { pathname: "/" } };
    let { isLogin } = this.state;
    if (isLogin) return (<Redirect to={from} />)
    return  null
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
