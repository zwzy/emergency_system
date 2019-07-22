import React, { Component } from './node_modules/react'
import PropTypes from './node_modules/prop-types'
import { connect } from './node_modules/react-redux'                           // 用来连接redux中reducer中全局数据的

import Console from '../../components/menu/Console'                 // 引用的ui组件

export class ConsoleCase extends Component {
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
      <div>
         <Console />
      </div>
    )
  }
}
const mapStateToProps = (state) => ({                  // owProps 是这个容器组件接收的props值，因为在处理时可能要用到他
})
const mapDispatchToProps = (dispatch) => ({            // 引用全局actions中定义方法
})
export default connect(mapStateToProps, mapDispatchToProps)(ConsoleCase)
