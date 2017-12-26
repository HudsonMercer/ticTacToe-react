import {combineReducers} from 'redux'

import firebaseReducers from './firebaseReducers'
import uiReducers from './uiReducers'

const reducers = combineReducers(uiReducers, firebaseReducers)
export default reducers
