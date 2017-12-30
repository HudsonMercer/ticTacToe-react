
export function fireSendData(destination = '', data = 'blankData'){
  return {
    type: 'FIRE_SEND_DATA',
    payload: {
      destionation: destination,
      data: data
    }
  }
}

export function fireSendFile(destination = '', file = ''){
  return {
    type: 'FIRE_SEND_FILE',
    payload: {
      destination: destination,
      file: file
    }
  }
}


export function fireUserLogin(){
  return {
    type: 'FIRE_USER_LOGIN'
  }
}
