
import {isLoaded, isEmpty, dataToJS, pathToJS } from 'react-redux-firebase'
import store from '../store'
import {toggleSplash, setUserName, setSplashErrorData, toggleSplashError, storeUid, storeUserName, avatarFileUse} from './uiActions'

export function fireSendData(destination = '', data = 'blankData'){
  return {
    type: 'FIRE_SEND_DATA',
    payload: {
      destionation: destination,
      data: data
    }
  }
}

export function fireSendFile(destination = '', file = ''){
  return {
    type: 'FIRE_SEND_FILE',
    payload: {
      destination: destination,
      file: file
    }
  }
}

export function fireUserLogin(){
  return {
    type: 'FIRE_USER_LOGIN'
  }
}

export function fireLoginWithProvider(firebase, provider){
    return (dispatch) => {
      firebase.login({
        provider: provider,
        type: 'popup'
      }).then((authUid) => {
        console.dir(authUid)
        dispatch(toggleSplash())
        dispatch(setUserName(authUid.profile.displayName))
        dispatch(storeUserName(authUid.profile.displayName))
        dispatch(avatarFileUse(authUid.profile.avatarUrl))
        dispatch(storeUid(authUid.user.uid))
      }).catch((error) => {
        dispatch(setSplashErrorData(error.code, error.message))
        dispatch(toggleSplashError(true))
      })
  }
}
