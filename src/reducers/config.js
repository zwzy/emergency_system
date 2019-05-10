const initConfigState = {
  isLogin: sessionStorage.getItem('isLogin') || false
}
const config = (state = initConfigState, action) => {
  switch (action.type) {
    case 'UPDATE_CONFIG':
      return [
        ...state,
        ...action.config
      ]
    default:
      return state
  }
}
export default config