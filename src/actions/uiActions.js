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
      blue: b
    }
  }
}

export function toggleQuickNavigation(override){
  return {
    type: 'TOGGLE_QUICK_NAVIGATION',
    payload: override,
  }
}

export function toggleSplash(){
  return {
    type: 'TOGGLE_SPLASH'
  }
}
