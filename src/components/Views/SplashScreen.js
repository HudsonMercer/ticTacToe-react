import React, {Component} from 'react'
import {
        Icon
        } from 'react-mdc-web';

class SplashScreen extends Component {
  constructor(props){
    super(props)
    this.toggleSplash = this.props.toggleSplash
  }




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
          <span className="splashSkip"onClick={this.toggleSplash}>Skip</span>
        </div>
      </div>
    )
  }
}

export default SplashScreen
