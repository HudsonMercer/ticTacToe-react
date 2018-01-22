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
      switch (this.props.gameState.status){
        case 'Awating challenger...':
          return this.props.gameState.status

        case 'Playing':
          return `${this.props.gameState.host} VS ${this.props.gameState.client}`

        default:
          return this.props.gameState.status
      }
    }
  }

  render(){

    let ready = (this.props.gameState !== undefined),
    playerTurn = ''

    if(ready){
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
  }
}
