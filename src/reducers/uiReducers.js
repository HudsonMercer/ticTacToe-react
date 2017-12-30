import uuidv4 from 'uuid'

const userNameReducer = (state = '', action) => {
  if (action.type === "SET_USER_NAME" && typeof(action.payload) === 'string'){
    return action.payload
  }
  return state
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

const colorSchemeReducer = (state = {red: 0, green: 0, blue: 0}, action) => {
  if (action.type === 'SET_COLOR_SCHEME'){
      //Muh purity
      document.documentElement.style.setProperty(`--mdc-theme-primary`,
        `rgb(
          ${action.payload.red},
          ${action.payload.green},
          ${action.payload.blue}
        )`)
      document.documentElement.style.setProperty(`--mdc-theme-primary-dark`,
        `rgb(
          ${Math.floor(action.payload.red/1.5)},
          ${Math.floor(action.payload.green/1.5)},
          ${Math.floor(action.payload.blue/1.5)}
        )`)

    return {
      ...state,
      red: action.payload.red,
      green: action.payload.green,
      blue: action.payload.blue
    }
  }
  return state
}

const avatarFileReducer = (state = {}, action) => {

  if(action.type === 'AVATAR_FILE_READY'){
    return state = {
      ...state,
      selectedFile: action.payload.localBlob,
      uploadFile: action.payload.uploadFile
    }
  }

  if(action.type === 'AVATAR_FILE_USE'){
    return state = {
      ...state,
      avatarFile: action.payload
    }
  }

return state
}

const avatarReducer = (state = null, action) => {
  if(action.type === 'AVATAR_IMAGE'){
    return action.payload
  }
  return state
}

const setUUID = (state = {}, action) => {
  return uuidv4()
}

const uiReducers = {
  UUID: setUUID,
  avatarData: avatarFileReducer,
  avatarImg: avatarReducer,
  userName: userNameReducer,
  lobbyState: lobbyReducer,
  uiState: uiReducer,
  settingsState: settingsReducer,
  splashState: splashReducer,
  quickNavigationState: quickNavigationReducer,
  colorScheme: colorSchemeReducer
}

export default uiReducers
