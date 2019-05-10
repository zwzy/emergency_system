import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'

import {withRouter} from 'react-router-dom'

import Sider from '../components/Sider'

console.log(compose)
export class SiderCase extends Component {
  static propTypes = {
    // userInformation: PropTypes.object
  }

  
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: -1,
      siderMenuData: [
        { path: '/', name: '收入' },
        { path: '/pay', name: '支出' },
        { path: '/set', name: '设置' },
      ],
    }
  }
  componentDidMount() {
    const pathname = this.props.history.location.pathname
    const activeIndex = this.state.siderMenuData.findIndex((item)=> item.path === pathname)
    this.setState({
      activeIndex
    })
  }
  switchMenu(index) {
    const {activeIndex, siderMenuData} = this.state
    if(activeIndex !== index) {
      this.props.history.push(siderMenuData[index].path)
    }

  }

  render() {
    const {activeIndex, siderMenuData} = this.state
    return (
      <Sider activeIndex={activeIndex} siderMenuData={siderMenuData} onSwitchMenu={(index)=>{console.log(this);this.switchMenu(index)}}></Sider>  
    )
  }
}

const mapStateToProps = (state) => ({
})
const mapDispatchToProps = (dispatch) => ({
})
const connectComponent = connect(mapStateToProps, mapDispatchToProps)(SiderCase)
export default withRouter(connectComponent)
