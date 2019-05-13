import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Header from '../components/Header'

import {updateUserInformation} from '../actions/user'

export class HeaderCase extends Component {
  static propTypes = {
    userInformation: PropTypes.object
  }
  constructor(props) {
    super(props)
    this.state = {
       isLogin: false
    }
  }
  _updateUserInformation = () => {
    const {userInformation, updateUserInformation} = this.props
    if(userInformation.theme === 'white') {
      updateUserInformation({theme: 'black',  power: 1})
    } else {
      updateUserInformation({theme: 'white', power: 2})
    }
  }
  logOutEvent = () => {
    sessionStorage.clear()
    localStorage.clear()
    this.props.history.push('login')
  }
  render() {
    const {isLogin} = this.state
    return (
      <Header isLogin={isLogin} logOutEvent={() => this.logOutEvent()}></Header>  
    )
  }
}



export default withRouter(HeaderCase)