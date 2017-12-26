import React, {Component} from 'react';
import './styles/default.css';

import HeaderToolbar from './components/Header/HeaderToolbar'
import MainContentsView from './components/Views/MainContents'
import QuickNavigation from './components/Menus/QuickNavigation'
import SplashScreen from './components/Views/SplashScreen'

class App extends Component {
  constructor() {
    super()
  const pushLobbyGame = (gameObject) =>{
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
}

  render() {
    return (
      <div>
        <SplashScreen/>
        <HeaderToolbar/>
        <QuickNavigation/>
        <MainContentsView
        />
      </div>
    )
  }
}

export default App
