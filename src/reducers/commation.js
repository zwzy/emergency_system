// 通话概括信息

const commationInfoState = {
  phoneNumber:'--', // 号码
  timer: '--',  // 当前通话时长
  comeTime: '--', // 来电时间
  talkStartTime: '--',  // 接听时间
  handupTime: '--', // 挂断时间
  talkTimer: '--' // 通话时长
}
const commationInfo = (state = commationInfoState, action) => {
  switch (action.type) {
    case 'UPDATE_COMMATION_INFORMATION':
      return {
        ...state,
        ...action.commationInfo
      }
    default:
      return state
  }
}
export default commationInfo