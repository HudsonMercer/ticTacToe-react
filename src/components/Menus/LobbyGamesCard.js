import React, {Component} from 'react'
import {connect} from 'react-redux'
import {firebaseConnect, dataToJS} from 'react-redux-firebase'
import {fireHostGame} from '../../actions/firebaseActions'
import LobbyGameItem from '../Views/LobbyItems/LobbyGameItem'
import {
        Button,
        CardActions,
        CardText,
        Icon,
        List,
        ListDivider
        } from 'react-mdc-web'

@firebaseConnect([{
  path: '/lobby/games',
  storeAs: 'GAMESLIST',
}])

@connect(store => ({
  gamesList: dataToJS(store.firebase, 'GAMESLIST'),
  uid: store.userState.uid,
}), {
  fireHostGame,
})

export default class LobbyGamesView extends Component{

  getGamesList = () => {
    let list = this.props.gamesList
    let elements = []
    let returnList = []

    for (let game in list){
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
            onClick={() => {
              this.props.fireHostGame(this.props.firebase, this.props.uid)
            }}
          >Host Game</Button>
        </CardActions>
      </div>
    )
  }
}
