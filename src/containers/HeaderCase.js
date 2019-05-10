import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

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
  render() {
    const {isLogin} = this.state
    const {userInformation} = this.props
    return (
      <Header userName={userInformation.name} theme={userInformation.theme} isLogin={isLogin} updateUserInformation={this._updateUserInformation}></Header>  
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userInformation: state.userInformation
  }
}

const mapDispatchToProps = (display)=>{
  return {
    updateUserInformation: (userInformation)=> display(updateUserInformation(userInformation))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(HeaderCase)