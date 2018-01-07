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

export default class LobbyGameItem extends Component{
  constructor(){
    super()
    this.state = {menuIsOpen: false, menuTop: 0, menuLeft: 0}
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
          <MenuItem>
            Join
          </MenuItem>
          <MenuItem>
            Observe
          </MenuItem>
          <MenuItem>
            List Players
          </MenuItem>
        </Menu>
        <ListItemText>{this.props.hostName}
          <ListItemTextSecondary>{this.props.gameStatus}...
          </ListItemTextSecondary>
        </ListItemText>
      </ListItem>
    )
  }
}
