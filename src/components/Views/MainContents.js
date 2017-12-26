import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
        Cell,
        Grid
        } from 'react-mdc-web'

import SettingsView from './SettingsView'
import LobbyView from './LobbyView'

class MainContentsView extends Component {
  render(){
      if(this.props.uiState.activeView === 'lobby'){
        return(
          <div id="bodyContents" style={{overflowY: 'scroll'}}>
            <LobbyView
            />
          </div>
        )
      } else if (this.props.uiState.activeView === 'settings'){
        return(
          <div id="bodyContents" style={{overflowY: 'scroll'}}>
            <Grid>
              <Cell col={2}></Cell>
              <Cell col={8}>
                <SettingsView
                />
              </Cell>
              <Cell col={2}></Cell>
            </Grid>
          </div>
      )}
      return null
  }
}

const mapStateToProps = (store) => {
    return {
      uiState: store.uiState

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContentsView)
