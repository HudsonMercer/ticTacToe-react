import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setActiveView, setSettingsActiveItem} from '../../actions/uiActions'
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

  return(
      <div>
        <Tabbar>
          <Tab
            active={this.props.activeItem === 'general'}
            onClick={() => {this.props.setActiveItem('general')}}
          >
            General
          </Tab>
          <Tab
            active={this.props.activeItem === 'avatar'}
            onClick={() => {this.props.setActiveItem('avatar')}}
          >
            Avatar
          </Tab>
          <Tab
            active={this.props.activeItem === 'colorScheme'}
            onClick={() => {this.props.setActiveItem('colorScheme')}}
          >
            Color Scheme
          </Tab>
          <span className="mdc-tab-bar__indicator"></span>
        </Tabbar>
        {activeCard}
      </div>
  )}
}

const mapStateToProps = (store) => {
  return {
    isOpen: store.settingsState.isOpen,
    activeItem: store.settingsState.activeItem
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveItem: (target) => {
      dispatch(setSettingsActiveItem(target))
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsView)
