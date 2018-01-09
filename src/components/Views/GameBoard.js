import React, {Component} from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import store from '../../store'
import {firebaseConnect, dataToJS} from 'react-redux-firebase'
import GameBoardX from './GameBoardItems/GameBoardX'
import GameBoardSquare from './GameBoardItems/GameBoardSquare'
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
    storeAs: 'GAMESTATE',
  }
]))

@connect(store => ({
  gameState: dataToJS(store.firebase, 'GAMESTATE'),
  squares: document.getElementsByClassName('boardSquare'),
  userState: store.userState,
}),
{

})

export default class GameBoard extends Component{

  updateBoard = () => {
    const squares = this.props.squares
    let idx = 0
    for(const prop of squares){
      if(this.props.gameState.boardState[idx] !== 'e'){
        prop.innerHTML = this.props.gameState.boardState[idx]
      }
      idx++
    }
  }

  getUserTurn = () => {
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
  }

  getTitleStatus = () => {
    let ready = (this.props.gameState !== undefined)

    if(ready){
      switch (true){
        case (this.props.gameState.client === ''):
        return 'Awating challenger...'
        case (this.props.gameState.client !== '' && this.props.gameState.client !== undefined):
        return `${this.props.gameState.host} VS ${this.props.gameState.client}`
        default:
        return 'DEFAULT RETURN'
      }
    }
  }

  render(){

    let ready = (this.props.gameState !== undefined),
    playerTurn = ''

    if(ready){
      // this.updateBoard()
      playerTurn = this.getUserTurn()
    }

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
        <CardText>
          <div className="gameBoardFlexbox">
            <GameBoardSquare
              id={0}
              data={this.props.gameState.boardState}
              playerTurn={this.props.gameState.playerTurn}
            />
            <GameBoardSquare
              id={1}
              data={this.props.gameState.boardState}
              playerTurn={this.props.gameState.playerTurn}
            />
            <GameBoardSquare
              id={2}
              data={this.props.gameState.boardState}
              playerTurn={this.props.gameState.playerTurn}
            />
            <GameBoardSquare
              id={3}
              data={this.props.gameState.boardState}
              playerTurn={this.props.gameState.playerTurn}
            />
            <GameBoardSquare
              id={4}
              data={this.props.gameState.boardState}
              playerTurn={this.props.gameState.playerTurn}
            />
            <GameBoardSquare
              id={5}
              data={this.props.gameState.boardState}
              playerTurn={this.props.gameState.playerTurn}
            />
            <GameBoardSquare
              id={6}
              data={this.props.gameState.boardState}
              playerTurn={this.props.gameState.playerTurn}
            />
            <GameBoardSquare
              id={7}
              data={this.props.gameState.boardState}
              playerTurn={this.props.gameState.playerTurn}
            />
            <GameBoardSquare
              id={8}
              data={this.props.gameState.boardState}
              playerTurn={this.props.gameState.playerTurn}
            />
          </div>
        </CardText>
      </Card>
    )
  }
}
