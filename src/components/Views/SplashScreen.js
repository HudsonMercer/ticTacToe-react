import React, {Component} from 'react'
import {connect} from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty, dataToJS } from 'react-redux-firebase'
import FaFacebookSquare from 'react-icons/lib/fa/facebook-square'
import FaTwitterSquare from 'react-icons/lib/fa/twitter-square'
import FaGithubSquare from 'react-icons/lib/fa/github-square'
import FaGoogle from 'react-icons/lib/fa/google'
import {toggleSplash} from '../../actions/uiActions'
import {
        Icon
        } from 'react-mdc-web';

@firebaseConnect()

@connect(store => ({
  isOpen: store.splashState.isOpen
}),{
  toggleThis: toggleSplash,
})

export default class SplashScreen extends Component {
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
          <span className="splashSpan splashTheme">E-Mail</span>
          <div className="splashInputBox splashTheme">
            <input className="splashInput" type="text" id="splashNameInput" name="splashName"/>
          </div>
          <span className="splashSpan splashTheme">Password</span>
          <div className="splashInputBox splashTheme">
            <input className="splashInput" type="password" id="splashPasswordInput" name="splashPassword"/><Icon name="chevron_right" style={loginArrowStyle}></Icon>
          </div>
          <span
            className="splashSkip"
            onClick={this.props.toggleThis}
          >Skip</span>
          <div>
            <FaFacebookSquare
              style={{cursor: 'pointer'}}
              onClick={() => {

                this.props.firebase.login({
                  provider: 'facebook',
                  type: 'popup'
                }).then(this.props.toggleThis)
              }}
              height={32}
              width={32}/>
            <FaTwitterSquare
              style={{cursor: 'pointer'}}
              onClick={() => {

                this.props.firebase.login({
                  provider: 'twitter',
                  type: 'popup'
                }).then(this.props.toggleThis)
              }}
              height={32}
              width={32}/>
            <FaGithubSquare
              style={{cursor: 'pointer'}}
              onClick={() => {

                this.props.firebase.login({
                  provider: 'github',
                  type: 'popup'
                }).then(this.props.toggleThis)
              }}
              height={32}
              width={32}/>
            <FaGoogle
              style={{cursor: 'pointer'}}
              onClick={() => {

                this.props.firebase.login({
                  provider: 'google',
                  type: 'popup'
                }).then(this.props.toggleThis)
              }}
              height={32}
              width={32}/>
          </div>
        </div>
      </div>
    )
  }
}
