// menu config
export const menuList = [
  {
    subId: 'console',
    subName: '控制台',
    subIcon: 'icon-normal',
    menus:[]
  },
  { 
    path: 'emergency',
    subId: 'emergency',
    subName: '应急处置',
    subIcon: 'icon-yingjichuli',
    menus: [
      {
        id: 'emergency_telegram',
        name: '来电记录',
      },
      {
        id: 'emergency_handle',
        name: '处置记录'
      },
      {
        id: 'emergency_evaluation',
        name: '分析评价'
      },
      {
        id: 'emergency_classic',
        name: '经典案例'
      },
      
    ]
  },
  {
    subId: 'attendance',
    subName: '值班签到',
    subIcon: 'icon-Sign',
    menus: [
      // {
      //   id: 'attendance_plan',
      //   name: '值班计划',
      // },
      // {
      //   id: 'attendance_management',
      //   name: '值班管理',
      // },
    ]
  },
  {
    subId: 'communication',
    subName: '应急通讯录',
    subIcon: 'icon-tongxunlu',
    menus: [
      {
        id: 'communication_contact',
        name: '通讯录',
      },
      {
        id: 'communication_group',
        name: '通讯群组',
      }
    ]
  },
  {
    subId: 'rules',
    path: 'rules',
    subName: '规章制度',
    subIcon: 'icon-cz-gzzd',
    menus:[
      {
        id:'rules_group',
        name: '规章制度',
      },
      {
        id:'rules_built',
        name: '新建规章制度'
      }
    ]
  },
  {
    subId: 'count',
    subName: '统计查询',
    subIcon: 'icon-tongji',
    menus: [
      {
        id: 'count_sign',
        name: '签到查询',
      },
      {
        id: 'count_assess',
        name: '评价查询',
      },
      {
        id: 'count_handle',
        name: '应急处置分析',
      },
    ]
  },
  {
    subId: 'setting',
    subName: '系统设置',
    subIcon: 'icon-xitongshezhi1',
    menus: [
      {
        id: 'setting_user',
        name: '角色管理',
      },
      {
        id: 'setting_account',
        name: '账号管理',
      },
      {
        id: 'setting_operationLog',
        name: '操作日志',
      },
      {
        id: 'setting_kanBanUpdate',
        name: '看板维护',
      },
    ]
  },
]
// header btn config
export const btnlist = [
  {cla:'icon-dianhua1', tit: '接听', eventName: 'callInEvent'},
  {cla:'icon-guaduan', tit: '挂断', eventName: 'hangUpEvent'},
  {cla:'icon-mobile', tit: '拨打', eventName: 'callOutEvent'},
  {cla:'icon-Hold-TheLine', tit: '保持', eventName: 'callKeepEvent'},
  {cla:'icon-zhuanjie', tit: '转接', eventName: 'callOtherEvent'},
  {cla:'icon-bhjpaidui', tit: '队列', eventName: 'callQueueEvent'}
]
// config
export default  {
  HEADER_HEIGHT: 65,            // 头部高度
  DIVIDER_HEIGHT: 10,           // 分隔距离
  CONTENT_PADDING: 15,          // 内容内边距
  SIDER_WIDTH: 222,             // 侧边栏宽度
}
