
import {isLoaded, isEmpty, dataToJS, pathToJS } from 'react-redux-firebase'
import store from '../store'
import {toggleSplash, setSplashErrorData, toggleSplashError, storeUid, storeUserName, avatarFileUse, storeCookieData, setColorScheme, uiHostNewGame, uiJoinGame} from './uiActions'

export function fireSendData(firebase, destination = '', data = 'blankData'){
  return (dispatch) => {
    firebase.update(destination, data)
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
        dispatch(setSplashErrorData(error.code, error.message, 'Error'))
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
      dispatch(setSplashErrorData(error.code, error.message, 'Error'))
      dispatch(toggleSplashError(true))
    })
  }
}

export function fireLoginEmail(firebase){
  let email = document.getElementById('splashNameInput').value
  let password = document.getElementById('splashPasswordInput').value
  return (dispatch) => {
    firebase.login({email: email, password: password}).then((authData) => {
      dispatch(storeUid(authData.uid))
      dispatch(toggleSplash())
      dispatch(storeCookieData(store.getState().userState))
      dispatch(fireGetColorScheme(firebase))
    }).catch((error) => {
      dispatch(setSplashErrorData(error.code, error.message, 'Error'))
      dispatch(toggleSplashError(true))
    })
  }
}

export function fireCreateUser(firebase){

  let email = document.getElementById('splashNameInput').value
  let password = document.getElementById('splashPasswordInput').value
  let username = 'default'

  return (dispatch) => {
    console.log('create user dispatch fired')
    firebase.createUser({email, password},{username, email}).then((e) => {
      dispatch(setSplashErrorData('New user created', 'Ready to login now with the E-mail and password you used.', 'New Account Created'))
      dispatch(toggleSplashError(true))
    }).catch((error) => {
      dispatch(setSplashErrorData(error.code, error.message, 'Error'))
      dispatch(toggleSplashError(true))
    })
  }
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

export function fireHostGame(firebase, gameUid){
  return (dispatch) => {

    let userState = store.getState().userState
    dispatch(uiHostNewGame(gameUid))
    dispatch(
      fireSendData(firebase, `lobby/games/${userState.uid}`,
        {
          host: userState.userName,
          status: 'Awaiting challenger...',
          client: '',
          observers: ['test1','test2', 'test3'],
          boardState: ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
          playerTurn: 'host',
          uid: gameUid,
        }
      )
    )
  }
}

export function fireJoinGame(firebase, gameUid){
  return (dispatch) => {

    let userState = store.getState().userState
    dispatch(uiJoinGame(gameUid))

  }
}

export function fireSetPlayerTurn(firebase, gameHostUid, currentTurn){
  let playerTurn = {}

  switch(currentTurn){
    case 'host':
      if(store.getState().userState.isHost === true){
        playerTurn = {playerTurn: 'client'}
      }
    break
    case 'client':
      if(store.getState().userState.isHost === false){
        playerTurn = {playerTurn: 'host'}

      }
    break
    default:
    playerTurn = {playerTurn: currentTurn}
    break
  }


  return (dispatch) => {
    dispatch(fireSendData(firebase, `lobby/games/${gameHostUid}/`, playerTurn))
  }
}
