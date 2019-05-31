const jsonUserInformation = sessionStorage.getItem('userInformation') ? JSON.parse(sessionStorage.getItem('userInformation')) : {}

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