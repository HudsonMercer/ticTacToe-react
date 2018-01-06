import React, {Component} from 'react';
import './styles/default.css';

import HeaderToolbar from './components/Header/HeaderToolbar'
import MainContentsView from './components/Views/MainContents'
import QuickNavigation from './components/Menus/QuickNavigation'
import SplashScreen from './components/Views/SplashScreen'

class App extends Component {

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
