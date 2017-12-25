import {createStore} from 'redux'
import reducers from './reducers/reducers'

const initState = {
  userName: '',
  quickNavigationState: {
    isOpen: false,
    activeItem: 'lobby',
  },
  mainContentsState:{
    isOpen: true,
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
