import React, {Component} from 'react'
import {connect} from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty, dataToJS, pathToJS, populatedDataToJS } from 'react-redux-firebase'

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


@connect()

export default class LobbyGameItem extends Component{
  constructor(){
    super()
    this.state = {menuIsOpen: false}
  }

  render(){
    return (
      <ListItem style={{overflowY: 'visible'}}>
        <Icon name="menu" onClick={() => {
          this.setState({...this.state, menuIsOpen: true})
        }}/>
        <MenuAnchor>
          <Menu
            open={this.state.menuIsOpen}
            onClose={()=>{this.setState({menuIsOpen:false})}}
            style={{overflowY: 'visible'}}
          >
            <MenuItem>
              Andromeda
            </MenuItem>
          </Menu>
        </MenuAnchor>
        <ListItemText>{this.props.hostName}
          <ListItemTextSecondary>{this.props.gameStatus}...
          </ListItemTextSecondary>
        </ListItemText>
      </ListItem>
    )
  }
}
