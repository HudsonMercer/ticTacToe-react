const quickNavigationReducer = (state = {isOpen: false}, action) => {
  switch(action.type){
  case 'MENU_QUICK_NAVIGATION_TOGGLE':
   if(typeof(action.payload) !== 'boolean'){
    return state = {
      ...state,
      isOpen: !state.isOpen
      }
    } else if (typeof(action.payload) === 'boolean'){
    return state = {
      ...state,
      isOpen: action.payload
    }
  }
  break
  case 'MENU_QUICK_NAVIGATION_SET_ACTIVE_ITEM':
    return {
      ...state,
      activeItem: action.payload,
    }
  break
  default:
    return state
  break
  }
}

const splashReducer = (state = {isOpen: false}, action) => {
   switch(action.type){
   case 'MENU_SPLASH_TOGGLE':
     return state = {
      ...state,
        isOpen: !state.isOpen
      }
    case 'MENU_SPLASH_SET_ERROR_DATA':
    return state = {
      ...state,
      errorDialog:{
        ...state.errorDialog,
        error: action.payload.error,
        message: action.payload.message,
        title: action.payload.title,
      }
    }
    case 'MENU_SPLASH_TOGGLE_ERROR':
      if(typeof(action.payload) === 'boolean'){
        return state = {
          ...state,
            errorDialog:{
          ...state.errorDialog,
          isOpen: action.payload,
          }
        }
      } else {
        return state = {
        ...state,
        errorDialog:{
          ...state.errorDialog,
          isOpen: !state.errorDialog.isOpen,
        }
      }
    }
    default:
    return state
    }
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

const lobbyReducer = (state = {isOpen: true, activeItem: 'chat'}, action) => {
  switch (action.type){

    case 'MENU_LOBBY_TOGGLE':
      if (typeof(action.payload) !== 'boolean'){
        return {
          ...state,
          isOpen: !state.isOpen
        }
      } else {
          return {
            ...state,
            isOpen: action.payload
          }
        }
    break

    case 'MENU_LOBBY_TOGGLE_ACTIVE_ITEM':
      if(typeof(action.payload) !== 'string'){
        if(state.activeItem === 'chat'){
          return {
            ...state,
            activeItem: 'games'
          }
        } else {
          return {
            ...state,
            activeItem: 'chat'
          }
        }
      } else {
        return {
          ...state,
          activeItem: action.payload,
        }
      }
    break

    default:
      return state
    break
  }
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

const userStateReducer = (state = {}, action) => {
  switch(action.type){
    case 'USER_STORE_UID':
      return state = {
        ...state,
        uid: action.payload
      }
      break
    case 'USER_STORE_USER_NAME':
      return state = {
        ...state,
        userName: action.payload,
      }
      break
    case 'USER_JOIN_HOST_GAME':
      return state ={
        ...state,
        isPlaying: true,
        gameUid: action.payload,
      }
      break
    case 'USER_HOST_GAME':
    return state = {
      ...state,
      isHost: true,
    }
    case 'USER_JOIN_GAME':
    return state = {
      ...state,
      isHost: false,
    }
    case 'USER_LEAVE_GAME':
    return state = {
      ...state,
      isPlaying: false,
      isHost: false,
      gameUid: null,
    }
    break
    default:
    return state
  }
}

const windowResizeReducer = (state = 1, action) => {
  if (action.type === 'WINDOW_RESIZE_EVENT'){
    return state += 1
  } else {
    return state
  }
}

const gameBoardStateReducer = (state = {}, action) => {
  switch (action.type){
    case 'GAMEBOARD_SHOW_USER_LEFT_DIALOG':
    return {
      ...state,
      userLeftDialogIsOpen: true
    }
    case 'GAMEBOARD_RESET_LEAVER_TIMER':
    return {
      ...state,
      timeLeft: 3
    }
    case 'GAMEBOARD_DECREMENT_LEAVER_TIMER':
    if(state.timeLeft !== 0){
      return {
        ...state,
        timeLeft: state.timeLeft - 1,
      }
    } else {
      return {
        ...state,
        timeLeft: 3
      }
    }
    default:
    return state
  }
}

const uiReducers = {
  windowResize: windowResizeReducer,
  avatarData: avatarFileReducer,
  avatarImg: avatarReducer,
  userState: userStateReducer,
  lobbyState: lobbyReducer,
  uiState: uiReducer,
  settingsState: settingsReducer,
  splashState: splashReducer,
  quickNavigationState: quickNavigationReducer,
  colorScheme: colorSchemeReducer,
  gameBoardState: gameBoardStateReducer,
}

export default uiReducers
