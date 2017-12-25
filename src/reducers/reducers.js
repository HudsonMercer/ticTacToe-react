import {combineReducers} from 'redux'

const mathFieldReducer = (state = true, action) => {
  if(action.type === 'INC'){
    return !state
  } else {
    return false
  }
}


const quickNavigationReducer = (state = {isOpen: false}, action) => {
  if (action.type === 'TOGGLE_QUICK_NAVIGATION' && typeof(action.payload) === 'undefined'){
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
   if(action.type === "TOGGLE_SPLASH"){
     state = {
      ...state,
        isOpen: !state.isOpen
      }
    }
    return state
}

const settingsReducer = (state = {}, action, override) => {
  switch(action.type) {
    case 'MENU_SETTINGS_ACTIVE_ITEM':
      return {
        ...state,
        activeItem: action.payload
      }
    break
    case 'MENU_SETTINGS_TOGGLE':
    if (typeof(override) === 'boolean') {
      return {
        ...state,
        isOpen: override
      }
    }
      return {
        ...state,
        isOpen: !state.isOpen
      }
    default:
      return state
    break
  }
  return state

}

const reducers = combineReducers({
  settingsState: settingsReducer,
  splashState: splashReducer,
  quickNavigationState: quickNavigationReducer,
  mathField: mathFieldReducer,
})

export default reducers
