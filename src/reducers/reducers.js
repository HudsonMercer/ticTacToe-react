import {combineReducers} from 'redux'
import '../store'

const userNameReducer = (state = '', action) => {
  if (action.type === "SET_USER_NAME" && typeof(action.payload) === 'string'){
    return action.payload
  }
  return ''
}

const quickNavigationReducer = (state = {isOpen: false}, action) => {
  if (action.type === 'MENU_QUICK_NAVIGATION_TOGGLE' && typeof(action.payload) !== 'boolean'){
    return state = {
      ...state,
      isOpen: !state.isOpen
    }
  }
  else if (typeof(action.payload) === 'boolean'){
    return state = {
      ...state,
      isOpen: action.payload
    }
  } else {
    return state
  }
}

const splashReducer = (state = {isOpen: false}, action) => {
   if(action.type === "MENU_SPLASH_TOGGLE"){
     console.log('Fired!')
     state = {
      ...state,
        isOpen: !state.isOpen
      }
    }
    return state
}

const settingsReducer = (state = {}, action) => {
  switch(action.type) {
    case 'MENU_SETTINGS_SET_ACTIVE_ITEM':
      return {
        ...state,
        activeItem: action.payload
      }
    case 'MENU_SETTINGS_TOGGLE':
      if (typeof(action.payload) === 'boolean') {
        return {
          ...state,
          isOpen: action.payload
        }
      } else {
        return {
          ...state,
          isOpen: !state.isOpen
        }
      }
    default:
      return state
  }
}

const uiReducer = (state = {activeView: 'lobby'}, action) => {
  if (action.type === 'UI_SET_ACTIVE_VIEW'){
    return {
      ...state,
      activeView: action.payload
    }
  }
  return state
}

const lobbyReducer = (state = {isOpen: true}, action) => {
  if (action.type === 'MENU_LOBBY_TOGGLE' && typeof(action.payload) !== 'boolean'){
    return {
      ...state,
      isOpen: !state.isOpen
    }
  } else if(action.type === 'MENU_LOBBY_TOGGLE') {
    return {
      ...state,
      isOpen: action.payload
    }
  }
  return state
}

const reducers = combineReducers({
  userName: userNameReducer,
  lobbyState: lobbyReducer,
  uiState: uiReducer,
  settingsState: settingsReducer,
  splashState: splashReducer,
  quickNavigationState: quickNavigationReducer,
})

export default reducers
