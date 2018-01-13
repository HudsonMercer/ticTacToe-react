import React, {Component} from 'react'
import {connect} from 'react-redux'
import {firebaseConnect} from 'react-redux-firebase'
import {fireSetPlayerTurn, fireSendData} from '../../../actions/firebaseActions'
import GameBoardX from './GameBoardX'
import GameBoardO from './GameBoardO'

@firebaseConnect()

@connect(store => ({
 userState: store.userState,
}),
{
  fireSetPlayerTurn,
  fireSendData
})

export default class GameBoardSquare extends Component {

  getData = () => {
    if (this.props.data !== undefined){
      switch (this.props.data[this.props.id]){
      case 'x':
      return (<GameBoardX/>)
      case 'o':
      return (<GameBoardO/>)
      default:
      return null
      }
    }
  }
  
//put you in the dirt
  makePlay = () => {
    if (this.props.data[this.props.id] === 'e'){
      if(
        this.props.playerTurn === 'host' &&
        this.props.userState.isHost
      ){
        this.props.fireSetPlayerTurn(
          this.props.firebase,
          this.props.userState.gameUid,
          this.props.playerTurn
        )

        let data = {}
        data[this.props.id] = 'x'


          this.props.fireSendData(this.props.firebase, `/lobby/games/${this.props.userState.gameUid}/boardState/`, data)}
      else if(
        this.props.playerTurn === 'client' &&
        !this.props.userState.isHost
      ){
        this.props.fireSetPlayerTurn(
          this.props.firebase,
          this.props.userState.gameUid,
          this.props.playerTurn
        )

        let data = {}
        data[this.props.id] = 'o'

        this.props.fireSendData(this.props.firebase, `/lobby/games/${this.props.userState.gameUid}/boardState/`, data)
      }
    }
  }

  render(){
    return(
      <div
        onClick={this.makePlay}
        className="gameBoardSquare"
      >
        {this.getData()}
      </div>
    )
  }
}
