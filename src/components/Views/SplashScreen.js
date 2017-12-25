import React, {Component} from 'react'
import {connect} from 'react-redux'
import {toggleSplash} from '../../actions/uiActions'
import {
        Icon
        } from 'react-mdc-web';

class SplashScreen extends Component {
  render(){
    const
      hideSplashStyle = {
        top: '-110vh'
      },
      showSplashStyle = {
        top: '0vh'
      },
      loginArrowStyle = {
        position: 'absolute',
        backgroundColor: 'var(--mdc-theme-primary)',
        borderRadius: '50%',
        right: '3%',
        top: '25%'
      }

    return(
      <div className="SplashScreen splashTheme" style={this.props.isOpen ? showSplashStyle : hideSplashStyle}
      >
        <h1 className="splashTheme">Tic-Tac-Toe!</h1>
        <div className="splashLoginDialog">
          <span className="splashSpan splashTheme">User Name</span>
          <div className="splashInputBox splashTheme">
            <input className="splashInput" type="text" id="splashNameInput" name="splashName"/>
          </div>
          <span className="splashSpan splashTheme">Password</span>
          <div className="splashInputBox splashTheme">
            <input className="splashInput" type="password" id="splashPasswordInput" name="splashPassword"/><Icon name="chevron_right" style={loginArrowStyle}></Icon>
          </div>
          <span className="splashSkip" onClick={this.props.toggleThis}>Skip</span>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    isOpen: store.splashState.isOpen
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleThis: () => {
      dispatch(toggleSplash())
    }
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)
