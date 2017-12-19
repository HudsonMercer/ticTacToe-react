import React, {Component} from 'react'
import {
        Cell,
        Grid
        } from 'react-mdc-web'

import SettingsView from './SettingsView'
import LobbyView from './LobbyView'

class MainContentsView extends Component {

  render(){
      if(this.props.lobbyState.isOpen){
        return(
          <div id="bodyContents" style={{overflowY: 'scroll'}}>
            <LobbyView
              {...this.props.lobbyState}
              pushLobbyGame={this.pushLobbyGame}
            />
          </div>
        )
      } else if (this.props.settingsState.isOpen){
        return(
          <div id="bodyContents" style={{overflowY: 'scroll'}}>
            <Grid>
              <Cell col={2}></Cell>
              <Cell col={8}>
                <SettingsView
                  {...this.props.settingsState}
                  userName={this.props.userName}
                  handleNameChange={this.props.handleNameChange}
                  avatarImg={this.props.avatarImg}
                  colorScheme={this.props.colorScheme}
                  setColorScheme={this.props.setColorScheme}
                />
              </Cell>
              <Cell col={2}></Cell>
            </Grid>
          </div>
      )}
  }
}

export default MainContentsView
