export function setUserName(name = ''){
  return {
    type: 'SET_USER_NAME',
    payload: name,
  }
}

export function setColorScheme(r = 0, g = 0, b = 0){
  return {
    type: 'SET_COLOR_SCHEME',
    payload: {
      red: r,
      green: g,
      blue: b,
    }
  }
}

export function toggleQuickNavigation(override){
  return {
    type: 'MENU_QUICK_NAVIGATION_TOGGLE',
    payload: override,
  }
}

export function toggleSplash(){
  return {
    type: 'MENU_SPLASH_TOGGLE',
  }
}

export function toggleSettings(override){
  return {
    type: 'MENU_SETTINGS_TOGGLE',
    payload: override
  }
}

export function setSettingsActiveItem(payload){
  return {
    type: 'MENU_SETTINGS_SET_ACTIVE_ITEM',
    payload: payload
  }
}

export function uiSetActiveView(target){
  return {
    type: 'UI_SET_ACTIVE_VIEW',
    payload: target
  }
}

export function toggleLobby(override){
  return {
    type: 'MENU_LOBBY_TOGGLE',
    payload: override
  }
}
