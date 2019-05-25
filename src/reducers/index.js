import { combineReducers } from 'redux'
import user from './user'
import config from './config'
import commation from './commation'

const rootReducer = combineReducers({
  userInformation: user,
  config,
  commation
})

export default rootReducer