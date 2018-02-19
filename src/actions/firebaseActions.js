
import {isLoaded, isEmpty, dataToJS, pathToJS } from 'react-redux-firebase'
import store from '../store'
import {toggleSplash, setSplashErrorData, toggleSplashError, storeUid, storeUserName, avatarFileUse, storeCookieData, setColorScheme, uiHostNewGame, uiJoinGame} from './uiActions'

export function fireSendData(firebase, destination = '', data = {debug: 'ERROR BAD DATA SENT'}, thenCallback){
  return (dispatch) => {
    firebase.update(destination, data)
  }
}

export function fireSendFile(firebase, dest = '', file = ''){
  return (dispatch) => {
    dispatch(
        {
          type: 'FIRE_SEND_FILE_STARTED'
        }
    )

  file.name = 'image'

  firebase.uploadFile(
    `/userProfiles/${dest}/avatar`,
    file,
    `/userProfiles/${dest}/avatar/meta`
  ).then(
      (val) => {
        dispatch({type: 'FIRE_SEND_FILE_SUCCESS', payload: val})
      },
      (err) => {
        dispatch({type: 'FIRE_SEND_FILE_FAIL', payload: err})
      }
    )
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
      firebase.database().ref(`/userProfiles/${authData.uid}/`).child(`displayName`).once('value').then(snap => {
          if (!snap.val()){
            dispatch(storeUserName('Anonymous'))
          } else {
            dispatch(storeUserName(snap.val()))
          }
        })
      firebase.storage().ref(`/userProfiles/${authData.uid}/avatar/image`).getDownloadURL().then(url => {
        dispatch(avatarFileUse(url))
      }).catch((error) => {
        dispatch(setSplashErrorData(error.code, error.message, 'Error'))
        dispatch(toggleSplashError(true))
      })
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
      fireSendData(firebase, `lobby/games/${gameUid}`,
        {
          host: userState.userName,
          status: 'Awaiting challenger...',
          client: '',
          observers: ['test1','test2', 'test3'],
          boardState: ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
          playerTurn: 'host',
          uid: gameUid,
          victory: false,
          score: {
            host: 0,
            client: 0,
          }
        }
      )
    )
  }
}

export function fireJoinGame(firebase, gameUid){
  return (dispatch) => {
    let userState = store.getState().userState
    dispatch(uiJoinGame(gameUid))
    dispatch(fireSendData(firebase, `/lobby/games/${gameUid}/`,
       {
         status: 'Playing',
         client: userState.userName,
       }))

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

export function fireUserLeaveGame(firebase, userUid, gameUid){
  return (dispatch) => {
    dispatch({type: 'USER_LEAVE_GAME', payload: {userUid, gameUid}})
    dispatch(fireSendData(firebase, `/lobby/games/${gameUid}/`, {leaverId: userUid}))
  }
}

export function fireDeleteGame(firebase, gameUid){
  firebase.remove(`/lobby/games/${gameUid}`)
  return (dispatch) => {
    dispatch({type: 'GAMEBOARD_RESET_LEAVING_GAME'})
    dispatch({type: 'FIRE_DELETE_GAME', payload: gameUid})
  }
}

export function fireResetGameBoard(firebase, gameUid){
  return (dispatch) => {
    firebase.update(`lobby/games/${gameUid}/`,
    {
      boardState: ['e','e','e','e','e','e','e','e','e'],
      playerTurn: 'host',
      winner: null,
      position: '',
      winDialogIsOpen: false,

    }).then(() => {
      firebase.update(`lobby/games/${gameUid}`,
      {
        victory: false,
      })
    })
 }
}

export function fireAddScore(firebase, gameUid, winner){
  let isHost = store.getState().userState.isHost
  if(isHost){
    return (dispatch) => {
      firebase.database().ref(`lobby/games/${gameUid}/score`).once('value').then((snap) => {
        let data = {}, isHost = store.getState().userState.isHost

        if(winner === 'x'){
          data = {
            score: {
              host: snap.val().host + 1,
              client: snap.val().client
            }
          }
        } else if(winner === 'o') {
          data ={
            score: {
              host: snap.val().host,
              client: snap.val().client + 1
            }
          }
        }
          firebase.update(`lobby/games/${gameUid}/`, data)
          return {type: 'WINGAME_EVENT_HOST'}
      })
    }
  } else {
    return {
      type: 'WINGAME_EVENT_CLIENT'
    }
  }
}
