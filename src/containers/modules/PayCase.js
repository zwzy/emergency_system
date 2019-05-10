import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'                           // 用来连接redux中reducer中全局数据的

import {ThemeContext, PowerContext} from '../../utils/context'

import Pay from '../../components/modules/Pay'                 // 引用的ui组件

export class PayCase extends Component {
  // static contextType = ThemeContext;
  static propTypes = {
    // prop: PropTypes
  }
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    return (
      <ThemeContext.Consumer>
        {(theme)=>(
            <PowerContext.Consumer>
              {(power) =>(
                  <Pay theme={theme}  power={power} />
              )}
            </PowerContext.Consumer>
        )}
      </ThemeContext.Consumer>
    )
  }
}
// PayCase.contextType = ThemeContext
const mapStateToProps = (state) => ({                  // owProps 是这个容器组件接收的props值，因为在处理时可能要用到他
})
const mapDispatchToProps = (dispatch) => ({            // 引用全局actions中定义方法
})
export default connect(mapStateToProps, mapDispatchToProps)(PayCase)
