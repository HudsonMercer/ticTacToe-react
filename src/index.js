import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {createStore} from 'redux';
import store from './store'
import registerServiceWorker from './registerServiceWorker';

import App from './App';

const initState = {
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

store.subscribe(() => {
  console.log(store.getState())
})

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

registerServiceWorker();
