import React, {Component} from 'react'
import {connect} from 'react-redux'

import SettingsView from './SettingsView'
import LobbyView from './LobbyView'
import GameBoard from './GameBoard'

@connect(store => ({
  uiState: store.uiState,
}),
)

export default class MainContentsView extends Component {
  render(){
      switch(this.props.uiState.activeView){
        case 'lobby':
          return(<LobbyView/>)
        case 'settings':
          return(<SettingsView/>)
        case 'gameBoard':
          return (<GameBoard/>)
        default:
          return null
    }
  }
}
