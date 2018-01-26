import React, {Component} from 'react'
import {connect} from 'react-redux'
import store from '../../../store'
import {firebaseConnect, dataToJS} from 'react-redux-firebase'

@firebaseConnect(
  [{
    path: `lobby/games/${store.getState().userState.gameUid}/`,
    storeAs: 'GAMESTATEsdsd',
  },
  {
    path: `lobby/games/${store.getState().userState.gameUid}/victory`,
    storeAs: 'VICTORY',
  }]

)

@connect(store => (
  {
    gameWin: dataToJS(store.firebase, 'VICTORY'),
    boardState: dataToJS(store.firebase, 'GAMESTATEsdsd'),
  }
),
{

})

export default class GameBoardBar extends Component {
  render(){
    if(this.props.gameWin === true){
      return(
        <div className="gameBoardBarContainer">
          <div className="gameBoardBarAngled">Winners never give up</div>
        </div>
      )
    } else {
      return null
    }

  }
}
