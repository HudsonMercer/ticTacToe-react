import React, {Component} from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import store from '../../store'
import {firebaseConnect, dataToJS} from 'react-redux-firebase'
import {uiLeaveGame, uiGameBoardUserLeft, uiLeavingGame} from '../../actions/uiActions'
import GameBoardX from './GameBoardItems/GameBoardX'
import GameBoardSquare from './GameBoardItems/GameBoardSquare'
import GameBoardLeaveDialog from './GameBoardItems/GameBoardLeaveDialog'
import GameBoardBar from './GameBoardItems/GameBoardBar'
import {fireSendData, fireUserLeaveGame} from '../../actions/firebaseActions'
import {
        Button,
        Card,
        CardText,
        CardHeader,
        CardActions,
        Toolbar,
        ToolbarSection,
        ToolbarRow,
        Title,
        Headline,
        Grid,
        Cell
        } from 'react-mdc-web'

@firebaseConnect(() => ([
  {
    path: `lobby/games/${store.getState().userState.gameUid}/`,
    storeAs: 'GAMEBOARD_GAMESTATE',
  },
  {
    path: `lobby/games/${store.getState().userState.gameUid}/victory`,
    storeAs: 'GAMEBOARD_VICTORY',
  },
  {
    path: `lobby/games/${store.getState().userState.gameUid}/leaverId`,
    storeAs: 'GAMEBOARD_LEAVER',
  }
]))

@connect(store => ({
  gameState: dataToJS(store.firebase, 'GAMEBOARD_GAMESTATE'),
  squares: document.getElementsByClassName('boardSquare'),
  userState: store.userState,
  victory: dataToJS(store.firebase, 'GAMEBOARD_VICTORY'),
  leaverId: dataToJS(store.firebase, 'GAMEBOARD_LEAVER'),
  windowResize: store.windowResize,
  leavingGame: store.gameBoardState.leavingGame,
  isHost: store.userState.isHost,
}),
{
fireSendData,
fireUserLeaveGame,
uiLeaveGame,
uiGameBoardUserLeft,
uiLeavingGame,
})

export default class GameBoard extends Component{
  constructor(){
    super()
    this.state = {leaveGameFired: false}
  }

  getUserTurn = () => {
    try{
    switch (true){
      case (
        this.props.gameState.playerTurn === 'host' &&
        this.props.userState.isHost
      ):
        return "Your turn"
      case (
        this.props.gameState.playerTurn === 'client' &&
        !this.props.userState.isHost
      ):
        return "Your turn"
      case (
        this.props.gameState.playerTurn === 'host' &&
        !this.props.userState.isHost
      ):
        return `${this.props.gameState.host}'s turn`
      case (
        this.props.gameState.playerTurn === 'client' &&
        this.props.userState.isHost
      ):
        return `${this.props.gameState.client}'s turn`
      }
  } catch(err){
    return "Cant resolve"
  }
}

  leaveGameHandler = () => {
    this.props.fireUserLeaveGame(this.props.firebase, this.props.userState.uid, this.props.userState.gameUid)
    this.props.uiLeaveGame()
  }

  getTitleStatus = () => {
    try{
      var a = `${this.props.gameState.host} VS ${this.props.gameState.client}`
      return a
    } catch(err){
      return this.props.gameState.status
    }
  }

  victoryBannerHandeler = () => {
    try {
        if(this.props.victory === true){
          let containerRect = document.getElementsByClassName('gameBoardContainer')[0].getBoundingClientRect()

          const GameBoardWinBannerShadow = (
            <div
              style={
                {
                  top: containerRect.top + 'px',
                  left: containerRect.left + 'px',
                  width: containerRect.width + 'px',
                  height: containerRect.height + 'px',
                  position: 'absolute',
                }
              }
              className="gameBoardWinBannerShadow"
            />)

          return GameBoardWinBannerShadow
        } else if(this.props.victory === false){
          const GameBoardWinBannerShadow = (
            <div
              style={
                {
                  height: '0px',
                }
              }
              className="gameBoardWinBannerShadow"
            />)
          return GameBoardWinBannerShadow
        }
    } catch (err){
      //if we get to this point something with the connection has happened, or the dom hasn't rendered yet.
      return null
    }
  }

  checkWin = (boardState) => {
    switch (true){

      case (
        boardState[0] !== 'e' &&
        (boardState[0] === boardState[1] && boardState[0] === boardState[2])
      ):
      //Check the top row
        this.props.fireSendData(
          this.props.firebase,
          `lobby/games/${this.props.userState.gameUid}`,
          {victory: true, winner: boardState[0], position: 'rowTop'}
        )
      break

      case (
        boardState[3] !== 'e' &&
        (boardState[3] === boardState[4] && boardState[3] === boardState[5])
      ):
      //Check the middle row
        this.props.fireSendData(
          this.props.firebase,
          `lobby/games/${this.props.userState.gameUid}`,
          {victory: true, winner: boardState[3], position: 'rowMiddle'}
        )
      break

      case (
        boardState[6] !== 'e' &&
        (boardState[6] === boardState[7] && boardState[6] === boardState[8])
      ):
      //Check the bottom row
        this.props.fireSendData(
          this.props.firebase,
          `lobby/games/${this.props.userState.gameUid}`,
          {victory: true, winner: boardState[6], position: 'rowBottom'}
        )
      break

      case (
        boardState[0] !== 'e' &&
        (boardState[0] === boardState[3] && boardState[0] === boardState[6])
      ):
      //Check the left column
        this.props.fireSendData(
          this.props.firebase,
          `lobby/games/${this.props.userState.gameUid}`,
          {victory: true, winner: boardState[0], position: 'columnLeft'}
        )
      break

      case (
        boardState[1] !== 'e' &&
        (boardState[1] === boardState[4] && boardState[1] === boardState[7])
      ):
      //Check the middle column
        this.props.fireSendData(
          this.props.firebase,
          `lobby/games/${this.props.userState.gameUid}`,
          {victory: true, winner: boardState[0], position: 'columnMiddle'}
        )
      break

      case (
        boardState[1] !== 'e' &&
        (boardState[1] === boardState[4] && boardState[1] === boardState[7])
      ):
      //Check the right column
        this.props.fireSendData(
          this.props.firebase,
          `lobby/games/${this.props.userState.gameUid}`,
          {victory: true, winner: boardState[0], position: 'columnRight'}
        )
      break

      case (
        boardState[0] !== 'e' &&
        (boardState[0] === boardState[4] && boardState[0] === boardState[8])
      ):
      //Check from top left to bottom right, the \ direction
        this.props.fireSendData(
          this.props.firebase,
          `lobby/games/${this.props.userState.gameUid}`,
        {  victory: true, winner: boardState[0], position: 'topDiag'}
        )
      break

      case (
        boardState[2] !== 'e' &&
        (boardState[2] === boardState[4] && boardState[0] === boardState[6])
      ):
      //Check from top right to bottom left, the / direction
        this.props.fireSendData(
          this.props.firebase,
          `lobby/games/${this.props.userState.gameUid}`,
        {  victory: true, winner: boardState[2], position: 'bottomDiag'}
        )
      break
    }
  }

  opponentLeftHandler = () => {
    if(this.props.leaverId !== null && this.props.leavingGame === false){
      this.props.uiGameBoardUserLeft()
      this.props.uiLeavingGame()
    }
  }

  render(){

    let ready = (this.props.gameState !== undefined),
    playerTurn = ''

    try{
      playerTurn = this.getUserTurn()
      this.checkWin(this.props.gameState.boardState)
      this.opponentLeftHandler()

    return(
      <Card className="gameBoardCard">

        <GameBoardLeaveDialog></GameBoardLeaveDialog>
        <Toolbar>
          <ToolbarRow>
            <ToolbarSection>
              {playerTurn}
            </ToolbarSection>
            <ToolbarSection>
              <Headline
                className="no-mobile"
              >
                {this.getTitleStatus()}
              </Headline>
            </ToolbarSection>
            <ToolbarSection>
              Score: 1 - 3
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>
        <CardText className="gameBoardContainer">
          {this.victoryBannerHandeler()}
          <GameBoardBar/>
          <div className="gameBoardFlexbox">
            <GameBoardSquare
              id={0}
              data={this.props.gameState}
              playerTurn={this.props.gameState.playerTurn}
            />
            <GameBoardSquare
              id={1}
              data={this.props.gameState}
              playerTurn={this.props.gameState.playerTurn}
            />
            <GameBoardSquare
              id={2}
              data={this.props.gameState}
              playerTurn={this.props.gameState.playerTurn}
            />
            <GameBoardSquare
              id={3}
              data={this.props.gameState}
              playerTurn={this.props.gameState.playerTurn}
            />
            <GameBoardSquare
              id={4}
              data={this.props.gameState}
              playerTurn={this.props.gameState.playerTurn}
            />
            <GameBoardSquare
              id={5}
              data={this.props.gameState}
              playerTurn={this.props.gameState.playerTurn}
            />
            <GameBoardSquare
              id={6}
              data={this.props.gameState}
              playerTurn={this.props.gameState.playerTurn}
            />
            <GameBoardSquare
              id={7}
              data={this.props.gameState}
              playerTurn={this.props.gameState.playerTurn}
            />
            <GameBoardSquare
              id={8}
              data={this.props.gameState}
              playerTurn={this.props.gameState.playerTurn}
            />
          </div>
        </CardText>
        <CardActions>
          <Button
            compact
            raised
            onClick={this.leaveGameHandler}
          >Leave Game
          </Button>
        </CardActions>

      </Card>
    )
  } catch(err) {
      console.log(err);
      return null
    }
  }
}
