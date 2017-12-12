import React, {Component} from 'react'
import {
        Cell,
        Grid
        } from 'react-mdc-web';

import SettingsView from './SettingsView'

class MainContentsView extends Component {

  render(){
    return(
      <div id="bodyContents" style={{overflowY: 'scroll'}}>
        <Grid>
          <Cell col={2}></Cell>
          <Cell col={8}>
            <SettingsView
              settingsState={this.props.settingsState}
              userName={this.props.userName}
              handleNameChange={this.props.handleNameChange}
              avatarImg={this.props.avatarImg}
              colorScheme={this.props.colorScheme}
              setColorScheme={this.props.setColorScheme}
            >
            </SettingsView>
          </Cell>
          <Cell col={2}></Cell>
        </Grid>
      </div>
    )
  }
}

export default MainContentsView
