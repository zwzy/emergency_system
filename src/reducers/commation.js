// 通话概括信息
const commationInfoState = {
  callId: '',           // 通话id
  mobile:'--',          // 号码
  callDate: '--',       // 来电时间
  answerDate: '--',     // 接听时间
  hangupDate: '--',     // 挂断时间
  callDuration: '--',   // 通话时长
  callStatus: '--'      // 通话状态
}
const commationInfo = (state = commationInfoState, action) => {
  switch (action.type) {
    case 'UPDATE_COMMATION_INFORMATION':
      return {
        ...state,
        ...action.commationInfo
      }
    case 'RESEET_COMMATION_INFORMATION':
      console.log(999)
      return commationInfoState
    default:
      return state
  }
}
export default commationInfo