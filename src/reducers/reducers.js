import {combineReducers} from 'redux'
import { firebaseStateReducer } from 'react-redux-firebase'
import uiReducers from './uiReducers'

const reducerList = {
  ...uiReducers,
  firebase: firebaseStateReducer
}

const reducers = combineReducers(reducerList)
export default reducers
