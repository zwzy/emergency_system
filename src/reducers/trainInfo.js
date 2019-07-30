// 通话概括信息
const trainInfoState = {
  driverCode: '--',
  driverName: '--',
  driverMobile: '--',
  assisCode: '--',
  assisName: '--',
  assisMobile: '--',
  zone: '--',
  frontStation: '--',
  activePosition: '--',
  outDate: '--',
  deptName: '--',
  guideGroup: '--',
  trainNum: '--',
  model: '--',
  trainCode: '--'
}
const trainInfo = (state = trainInfoState, action) => {
  switch (action.type) {
    case 'UPDATE_TRAIN_INFORMATION':
      return {
        ...state,
        ...action.trainInfo
      }
    case 'RESEET_TRAIN_INFORMATION':
      return trainInfoState
    default:
      return state
  }
}
export default trainInfo