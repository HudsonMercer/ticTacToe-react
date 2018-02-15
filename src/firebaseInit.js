import { reactReduxFirebase, firebaseStateReducer } from 'react-redux-firebase'
import {createStore, compose} from 'redux'
import firebaseui from 'firebaseui'

import uuidv4 from 'uuid'

const config ={
  apiKey: "AIzaSyCWcbz2SwfHQDkVq9qu0_UmJT9giOVNVrM",
  authDomain: "tictactoe-b8474.firebaseapp.com",
  databaseURL: "https://tictactoe-b8474.firebaseio.com",
  projectId: "tictactoe-b8474",
  storageBucket: "tictactoe-b8474.appspot.com",
  messagingSenderId: "1097292712686"
}
const reduxFirebaseConfig = { userProfile: 'userProfiles' }
// Add reactReduxFirebase store enhancer
const createStoreWithFirebase = compose(reactReduxFirebase(config, reduxFirebaseConfig))(createStore)

export const firebaseInstanceUUID = uuidv4()
export default createStoreWithFirebase
