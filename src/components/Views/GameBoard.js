import React, {Component} from 'react'
import {connect} from 'react-redux'
import store from '../../store'
import {firebaseConnect, dataToJS} from 'react-redux-firebase'
import {uiLeaveGame, uiGameBoardUserLeft, uiLeavingGame} from '../../actions/uiActions'
import GameBoardSquare from './GameBoardItems/GameBoardSquare'
import GameBoardLeaveDialog from './GameBoardItems/GameBoardLeaveDialog'
import GameBoardWinDialog from './GameBoardItems/GameBoardWinDialog'
import GameBoardBar from './GameBoardItems/GameBoardBar'
import {fireSendData, fireUserLeaveGame, fireAddScore} from '../../actions/firebaseActions'
import {
        Button,
        Card,
        CardText,
        CardActions,
        Toolbar,
        ToolbarSection,
        ToolbarRow,
        Headline,
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
  },
  {
    path: `lobby/games/${store.getState().userState.gameUid}/score`,
    storeAs: 'GAMEBOARD_SCORE'
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
  score: dataToJS(store.firebase, 'GAMEBOARD_SCORE'),
}),
{
  fireAddScore,
  fireSendData,
  fireUserLeaveGame,
  uiGameBoardUserLeft,
  uiLeaveGame,
  uiLeavingGame,
})

export default class GameBoard extends Component{

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
        default:
        return 'Cannot resolve'
      }
  } catch(err){
    return "Cant resolve"
  }
}

  leaveGameHandler = () => {

    this.props.fireUserLeaveGame(this.props.firebase, this.props.userState.uid, this.props.userState.gameUid)

    this.props.uiLeaveGame()

    if (this.props.isHost){
      this.props.fireSendData(
        this.props.firebase,
        `/lobby/games/${this.props.userState.gameUid}/`,
        {host: ''}
       )
    } else {
        this.props.fireSendData(
          this.props.firebase,
          `/lobby/games/${this.props.userState.gameUid}/`,
          {client: ''}
        )
    }

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
              style={{
                  top: containerRect.top + 'px',
                  left: containerRect.left + 'px',
                  width: containerRect.width + 'px',
                  height: containerRect.height + 'px',
                  position: 'absolute',
              }}
              className="gameBoardWinBannerShadow"
            />)
          return GameBoardWinBannerShadow
        } else if(this.props.victory === false){
            const GameBoardWinBannerShadow = (
              <div
                style={{height: '0px'}}
                className="gameBoardWinBannerShadow"
              />
            )
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
          {victory: true, winner: boardState[0], position: 'rowTop', winDialogIsOpen: true}
        )
        this.props.fireAddScore(this.props.firebase, this.props.userState.gameUid, boardState[0])
      break

      case (
        boardState[3] !== 'e' &&
        (boardState[3] === boardState[4] && boardState[3] === boardState[5])
      ):
      //Check the middle row
        this.props.fireSendData(
          this.props.firebase,
          `lobby/games/${this.props.userState.gameUid}`,
          {victory: true, winner: boardState[3], position: 'rowMiddle', winDialogIsOpen: true}
        )
        this.props.fireAddScore(this.props.firebase, this.props.userState.gameUid, boardState[3])
      break

      case (
        boardState[6] !== 'e' &&
        (boardState[6] === boardState[7] && boardState[6] === boardState[8])
      ):
      //Check the bottom row
        this.props.fireSendData(
          this.props.firebase,
          `lobby/games/${this.props.userState.gameUid}`,
          {victory: true, winner: boardState[6], position: 'rowBottom', winDialogIsOpen: true}
        )
        this.props.fireAddScore(this.props.firebase, this.props.userState.gameUid, boardState[6])
      break

      case (
        boardState[0] !== 'e' &&
        (boardState[0] === boardState[3] && boardState[0] === boardState[6])
      ):
      //Check the left column
        this.props.fireSendData(
          this.props.firebase,
          `lobby/games/${this.props.userState.gameUid}`,
          {victory: true, winner: boardState[0], position: 'columnLeft', winDialogIsOpen: true}
        )
        this.props.fireAddScore(this.props.firebase, this.props.userState.gameUid, boardState[0])
      break

      case (
        boardState[1] !== 'e' &&
        (boardState[1] === boardState[4] && boardState[1] === boardState[7])
      ):
      //Check the middle column
        this.props.fireSendData(
          this.props.firebase,
          `lobby/games/${this.props.userState.gameUid}`,
          {victory: true, winner: boardState[1], position: 'columnMiddle', winDialogIsOpen: true}
        )
        this.props.fireAddScore(this.props.firebase, this.props.userState.gameUid, boardState[1])
      break

      case (
        boardState[2] !== 'e' &&
        (boardState[2] === boardState[5] && boardState[2] === boardState[8])
      ):
      //Check the right column
        this.props.fireSendData(
          this.props.firebase,
          `lobby/games/${this.props.userState.gameUid}`,
          {victory: true, winner: boardState[2], position: 'columnRight', winDialogIsOpen: true}
        )
        this.props.fireAddScore(this.props.firebase, this.props.userState.gameUid, boardState[2])
      break

      case (
        boardState[0] !== 'e' &&
        (boardState[0] === boardState[4] && boardState[0] === boardState[8])
      ):
      //Check from top left to bottom right, the \ direction
        this.props.fireSendData(
          this.props.firebase,
          `lobby/games/${this.props.userState.gameUid}`,
        {  victory: true, winner: boardState[0], position: 'topDiag', winDialogIsOpen: true}
        )
        this.props.fireAddScore(this.props.firebase, this.props.userState.gameUid, boardState[0])
      break

      case (
        boardState[2] !== 'e' &&
        (boardState[2] === boardState[4] && boardState[2] === boardState[6])
      ):
      //Check from top right to bottom left, the / direction
        this.props.fireSendData(
          this.props.firebase,
          `lobby/games/${this.props.userState.gameUid}`,
        {  victory: true, winner: boardState[2], position: 'bottomDiag', winDialogIsOpen: true}
        )
        this.props.fireAddScore(this.props.firebase, this.props.userState.gameUid, boardState[2])
      break

      case (
        !boardState.includes('e')
      ):
      this.props.fireSendData(
        this.props.firebase,
        `lobby/games/${this.props.userState.gameUid}`,
      {  victory: true, winner: 'tie', position: 'NONE', winDialogIsOpen: true}
      )
      break
      default:
      break
    }
  }

  componentDidUpdate(){
    if(this.props.victory === false){
      this.checkWin(this.props.gameState.boardState)
    }
  }

  opponentLeftHandler = () => {
    if(this.props.leaverId !== null && this.props.leavingGame === false){
      this.props.uiGameBoardUserLeft()
      this.props.uiLeavingGame()
    }
  }

  render(){

    let playerTurn = ''

    try{
      playerTurn = this.getUserTurn()
      this.opponentLeftHandler()

    return(
      <Card className="gameBoardCard">

        <GameBoardLeaveDialog/>
        <GameBoardWinDialog/>
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
              Score: {`${this.props.score.host} - ${this.props.score.client}`}
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
