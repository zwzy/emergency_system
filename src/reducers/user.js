const jsonUserInformation = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {}
console.log(jsonUserInformation)
const initUserState = {
  userName: jsonUserInformation.userName || '',
  extNum: jsonUserInformation.extNum || '',
  roleList: jsonUserInformation.roleList || [],
  workno:  jsonUserInformation.workno || '',
  deptName: jsonUserInformation.deptName || '',
  mobile: jsonUserInformation.mobile || ''
}
const user = (state = initUserState, action) => {
  switch (action.type) {
    case 'UPDATE_USER_INFORMATION':
      return {
        ...state,
        ...action.userInformation
      }
    default:
      return state
  }
}
export default user