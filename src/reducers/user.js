const jsonUserInformation = sessionStorage.getItem('userInformation') ? JSON.parse(sessionStorage.getItem('userInformation')) : {}

const initUserState = {
  name: jsonUserInformation.name || '',
  phone: jsonUserInformation.phone || '',
  theme: jsonUserInformation.theme || 'white',        // white black
  power: jsonUserInformation.theme || 1,              // power 1,2,3,4,5  普通，组长，经理，总监，董事长
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