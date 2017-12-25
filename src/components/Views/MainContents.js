import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
        Cell,
        Grid
        } from 'react-mdc-web'

import {toggleQuickNavigation} from '../../actions/uiActions'

import SettingsView from './SettingsView'
import LobbyView from './LobbyView'

class MainContentsView extends Component {
  render(){
      if(this.props.lobbyState.isOpen){
        return(
          <div onClick={() => this.props.setMath(true)} id="bodyContents" style={{overflowY: 'scroll'}}>
            <LobbyView
              {...this.props.lobbyState}
              pushLobbyGame={this.pushLobbyGame}
            />
          </div>
        )
      } else if (this.props.settingsState.isOpen){
        return(
          <div onclick={(test = 5) => {this.props.setMath(test)}} id="bodyContents" style={{overflowY: 'scroll'}}>
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

const mathInc = (e) => ({
  type: 'INC',
  payload: e
})

const mapStateToProps = (state) => {
    return {
      mathField: state.mathField,
      quickNavigationState2: state.quickNavigationState
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      setMath: (e) => {
        dispatch(toggleQuickNavigation(e))
      },
      quickNavigationState: () => {
        dispatch(mathInc(32))
      }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContentsView)
