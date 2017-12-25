import React, {Component} from 'react';
import {connect} from 'react-redux'
import './styles/default.css';

import HeaderToolbar from './components/Header/HeaderToolbar'
import MainContentsView from './components/Views/MainContents'
import QuickNavigation from './components/Menus/QuickNavigation'
import SplashScreen from './components/Views/SplashScreen'
import AvatarImg from './res/avatar.png'

class App extends Component {
  constructor() {
    super()

    this.state = {
      userName: '',
      quickNavigationState: {
        isOpen: false,
        activeItem: 'lobby',
      },
      mainContents:{
        isOpen: true,
        },
      settingsState:{
        activeItem: 'general',
        isOpen: false,
        setActiveTab: this.settingsSetActiveTab,
      },
      splash: {
        isOpen: true,
      },
      colorScheme: {
        red: 0,
        green: 0,
        blue: 0,
      },
      lobbyState: {
        isOpen: true,
        lobbyGames: [],
      },
    }

  }

  toggleQuickNavigation = ()=>{
    this.setState((prevState)=>({
      quickNavigationState:{
        ...prevState.quickNavigationState,
        isOpen: this.state.quickNavigationState.isOpen ? false : true
      }
    }))
  }

  openToView = (t)=>{
    this.setState(prevState => ({
      quickNavigationState:{
        ...prevState.quickNavigationState,
        activeItem: t,
        isOpen: false
      },
      settingsState: {
        ...prevState.settingsState,
        activeItem: t,
        isOpen: true
      },
      lobbyState: {
        ...prevState.lobbyState,
        isOpen: false
      }
    }))
  }

  settingsSetActiveTab = (t)=>{
    this.setState(prevState => ({
      quickNavigationState:{
                            ...prevState.quickNavigationState,
                            activeItem: t
                          },
      settingsState:{
                      ...prevState.settingsState,
                      activeItem: t
                    }
    }))
  }

  handleNameChange = (t)=>{
    this.setState(
      {
        userName: t.target.value
      }
    )
  }

  toggleSplash = ()=>{
    this.setState({
      splash:{
        isOpen: this.state.splash.isOpen ? false : true
      }
    })
  }

  setColorScheme = (r, g, b) =>{
    this.setState({
      colorScheme:{
        red: r,
        green: g,
        blue: b
      }
    })
  }

  openLobby = () =>{
    this.setState(prevState =>({
      quickNavigationState:{
        ...prevState.quickNavigationState,
        activeItem: 'lobby'
      },
      settingsState: {
        ...prevState.settingsState,
        isOpen: false
      },
      lobbyState: {
        ...prevState.lobbyState,
        isOpen: true,
      }
    }))

    this.toggleQuickNavigation()
  }

  pushLobbyGame = (gameObject) =>{
    let lobbyGameList = this.state.lobbyState.lobbyGames
    let index = lobbyGameList.push(gameObject)
    this.setState(prevState => ({
      lobbyState: {
        ...prevState.lobbyState,
        lobbyGames: lobbyGameList
      }
    }))
    console.log(this.state.lobbyState.lobbyGames[index])
  }

  render() {
    return (
      <div>
        <SplashScreen/>
        <HeaderToolbar
          userName={this.state.userName}
          openToView={this.openToView}
          avatarImg={AvatarImg}
        />
        <QuickNavigation
          openToView={this.openToView}
          openLobby={this.openLobby}
        />
        <MainContentsView
          pushLobbyGame={this.pushLobbyGame}
          lobbyState={this.state.lobbyState}
          settingsState={this.state.settingsState}
          userName={this.state.userName}
          handleNameChange={this.handleNameChange}
          avatarImg={AvatarImg}
          colorScheme={this.state.colorScheme}
          setColorScheme={this.setColorScheme}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default App
