import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'                           // 用来连接redux中reducer中全局数据的

import Duty from '../../components/menu/Duty'                 // 引用的ui组件
import { signShow } from '../../api/user'
export class DutyCase extends Component {
  // static propTypes = {
    // prop: PropTypes
  // }
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
      signDate: (new Date()).toISOString().substr(0,10), // 日期参数,今天 'xxxx-xx-xx'
      dutyType: 0, // 0 签到总览， 1 签到记录
      // 签到总览表数据
      allTabledata: [
        {
          key: '1',
          apart: '段值班领导',
          name: ''
        },
        {
          key: '2',
          apart: '运用专业',
          name: ''
        },
        {
          key: '3',
          apart: '技术专业',
          name: ''
        },
        {
          key: '4',
          apart: '应急指挥专员',
          name: ''
        }
      ],
      // 签到总览表表头
      allTablecolumns: [
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
      // 签到总览表表头（下半部分）
      allTablecolumns1: [
        {
          title: '',
          dataIndex: 'key',
          width: '100px'
        },
        {
          title: '车间',
          dataIndex: 'deptName',
          width: '233px',
        },
        {
          title: '应急值守人员',
          dataIndex: '',
          children: [
            {
              title: '白班',
              dataIndex: 'yjDay',
              render: (value,row) => {
                let rowlist = row.yjDay
                return {
                  children: <div>
                    {
                      rowlist.map((item,index) => {
                        return (
                          <span key={index}>{index == rowlist.length - 1 ? item : item + ' , '}</span>
                        )
                      })
                    }   
                  </div>
                }
              }
            },{
              title: '夜班',
              dataIndex: 'yjNight',
              render: (value,row) => {
                let rowlist = row.yjNight
                return {
                  children: <div>
                    {
                      rowlist.map((item,index) => {
                        return (
                          <span key={index}>{index == rowlist.length - 1 ? item : item + ' , '}</span>
                        )
                      })
                    }   
                  </div>
                }
              }
            }
          ]
        },
        {
          title: '值班人员',
          dataIndex: '',
          children: [
            {
              title: '白班',
              dataIndex: 'zbDay',
              render: (value,row) => {
                let rowlist = row.zbDay
                return {
                  children: <div>
                    {
                      rowlist.map((item,index) => {
                        return (
                          <span key={index}>{index == rowlist.length - 1 ? item : item + ' , '}</span>
                        )
                      })
                    }
                    
                  </div>
                }
              }
            },{
              title: '夜班',
              dataIndex: 'zbNight',
              render: (value,row) => {
                let rowlist = row.zbNight
                return {
                  children: <div>
                    {
                      rowlist.map((item,index) => {
                        return (
                          <span key={index}>{index == rowlist.length - 1 ? item : item + ' , '}</span>
                        )
                      })
                    }
                  </div>
                }
              }
            }
          ]
        }
      ],
      allTabledata1: []// 签到总览表数据（下半部分）
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
          <div style={{width:'72px',height:'130px',overflow:'hidden', textAlign:'center', borderRight:'1px solid #e8e8e8',boxSizing:'border-box'}}>
            <div style={{height:'20px',overflow:'hidden',marginTop:'4px'}}>应</div>
            <div style={{height:'20px',overflow:'hidden'}}>急</div>
            <div style={{height:'20px',overflow:'hidden'}}>指</div>
            <div style={{height:'20px',overflow:'hidden'}}>挥</div>
            <div style={{height:'20px',overflow:'hidden'}}>干</div>
            <div style={{height:'20px',overflow:'hidden'}}>部</div>
          </div>
          <div style={{display:'flex',flexDirection:'column',width:'160px'}}>
            <div style={{textAlign:'center',height: '65px',lineHeight: '65px',borderBottom:'1px solid #e8e8e8'}}>运用专业</div>
            <div style={{textAlign:'center',height: '65px',lineHeight: '65px'}}>技术专业</div>
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
    this.getSignShow()
  }
  setClass = (item,index)=> {
    if(index === 1){
      return 'tdnopad'
    }
  }
  changeDutyType = (index) => {
    this.setState({
      dutyType: index
    },()=>{
      if(index === 0) {
        this.getSignShow()
      }
    })
  }
  getSignShow = async() => {
    let {allTabledata} = this.state
    try {
      const {data} = await signShow({date:this.state.signDate})
      // const data = {
      //   code: 0
      // }
      // let allTabledata1 = [
      //   {
      //     deptName: "合肥西运用",
      //     yjDay: ["张武"],
      //     yjNight: ["dez","hah"],
      //     zbDay: ["zw","kkk"],
      //     zbNight: ["张武"]
      //   },
      //   {
      //     deptName: "合肥东运用",
      //     yjDay: ["张四"],
      //     yjNight: [],
      //     zbDay: [],
      //     zbNight: ["张四"]
      //   }
      // ]
      if(data.code === 0) {
        let role_name = ['段值班领导','应急指挥干部(运用)','应急指挥干部(技术)','应急指挥专员']
        // 角色匹配
        data.content.all.forEach((item)=>{
          role_name.forEach((itemin,indexin)=>{
            if(item.roleName === itemin) {
              allTabledata[indexin].name = item.userName
            }
          })
        })
        let allTabledata1 = data.content.workplace || []
        allTabledata1.forEach((item,index)=>{
          item.key = index + 1
        })
        this.setState({
          allTabledata:allTabledata,
          allTabledata1: allTabledata1
        },()=>{
          // console.log('haddd=',this.state.allTabledata1)
        })
      }
    } catch (error) {
    }
  }
  render() {
    let { dutyType, allTabledata, allTablecolumns,allTabledata1, allTablecolumns1} = this.state
    return (
      <div>
        <Duty
         data={{
          dutyType,
          allTabledata,
          allTablecolumns,
          allTabledata1,
          allTablecolumns1
         }}
         event={{
          changeDutyType: this.changeDutyType,
          setClass: this.setClass
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
