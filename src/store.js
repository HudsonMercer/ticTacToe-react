import {createStore, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'
import createStoreWithFirebase from './firebaseInit'
import reducers from './reducers/reducers'
import AvatarImg from './res/avatar.png'
import uuidv4 from 'uuid'

const initState = {
  userState: {
    userName: '',
    uid: '',
    isPlaying: false,
  },
  avatarImg: AvatarImg,
  quickNavigationState: {
    isOpen: false,
    activeItem: 'lobby',
  },
  settingsState:{
    activeItem: 'lobby',
    isOpen: false,
  },
  splashState: {
    errorDialog: {
      isOpen: false,
      error: 'No error',
      message: "If you're reading this, somebody forgot to disable this error dialog by default and you can safely click okay and ignore this message.",
      title: 'Error',
    },
    isOpen: true,
  },
  colorScheme: {
    red: 0,
    green: 0,
    blue: 0,
  },
  lobbyState: {
    isOpen: true,
    activeItem: 'chat',
    lobbyGames: [],
    chatInputText: '',
  },
  uiState:{
    activeView: 'lobby'
  },
  gameBoardState: {
    userLeftDialogIsOpen: false,
    timeLeft: 3,
    leavingGame: false,
  }
}



const middleware = applyMiddleware(thunk, createLogger())
const store = createStoreWithFirebase(reducers, initState, middleware)
export default store
