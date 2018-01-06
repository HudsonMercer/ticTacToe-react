import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
        Cell,
        Grid
        } from 'react-mdc-web'

import SettingsView from './SettingsView'
import LobbyView from './LobbyView'
import GameBoard from './GameBoard'

@connect(store => ({
  uiState: store.uiState,
}),
)

export default class MainContentsView extends Component {
  render(){
      if(this.props.uiState.activeView === 'lobby'){
        return(
          <div style={{ height: '92.5vh'}}>
            <LobbyView/>
          </div>
        )
      } else if (this.props.uiState.activeView === 'settings'){
        return(
          <div style={{ height: '92.5vh'}}>
            <Grid>
              <Cell col={2}></Cell>
              <Cell col={8}>
                <SettingsView/>
              </Cell>
              <Cell col={2}></Cell>
            </Grid>
          </div>
      )} else if (this.props.uiState.activeView === 'gameBoard'){
        <GameBoard/>
      }
      return null
  }
}
