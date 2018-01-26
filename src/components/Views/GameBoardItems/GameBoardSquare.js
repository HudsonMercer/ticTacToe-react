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
    if (this.props.data.boardState !== undefined){
      switch (this.props.data.boardState[this.props.id]){
      case 'x':
      return (<GameBoardX/>)
      case 'o':
      return (<GameBoardO/>)
      default:
      return null
      }
    }
  }

  makePlay = (e) => {
    if (
    this.props.data.boardState[this.props.id] === 'e' &&
    this.props.data.status === 'Playing'
    ){
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
    this.checkWin(this.props.data.boardState)
  }

  checkWin = (boardState) => {
    console.log('SWITCH FIRED!');
    switch (true){
      case (
        boardState[0] !== 'e' &&
        (boardState[0] === boardState[1] && boardState[0] === boardState[2])
      ):
        this.props.fireSendData(
          this.props.firebase,
          `lobby/games/${this.props.userState.gameUid}`,
          {victory: true}
        )
      break
      case (
        boardState[3] !== 'e' &&
        (boardState[3] === boardState[4] && boardState[3] === boardState[5])
      ):
        this.props.fireSendData(
          this.props.firebase,
          `lobby/games/${this.props.userState.gameUid}`,
          {victory: true}
        )
      break
      case (
        boardState[6] !== 'e' &&
        (boardState[6] === boardState[7] && boardState[6] === boardState[8])
      ):
        this.props.fireSendData(
          this.props.firebase,
          `lobby/games/${this.props.userState.gameUid}`,
          {victory: true}
        )
      break
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
