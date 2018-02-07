import React, {Component} from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import store from '../../store'
import {firebaseConnect, dataToJS} from 'react-redux-firebase'
import GameBoardX from './GameBoardItems/GameBoardX'
import GameBoardSquare from './GameBoardItems/GameBoardSquare'
import GameBoardBar from './GameBoardItems/GameBoardBar'
import {fireSendData} from '../../actions/firebaseActions'
import {
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
    storeAs: 'GameBoard_GAMESTATE',
  },
  {
    path: `lobby/games/${store.getState().userState.gameUid}/victory`,
    storeAs: 'GameBoard_VICTORY',
  }
]))

@connect(store => ({
  gameState: dataToJS(store.firebase, 'GameBoard_GAMESTATE'),
  squares: document.getElementsByClassName('boardSquare'),
  userState: store.userState,
  victory: dataToJS(store.firebase, 'GameBoard_VICTORY'),
}),
{
fireSendData
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
      }
  } catch(err){
    return "Cant resolve"
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
          let container = document.getElementsByClassName('gameBoardCard')[0]
          const GameBoardWinBannerShadow = (
            <div
              style={
                {
                  top: container.offsetTop + 'px',
                  left: container.offsetLeft + 'px',
                  width: container.offsetWidth + 'px',
                  height: container.offsetHeight + 'px',
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
          {victory: true}
        )
      return boardState[0]
      break

      case (
        boardState[3] !== 'e' &&
        (boardState[3] === boardState[4] && boardState[3] === boardState[5])
      ):
      //Check the middle row
        this.props.fireSendData(
          this.props.firebase,
          `lobby/games/${this.props.userState.gameUid}`,
          {victory: true}
        )
      return boardState[3]
      break

      case (
        boardState[6] !== 'e' &&
        (boardState[6] === boardState[7] && boardState[6] === boardState[8])
      ):
      //Check the bottom row
        this.props.fireSendData(
          this.props.firebase,
          `lobby/games/${this.props.userState.gameUid}`,
          {victory: true}
        )
      return boardState[6]
      break

      case (
        boardState[0] !== 'e' &&
        (boardState[0] === boardState[3] && boardState[0] === boardState[6])
      ):
      //Check the left column
        this.props.fireSendData(
          this.props.firebase,
          `lobby/games/${this.props.userState.gameUid}`,
          {victory: true}
        )
      return boardState[0]
      break

      case (
        boardState[1] !== 'e' &&
        (boardState[1] === boardState[4] && boardState[1] === boardState[7])
      ):
      //Check the middle column
        this.props.fireSendData(
          this.props.firebase,
          `lobby/games/${this.props.userState.gameUid}`,
          {victory: true}
        )
      return boardState[0]
      break

      case (
        boardState[1] !== 'e' &&
        (boardState[1] === boardState[4] && boardState[1] === boardState[7])
      ):
      //Check the right column
        this.props.fireSendData(
          this.props.firebase,
          `lobby/games/${this.props.userState.gameUid}`,
          {victory: true}
        )
      return boardState[0]
      break

      case (
        boardState[0] !== 'e' &&
        (boardState[0] === boardState[4] && boardState[0] === boardState[8])
      ):
      //Check from top left to bottom right, the \ direction
        this.props.fireSendData(
          this.props.firebase,
          `lobby/games/${this.props.userState.gameUid}`,
        {  victory: true}
        )
      return boardState[0]
      break

      case (
        boardState[2] !== 'e' &&
        (boardState[2] === boardState[4] && boardState[0] === boardState[6])
      ):
      //Check from top right to bottom left, the / direction
        this.props.fireSendData(
          this.props.firebase,
          `lobby/games/${this.props.userState.gameUid}`,
        {  victory: true}
        )
      return boardState[2]
      break
    }
  }

  render(){

    let ready = (this.props.gameState !== undefined),
    playerTurn = ''

    try{
      playerTurn = this.getUserTurn()
      this.checkWin(this.props.gameState.boardState)

    return(
      <Card className="gameBoardCard">
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
      </Card>
    )
  } catch(err) {
    console.log(err);
    return null
  }
  }
}
