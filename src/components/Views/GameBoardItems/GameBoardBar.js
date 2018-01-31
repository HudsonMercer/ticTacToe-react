import React, {Component} from 'react'
import {connect} from 'react-redux'
import store from '../../../store'
import {firebaseConnect, dataToJS} from 'react-redux-firebase'
import {fireSendData} from '../../../actions/firebaseActions'

@firebaseConnect(() => ([{
    path: `lobby/games/${store.getState().userState.gameUid}/`,
    storeAs: 'GameBoardBar_GAMESTATE',
  },
  {
    path: `lobby/games/${store.getState().userState.gameUid}/victory`,
    storeAs: 'GameBoardBar_VICTORY',
  }])
)

@connect(store => (
  {
    gameWin: dataToJS(store.firebase, 'GameBoardBar_VICTORY'),
    boardState: dataToJS(store.firebase, 'GameBoardBar_GAMESTATE'),
    gameUid: store.userState.gameUid,
  }
),
{
fireSendData
})

export default class GameBoardBar extends Component {

  render(){
    if(this.props.gameWin === true){
      this.props.fireSendData(this.props.firebase, `/lobby/games/${this.props.gameUid}`, {playerTurn: 'disabled'})
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
