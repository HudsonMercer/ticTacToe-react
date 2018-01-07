import React, {Component} from 'react'
import {connect} from 'react-redux'
import {toggleLobbyActiveItem} from '../../actions/uiActions'
import LobbyGameItem from './LobbyItems/LobbyGameItem'
import LobbyChatList from '../Menus/LobbyChatCard'
import LobbyGamesList from '../Menus/LobbyGamesCard'

import {
        Card,
        Toolbar,
        ToolbarRow,
        ToolbarSection,
        ToolbarTitle
        } from 'react-mdc-web'

@connect(store => ({
  isOpen: store.lobbyState.isOpen,
  activeItem: store.lobbyState.activeItem,
}),
  {
    toggleLobbyActiveItem,
  })

export default class LobbyView extends Component {

  render(){
    let gamesView = null, chatView = null

    switch(this.props.activeItem){
      case 'games':
      chatView = null
        gamesView = <LobbyGamesList/>
      break
      case 'chat':
        chatView = <LobbyChatList/>
        gamesView = null
      break
      default:
        chatView = <LobbyChatList/>
        gamesView = null
      break
    }

    if(this.props.isOpen){
      return(
        <div style={{height: '92.5vh'}}>
          <Card>
            <Toolbar
              onClick={this.props.toggleLobbyActiveItem}
            >
              <ToolbarRow>
                <ToolbarSection>
                  <ToolbarTitle>
                    Games
                  </ToolbarTitle>
                </ToolbarSection>
              </ToolbarRow>{}
            </Toolbar>
            {gamesView}
          </Card>

          <Card>
            <Toolbar
              onClick={this.props.toggleLobbyActiveItem}>
              <ToolbarRow>
                <ToolbarSection>
                  <ToolbarTitle>
                    Chat
                  </ToolbarTitle>
                </ToolbarSection>
              </ToolbarRow>
            </Toolbar>
            {chatView}
          </Card>
        </div>
      )
    } else {
      return null
    }
  }
}
