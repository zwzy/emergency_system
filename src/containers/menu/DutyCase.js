import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'                           // 用来连接redux中reducer中全局数据的

import Duty from '../../components/menu/Duty'                 // 引用的ui组件

export class DutyCase extends Component {
  static propTypes = {
    // prop: PropTypes
  }
  constructor(props) {
    super(props)
    this.state = {
      tableColumns: [ // 签到记录表头
        {
          title: '序号',
          dataIndex: 'id',
        },
        {
          title: '部门',
          dataIndex: 'apartment',
        },
        {
          title: '职位',
          dataIndex: 'job'
        },
        {
          title: '姓名',
          dataIndex: 'name',
        },
        {
          title: 'IP',
          dataIndex: 'ipnum',
        },
        {
          title: '签到时间',
          dataIndex: 'createtime'
        }
      ],
      tableData:[], // 签到记录表数据
      dutyType: 0, // 0 签到总览， 1 签到记录
      allTabledata: [ // 签到总览表数据
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          tel: '0571-22098909',
          phone: 18889898989,
          address: 'New York No. 1 Lake Park',
        },
        {
          key: '2',
          name: 'Jim Green',
          tel: '0571-22098333',
          phone: 18889898888,
          age: 42,
          address: 'London No. 1 Lake Park',
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          tel: '0575-22098909',
          phone: 18900010002,
          address: 'Sidney No. 1 Lake Park',
        },
        {
          key: '4',
          name: 'Jim Red',
          age: 18,
          tel: '0575-22098909',
          phone: 18900010002,
          address: 'London No. 2 Lake Park',
        },
        {
          key: '5',
          name: 'Jake White',
          age: 18,
          tel: '0575-22098909',
          phone: 18900010002,
          address: 'Dublin No. 2 Lake Park',
        }
      ],
      allTablecolumns: [ // 签到总览表表头
        {
          title: 'Name',
          dataIndex: 'name',
          render: (text, row, index) => {
            if (index < 4) {
              return <a href="javascript:;">{text}</a>;
            }
            return {
              children: <a href="javascript:;">{text}</a>,
              props: {
                colSpan: 5,
              },
            };
          },
        },
        {
          title: 'Age',
          dataIndex: 'age',
          render: this.renderContent,
        },
        {
          title: 'Home phone',
          colSpan: 2,
          dataIndex: 'tel',
          render: (value, row, index) => {
            const obj = {
              children: value,
              props: {},
            };
            if (index === 2) {
              obj.props.rowSpan = 2;
            }
            // These two are merged into above cell
            if (index === 3) {
              obj.props.rowSpan = 0;
            }
            if (index === 4) {
              obj.props.colSpan = 0;
            }
            return obj;
          },
        },
        {
          title: 'Phone',
          colSpan: 0,
          dataIndex: 'phone',
          render: this.renderContent,
        },
        {
          title: 'Address',
          dataIndex: 'address',
          render: this.renderContent,
        },
      ]
    }
  }
  renderContent = (value, row, index) => {
    const obj = {
      children: value,
      props: {},
    };
    if (index === 4) {
      obj.props.colSpan = 0;
    }
    return obj;
  }
  componentDidMount(){
    let tempData = []
    for (let i = 0; i < 46; i++) {
      tempData.push({
        key: i,
        id: i,
        apartment: 'haha',
        job: 'hhhh',
        name: 'dez',
        ipnum:'2222',
        createtime: `no. ${i}`
      })
    }
    this.setState({
      tableData: tempData
    })
  }
  changeDutyType = (index) => {
    this.setState({
      dutyType: index
    })
  }
  render() {
    let {tableColumns,tableData, dutyType, allTabledata, allTablecolumns} = this.state
    return (
      <div>
        <Duty
         data={{
          tableData,
          tableColumns,
          dutyType,
          allTabledata,
          allTablecolumns
         }}
         event={{
          changeDutyType: this.changeDutyType
         }}
        />
      </div>
    )
  }
}
const mapStateToProps = (state) => ({                  // owProps 是这个容器组件接收的props值，因为在处理时可能要用到他
})
const mapDispatchToProps = (dispatch) => ({            // 引用全局actions中定义方法
})
export default connect(mapStateToProps, mapDispatchToProps)(DutyCase)
