import {createStore} from 'redux'
import reducers from './reducers/reducers'
import AvatarImg from './res/avatar.png'

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

const store = createStore(reducers, initState)
export default store
