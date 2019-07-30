import { combineReducers } from 'redux'
import user from './user'
import config from './config'
import commation from './commation'
import umoEvent from './umoEvent'
import trainInfo from './trainInfo'

const rootReducer = combineReducers({
  trainInfo,
  user: user,
  config,
  commation,
  umoEvent
})

export default rootReducer