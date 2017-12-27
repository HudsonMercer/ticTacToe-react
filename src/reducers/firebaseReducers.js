import firebase from '../firebaseInit'

const fireSendData = (state = {}, action) => {
  if(action.type === 'FIRE_SEND_DATA'){
    firebase.database().ref(action.payload.destionation).push(action.payload.data)
  }
  return null
}

const firebaseReducers = {fireSendData}

export default firebaseReducers
