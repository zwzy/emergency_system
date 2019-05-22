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
    this.searchParams = {// 筛选条件
      pageSize: 10,
      pageIndex: 1,
      apartment:'',
      job:'',
      username:'',
      worktime: ''
    }
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
      tableData: [], // 签到记录表数据
      dutyType: 0, // 0 签到总览， 1 签到记录
      allTabledata: [ // 签到总览表数据
        {
          key: '1',
          apart: '段值班领导',
          name: '11'
        },
        {
          key: '2',
          apart: '运用专业',
          name: '22'
        },
        {
          key: '3',
          apart: '技术专业',
          name: '33'
        },
        {
          key: '4',
          apart: '应急指挥专员',
          name: '44'
        },
        {
          key: '5',
          apart: '应急指挥专员',
          name: '55'
        }
      ],
      allTablecolumns: [ // 签到总览表表头
        {
          title: '序号',
          dataIndex: 'key',
          width: '100px'
        },
        {
          title: '部门',
          dataIndex: 'apart',
          width: '232px',
          render: this.renderContent,
        },
        {
          title: '签名',
          dataIndex: 'name'
        }
      ],
      allTabledata1: [ // 签到总览表数据（下半部分）
        {
          key: '1',
          apart: '合肥东运用',
          name: '11',
          dayname:'',
          dayname1:'',
          nightname:'',
          nightname1:''
        },
        {
          key: '2',
          apart: '合肥西运用',
          name: '22',
          dayname:'',
          dayname1:'',
          nightname:'',
          nightname1:''
        },
        {
          key: '3',
          apart: '动车运用',
          name: '33',
          dayname:'',
          dayname1:'',
          nightname:'',
          nightname1:''
        },
        {
          key: '4',
          apart: '合肥运用',
          name: '44',
          dayname:'',
          dayname1:'',
          nightname:'',
          nightname1:''
        },
        {
          key: '5',
          apart: '芜湖运用',
          name: '55',
          dayname:'',
          dayname1:'',
          nightname:'',
          nightname1:''
        },
        {
          key: '6',
          apart: '阜阳运用',
          name: '11',
          dayname:'',
          dayname1:'',
          nightname:'',
          nightname1:''
        },
        {
          key: '7',
          apart: '淮南运用',
          name: '22',
          dayname:'',
          dayname1:'',
          nightname:'',
          nightname1:''
        },
        {
          key: '8',
          apart: '绩溪运用',
          name: '33',
          dayname:'',
          dayname1:'',
          nightname:'',
          nightname1:''
        },
        {
          key: '9',
          apart: '青龙山运用',
          name: '44',
          dayname:'',
          dayname1:'',
          nightname:'',
          nightname1:''
        },
        {
          key: '10',
          apart: '合肥检修',
          name: '55',
          dayname:'',
          dayname1:'',
          nightname:'',
          nightname1:''
        },
        {
          key: '11',
          apart: '阜阳检修',
          name: '44',
          dayname:'',
          dayname1:'',
          nightname:'',
          nightname1:''
        },
        {
          key: '12',
          apart: '芜湖检修',
          name: '55',
          dayname:'',
          dayname1:'',
          nightname:'',
          nightname1:''
        }
      ],
      allTablecolumns1: [ // 签到总览表表头（下半部分）
        {
          title: '',
          dataIndex: 'key',
          width: '100px'
        },
        {
          title: '车间',
          dataIndex: 'apart',
          width: '233px',
        },
        {
          title: '应急值守人员',
          dataIndex: '',
          children: [
            {
              title: '白班',
              dataIndex: 'dayname',
            },{
              title: '夜班',
              dataIndex: 'nightname'
            }
          ]
        },
        {
          title: '值班人员',
          dataIndex: '',
          children: [
            {
              title: '白班',
              dataIndex: 'dayname1'
            },{
              title: '夜班',
              dataIndex: 'nightname1'
            }
          ]
        }
      ]
    }
  }
  renderContent = (value, row, index) => {
    const obj = {
      children: value,
      props: {}
    }
    if (index === 2) {
      obj.props.rowSpan = 0;
    }
    if (index === 1) {
      return {
        children: <div style={{display:'flex',flexDirection:'row'}}>
          <div style={{width:'72px',height:'108px',overflow:'hidden', textAlign:'center', borderRight:'1px solid #e8e8e8',boxSizing:'border-box'}}>
            <div style={{height:'20px',overflow:'hidden',marginTop:'4px'}}>段</div>
            <div style={{height:'20px',overflow:'hidden'}}>值</div>
            <div style={{height:'20px',overflow:'hidden'}}>班</div>
            <div style={{height:'20px',overflow:'hidden'}}>领</div>
            <div style={{height:'20px',overflow:'hidden'}}>导</div>
          </div>
          <div style={{display:'flex',flexDirection:'column',width:'160px'}}>
            <div style={{textAlign:'center',height: '54px',lineHeight: '54px',borderBottom:'1px solid #e8e8e8'}}>运用专业</div>
            <div style={{textAlign:'center',height: '54px',lineHeight: '54px'}}>技术专业</div>
          </div>
        </div>,
        props: {
          rowSpan : 2
        },
        className:'haha'
      }
    } else {
      return obj;
    }
  }
  componentDidMount(){
    let tempData = []
    for (let i = 0; i < 5; i++) {
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
  setClass = (item,index)=> {
    console.log('item===',item)
    if(index === 1){
      return 'tdnopad'
    }
  }
  // 输入框筛选条件
  handleInputVal = (e, type) => {
    this.searchParams[type] = e.target.value
  }
  clickSearch= ()=>{
    console.log('searchParams=',this.searchParams)
  }
  render() {
    let {tableColumns,tableData, dutyType, allTabledata, allTablecolumns,allTabledata1, allTablecolumns1} = this.state
    return (
      <div>
        <Duty
         data={{
          tableData,
          tableColumns,
          dutyType,
          allTabledata,
          allTablecolumns,
          allTabledata1,
          allTablecolumns1
         }}
         event={{
          changeDutyType: this.changeDutyType,
          setClass: this.setClass,
          handleInputVal: this.handleInputVal,
          clickSearch:this.clickSearch
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
