import React, {Component} from 'react'
import {connect} from 'react-redux'
import {firebaseConnect, dataToJS} from 'react-redux-firebase'
import {fireHostGame, fireUserLeaveGame} from '../../actions/firebaseActions'
import LobbyGameItem from '../Views/LobbyItems/LobbyGameItem'
import {
        Button,
        CardActions,
        CardText,
        Icon,
        List,
        ListDivider
        } from 'react-mdc-web'

@firebaseConnect([
  {
  path: '/lobby/games',
  storeAs: 'LOBBY_GAMESLIST',
  },
  {
    path: '/lobby/'
  }
  ])

@connect(store => ({
  gamesList: dataToJS(store.firebase, 'LOBBY_GAMESLIST'),
  uid: store.userState.uid,
  canHost: store.userState.isPlaying,
}), {
  fireHostGame,
  fireUserLeaveGame,
})

export default class LobbyGamesView extends Component{

  getGamesList = () => {
    let list = this.props.gamesList
    let elements = []
    let returnList = []

    for (let game in list){
      console.dir(list[1]);
      elements.push(
        <LobbyGameItem
          hostName={list[game].host}
          gameStatus={list[game].status}
          uid={list[game].uid}
        />
      )
    }
    elements.forEach((curVal) => {
      returnList.push(curVal)
      returnList.push(<ListDivider/>)
    })
    return (
      <div>
        {returnList}
      </div>
    )
  }

  render(){
    return(
      <div>
        <CardText>
          <List id="lobbyGamesList" style={{maxHeight: '53vh', overflowY: 'scroll'}}>
            {this.getGamesList()}
          </List>
        </CardText>
        <CardActions>
          <Button
            raised
            disabled={this.props.canHost}
            onClick={() => {
              this.props.fireHostGame(this.props.firebase, this.props.uid)
              window.onunload = () => {
                this.props.fireUserLeaveGame(this.props.firebase, this.props.uid, this.props.uid)
              }}}
          >Host Game</Button>
        </CardActions>
      </div>
    )
  }
}
