import React, {Component} from 'react';
import './styles/default.css';

import HeaderToolbar from './components/Header/HeaderToolbar'
import MainContentsView from './components/Views/MainContents'
import QuickNavigation from './components/Menus/QuickNavigation'
import SplashScreen from './components/Views/SplashScreen'
import AvatarImg from './res/avatar.png'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      quickNavigationActive: false,
      mainContents:{
                    isOpen: true
                    },
      settingsState:{
                    activeTab: 1,
                    isOpen: true,
                    setActiveTab: this.settingsSetActiveTab
      },
      splash: {
        isOpen: true
      }
    }

  }

  toggleQuickNavigation = ()=>{
    this.setState({
      quickNavigationActive: this.state.quickNavigationActive ? false : true
    })
  }

  openToView = (t)=>{
    this.setState(prevState => ({
      quickNavigationActive: false,
      settingsState: {
        ...prevState.settingsState,
        activeTab: t,
        isOpen: true
      }
    }))
  }

  settingsSetActiveTab = (t)=>{
    this.setState(prevState => ({
      settingsState:{
                      ...prevState.settingsState,
                      activeTab: t
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

  render() {
    return (
      <div>
        <SplashScreen isOpen={this.state.splash.isOpen} toggleSplash={this.toggleSplash}/>
        <HeaderToolbar
          toggleQuickNavigation={this.toggleQuickNavigation}
          userName={this.state.userName}
          openToView={this.openToView}
          avatarImg={AvatarImg}
        />
        <QuickNavigation
          isOpen={this.state.quickNavigationActive}
          toggle={this.toggleQuickNavigation}
          toggleSplash={this.toggleSplash}
          activeTab={this.state.settingsState.activeTab}
          openToView={this.openToView}
        />
        <MainContentsView
          isOpen={this.state.mainContents.isOpen}
          settingsState={this.state.settingsState}
          userName={this.state.userName}
          handleNameChange={this.handleNameChange}
          avatarImg={AvatarImg}
        />
      </div>
    )
  }
}

export default App;
