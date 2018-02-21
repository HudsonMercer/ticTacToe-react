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

export function quickNavigationSetActiveItem(target){
  return {
    type: 'MENU_QUICK_NAVIGATION_SET_ACTIVE_ITEM',
    payload: target
  }
}

export function toggleSplash(){
  return {
    type: 'MENU_SPLASH_TOGGLE',
  }
}

export function storeUid(uid){
  return {
    type: 'USER_STORE_UID',
    payload: uid,
  }
}

export function storeUserName(name){
  return {
    type: 'USER_STORE_USER_NAME',
    payload: name,
  }
}

export function toggleSplashError(override){
  return {
    type: 'MENU_SPLASH_TOGGLE_ERROR',
    payload: override,
  }
}

export function setSplashErrorData(error, message, title){
  return {
    type: 'MENU_SPLASH_SET_ERROR_DATA',
    payload: {
      error,
      message,
      title,
    }
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

export function toggleLobbyActiveItem(override){
  return {
    type: 'MENU_LOBBY_TOGGLE_ACTIVE_ITEM',
    payload: override
  }
}

export function avatarFileLoad(file){

  //I DONT KNOW WHY THIS WORKS BUT, IT DOES. WHO'DA THUNK IT? #DAMNJAVASCRIPTYOUSCARY

  return (dispatch) => {
    dispatch({type: 'AVATAR_FILE_READING'})
    /*
    * Thank you stack exchange turbo nerds
    */
    function resizeImg(file, max_width, max_height, compression_ratio, imageEncoding, callback){

      function dataURItoBlob(dataURI) {
      var byteString = atob(dataURI.split(',')[1]);
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
      }
      var blob = new Blob([ab], {type: mimeString});
      return blob;
    }
      var fileLoader = new FileReader(),
      canvas = document.createElement('canvas'),
      context = null,
      imageObj = new Image(),
      blob = null;
      canvas.id     = "hiddenCanvas";
      canvas.width  = max_width;
      canvas.height = max_height;
      canvas.style.visibility   = "hidden";
      document.body.appendChild(canvas);
      context = canvas.getContext('2d');
      if (file.type.match('image.*')) {
          fileLoader.readAsDataURL(file);
      } else {
          alert('File is not an image');
      }
      fileLoader.onload = function() {
          var data = this.result;
          imageObj.src = data;
      };
      fileLoader.onabort = function() {
          alert("The upload was aborted.");
      };
      fileLoader.onerror = function() {
          alert("An error occured while reading the file.");
      };
      imageObj.onload = function() {
          if(this.width === 0 || this.height === 0){
              alert('Image is empty');
          } else {
              context.clearRect(0,0,max_width,max_height);
              context.drawImage(imageObj, 0, 0, this.width, this.height, 0, 0, max_width, max_height);
              //dataURItoBlob function available here:
              // http://stackoverflow.com/questions/12168909/blob-from-dataurl
              // add ')' at the end of this function SO dont allow to update it without a 6 character edit
              blob = dataURItoBlob(canvas.toDataURL(imageEncoding));
              //pass this blob to your upload function
              if(callback){
                callback(blob);
              }
              return blob;
          }
      };
      imageObj.onabort = function() {
          alert("Image load was aborted.");
      };
      imageObj.onerror = function() {
          alert("An error occured while loading image.");
      };
    }

    function onComplete(newFile){
      var dataURL = URL.createObjectURL(newFile)
      dispatch({type: 'AVATAR_FILE_READY', payload: {
        uploadFile: newFile,
        localBlob: dataURL
      }})
    }

    resizeImg(file, 256, 256, 1, 'image/png', onComplete)
  }
}

export function avatarFileReady(file){
  return {
    type: 'AVATAR_FILE_READY',
    payload: file
  }
}

export function avatarFileUse(file){
  return {
    type: 'AVATAR_IMAGE',
    payload: file
  }
}

export function lobbyChatSendMessage(uid, userName, message, firebase){

  return (dispatch) => {
    firebase.database().ref(`lobby/chat/messages/${Math.random().toString(36).substring(2)}`).set({
      userName,
      uid,
      message,
      date: Date.now()
    })
  }
}

export function storeCookieData(userState){
  document.cookie = `userName=${userState.userName};`
  document.cookie = `uid=${userState.uid};`
  return {
    type: 'STORE_COOKIE_DATA_COMPLETE',
    payload: document.cookie,
  }
}

export function fetchCookieData(){

  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

  let cookieData = {
    userName: getCookie('userName'),
    uid: getCookie('uid'),
  }
  return {
    type: 'FETCH_COOKIE_DATA',
    payload: cookieData
  }
}

export function uiHostNewGame(gameUid){
  return (dispatch) => {
    dispatch(quickNavigationSetActiveItem('gameBoard'))
    dispatch(uiSetActiveView('gameBoard'))
    dispatch(
      {
        type: 'USER_HOST_GAME'
      }
    )
    dispatch(
      {
        type: 'USER_JOIN_HOST_GAME',
        payload: gameUid,
      }
    )
  }
}

export function uiJoinGame(gameUid){
  return (dispatch) => {
    dispatch(
      {
        type: 'USER_JOIN_HOST_GAME',
        payload: gameUid,
      }
    )
    dispatch({type: 'USER_JOIN_GAME'})
    dispatch(quickNavigationSetActiveItem('gameBoard'))
    dispatch(uiSetActiveView('gameBoard'))
  }
}

export function uiLeaveGame(){
  return (dispatch) => {
    dispatch(quickNavigationSetActiveItem('lobby'))
    dispatch(uiSetActiveView('lobby'))
    dispatch({type: 'USER_LEAVE_GAME'})
  }
}

export function uiLeavingGame(){
  return (dispatch) => {
    dispatch({type: 'GAMEBOARD_LEAVING_GAME'})
  }
}

export function uiGameBoardUserLeft(){
  return (dispatch) => {
    dispatch({type: 'GAMEBOARD_SHOW_USER_LEFT_DIALOG'})
  }
}

export function uiGameBoardResetLeaverTimer(){
  return {type:'GAMEBOARD_RESET_LEAVER_TIMER'}
}

export function uiGameBoardDecrementTimer(){
  return {type: 'GAMEBOARD_DECREMENT_LEAVER_TIMER'}
}

export function uiChatInput(char){
  return {type: 'MENU_LOBBY_CHAT_INPUT', payload: char}
}

export function uiChatInputClear(){
  return {type: 'MENU_LOBBY_CHAT_CLEAR_INPUT'}
}
