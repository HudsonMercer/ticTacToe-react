import thunk from 'redux-thunk'

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
