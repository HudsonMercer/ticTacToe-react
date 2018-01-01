import {combineReducers} from 'redux'
import { firebaseStateReducer } from 'react-redux-firebase'
import firebaseReducers from './firebaseReducers'
import uiReducers from './uiReducers'

const reducerList = {
  ...uiReducers,
  ...firebaseReducers,
  firebase: firebaseStateReducer
}

const reducers = combineReducers(reducerList)
export default reducers
