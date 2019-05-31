const jsonUserInformation = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {}
console.log(jsonUserInformation)
const initUserState = {
  userName: jsonUserInformation.userName || '',
  extNumber: jsonUserInformation.extNumber || '',
  passWord: jsonUserInformation.passWord || '',
  domain: jsonUserInformation.domain || '',
  userPost: jsonUserInformation.userPost || ''
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