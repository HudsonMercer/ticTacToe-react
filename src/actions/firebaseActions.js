
export function fireSendData(destination = '', data = 'blankData'){
  return {
    type: 'FIRE_SEND_DATA',
    payload: {
      destionation: destination,
      data: data
    }
  }
}
