import React, {Component} from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import store from '../../store'
import {firebaseConnect, dataToJS} from 'react-redux-firebase'
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
    path: `lobby/games/${store.getState().userState.uid}/`,
    storeAs: 'GAMESTATE',
  }
]))

@connect(store => ({
  gameState: dataToJS(store.firebase, 'GAMESTATE'),
  squares: document.getElementsByClassName('boardSquare')
}),
{

})

export default class GameBoard extends Component{

  updateBoard = () => {
    let squares = this.props.squares
    let idx = 0
    for(const prop of squares){
      if(this.props.gameState.boardState[idx] !== 'e'){
        prop.innerHTML = this.props.gameState.boardState[idx]
      }
      idx++
    }
  }

  render(){
    let ready = (this.props.gameState !== undefined)
    if(ready){
      this.updateBoard()
    }
    return(
      <Card className="gameBoardCard">
        <Toolbar>
          <ToolbarRow>
            <ToolbarSection>
              Games Played: 4
            </ToolbarSection>
            <ToolbarSection>
              <Headline
                className="no-mobile"
              >
                {(ready ? this.props.gameState.host + ' VS' : '')}  {(ready ? this.props.gameState.client : '')}
              </Headline>
            </ToolbarSection>
            <ToolbarSection>
              Score: 1 - 3
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>
        <CardText>
          <div className="gameBoardFlexbox">
            <div className="boardSquare">r</div>
            <div className="boardSquare">r</div>
            <div className="boardSquare">r</div>
            <div className="boardSquare">r</div>
            <div className="boardSquare">r</div>
            <div className="boardSquare">r</div>
            <div className="boardSquare">r</div>
            <div className="boardSquare">r</div>
            <div className="boardSquare">r</div>
          </div>
        </CardText>
      </Card>
    )
  }
}
