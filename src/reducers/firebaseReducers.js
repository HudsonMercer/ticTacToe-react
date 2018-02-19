import store from '../store'

const fireSendData = (state = null, action) => {
  if(action.type === 'FIRE_SEND_DATA'){
    let firebase= store.getState().firebase

    firebase.set('games/', action.payload.data)
  }
  return state
}

const fireSendFile = (state = null, action) => {
  if (action.type === 'FIRE_SEND_FILE') {
   // firebase.storage().ref(action.payload.destination).put(action.payload.file)
  }
  return state
}

const fireChatMessageCatch = (state = {}, action) => {
  if (action.type === '@@reactReduxFirebase/SET'){

    return state
  }
  return state
}


const firebaseReducers = {
  fireSendData: fireSendData,
  fireSendFile: fireSendFile,
  fireChatMessageCatch: fireChatMessageCatch
}

export default firebaseReducers
