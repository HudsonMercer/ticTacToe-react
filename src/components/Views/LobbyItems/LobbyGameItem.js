import React, {Component} from 'react'
import {connect} from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty, dataToJS, pathToJS, populatedDataToJS } from 'react-redux-firebase'
import {fireJoinGame, fireUserLeaveGame} from '../../../actions/firebaseActions'

import {
        Menu,
        MenuAnchor,
        MenuItem,
        MenuDivider,
        Icon,
        List,
        ListItem,
        ListItemText,
        ListItemTextSecondary,
        ListDivider,
        ListGroup
        } from 'react-mdc-web'

@firebaseConnect()

@connect(store => ({
  userUid: store.userState.uid,
}),{
  fireJoinGame,
  fireUserLeaveGame,
})

export default class LobbyGameItem extends Component{
  constructor(){
    super()
    this.state = {menuIsOpen: false, menuTop: 0, menuLeft: 0}
  }

  joinGameHandler = () => {
    this.props.firebase.database().ref(`lobby/games/${this.props.uid}/`).child('client').once('value').then((snap) => {
      if(snap.val() === ''){
        this.props.fireJoinGame(this.props.firebase, this.props.uid)
        window.onunload = () => {
          this.props.fireUserLeaveGame(this.props.firebase, this.props.userUid, this.props.uid)

          this.props.firebase.database().ref(`/lobby/games/${this.props.uid}/`).child('host').once('value').then((snap) => {
            if(!snap.val()){
              this.props.firebase.remove(`/lobby/games/${this.props.uid}`)
            }
          })
        }
      }
    })
  }

  render(){
    return (
      <ListItem
        style={{userSelect: 'none'}}
      >
        <Icon name="menu"
          onClick={(e) => {
            this.setState({
              ...this.state,
              menuIsOpen: true,
              menuTop: e.pageY,
              menuLeft: e.pageX
            })
          }}
          style={{cursor: 'pointer'}}
        />
        <Menu
          style={{
            position: 'aboslute',
            top: this.state.menuTop,
            left: this.state.menuLeft
          }}
          open={this.state.menuIsOpen}
          onClose={()=>{this.setState({menuIsOpen:false})}}
        >
          <MenuItem
            onClick={this.joinGameHandler}>
            Join
          </MenuItem>
          <MenuItem>
            Observe
          </MenuItem>
          <MenuItem>
            List Players
          </MenuItem>
        </Menu>
        <ListItemText>{this.props.hostName}'s game
          <ListItemTextSecondary>{this.props.gameStatus}...
          </ListItemTextSecondary>
        </ListItemText>
      </ListItem>
    )
  }
}
