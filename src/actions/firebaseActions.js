
import {isLoaded, isEmpty, dataToJS, pathToJS } from 'react-redux-firebase'
import store from '../store'
import {toggleSplash, setSplashErrorData, toggleSplashError, storeUid, storeUserName, avatarFileUse, storeCookieData, setColorScheme} from './uiActions'

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
      }).then((authData) => {
        dispatch(toggleSplash())
        dispatch(storeUserName(authData.profile.displayName))
        dispatch(avatarFileUse(authData.profile.avatarUrl))
        dispatch(storeUid(authData.user.uid))
        dispatch(fireGetColorScheme(firebase))
      }).catch((error) => {
        dispatch(setSplashErrorData(error.code, error.message))
        dispatch(toggleSplashError(true))
      })
  }
}

export function fireLoginAnon(firebase){
  return (dispatch) => {
    firebase.auth().signInAnonymously().then((authData) => {
      dispatch(storeUserName('Anonymous'))
      dispatch(storeUid(authData.uid))
      dispatch(toggleSplash())
      dispatch(storeCookieData(store.getState().userState))
      dispatch(fireGetColorScheme(firebase))
    }).catch((error) => {
      dispatch(setSplashErrorData(error.code, error.message))
      dispatch(toggleSplashError(true))
    })
  }
}

export function fireLoginEmail(){


}

export function fireSaveColorScheme (colorScheme, firebase){
  return (dispatch) => {
    firebase.update(`userProfiles/${store.getState().userState.uid}/colorScheme`, colorScheme).then(dispatch(fireSaveColorSchemeComplete())
    )
  }
}

export function fireSaveColorSchemeComplete(){
  return {
    type: 'FIRE_SAVE_COLOR_SCHEME_COMPLETE'
  }
}

export function fireGetColorScheme(firebase){
  return (dispatch) => {
    firebase.database().ref(`userProfiles/${store.getState().userState.uid}/colorScheme`).once('value', (data) => {
      if(data.val() !== null){
       dispatch(setColorScheme(data.val().red, data.val().green, data.val().blue))}
    })

  }
}
