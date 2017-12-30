import {createStore, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'
import createStoreWithFirebase from './firebaseInit'
import reducers from './reducers/reducers'
import AvatarImg from './res/avatar.png'
import uuidv4 from 'uuid'

const initState = {
  userName: '',
  avatarImg: AvatarImg,
  quickNavigationState: {
    isOpen: false,
    activeItem: 'lobby',
  },
  settingsState:{
    activeItem: 'general',
    isOpen: false,
  },
  splashState: {
    isOpen: true,
  },
  colorScheme: {
    red: 0,
    green: 0,
    blue: 0,
  },
  lobbyState: {
    isOpen: true,
    lobbyGames: [],
  },
  uiState:{
    activeView: 'lobby'
  }
}



const middleware = applyMiddleware(thunk, createLogger())
const store = createStoreWithFirebase(reducers, initState, middleware)
export default store
