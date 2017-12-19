import React, {Component} from 'react'
import {
        Tab,
        Tabbar
        } from 'react-mdc-web'

import NameCard from '../Menus/NameCard'
import AvatarCard from '../Menus/AvatarCard'
import ColorSchemeCard from '../Menus/ColorSchemeCard'


class SettingsView extends Component{
  render(){

  let activeCard

  switch(this.props.activeItem){
    case 'general':
     activeCard = <NameCard
       userName={this.props.userName}
       settingsState={this.props}
       handleNameChange={this.props.handleNameChange}
                  />
      break
    case 'avatar':
    activeCard = <AvatarCard
      settingsState={this.props}
      avatarImg={this.props.avatarImg}
                 />
      break
    case 'colorScheme':
    activeCard = <ColorSchemeCard
      settingsState={this.props}
      colorScheme={this.props.colorScheme}
      setColorScheme={this.props.setColorScheme}
                 />
      break
    default:
    activeCard = null
      throw {message: 'Invalid tab index given to SettingsView.js, given ' + this.props.activeItem}
  }

    if(this.props.isOpen){
      return(
      <div>
        <Tabbar>
          <Tab
            active={this.props.activeItem === 'general'}
            onClick={() => {this.props.setActiveTab('general')}}
          >
            General
          </Tab>
          <Tab
            active={this.props.activeItem === 'avatar'}
            onClick={() => {this.props.setActiveTab('avatar')}}
          >
            Avatar
          </Tab>
          <Tab
            active={this.props.activeItem === 'colorScheme'}
            onClick={() => {this.props.setActiveTab('colorScheme')}}
          >
            Color Scheme
          </Tab>
          <span className="mdc-tab-bar__indicator"></span>
        </Tabbar>
        {activeCard}
      </div>
    )}  else  {
          return null
         }
  }
}

export default SettingsView
