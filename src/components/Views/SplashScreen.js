import React, {Component} from 'react'


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
      }

    return(
      <div className="SplashScreen splashTheme" style={this.props.isOpen ? showSplashStyle : hideSplashStyle}
      >
        <h1 className="splashTheme">Tic-Tac-Toe!</h1>
        <div className="splashLoginDialog">
          <span className="splashSpan splashTheme">User Name</span>
          <div className="splashInputBox splashTheme">Test</div>
          <span className="splashSpan splashTheme">Password</span>
          <div className="splashInputBox splashTheme">Test</div>
          <span className="splashSkip"onClick={this.toggleSplash}>Skip</span>
        </div>
      </div>
    )
  }
}

export default SplashScreen
