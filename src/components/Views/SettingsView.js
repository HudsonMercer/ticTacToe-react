import React, {Component} from 'react'
import {
        Tab,
        Tabbar
        } from 'react-mdc-web'

import NameCard from '../Menus/NameCard'
import AvatarCard from '../Menus/AvatarCard'
import ColorSchemeCard from '../Menus/ColorSchemeCard'


class SettingsView extends Component{
 constructor(props){
   super(props)


 }
  render(){

  let activeCard


  switch(this.props.settingsState.activeTab){
    case 1:
     activeCard = <NameCard
       userName={this.props.userName}
      settingsState={this.props.settingsState}
      handleNameChange={this.props.handleNameChange}
           ></NameCard>
      break
    case 2:
    activeCard = <AvatarCard
      settingsState={this.props.settingsState}
      avatarImg={this.props.avatarImg}
           >
    </AvatarCard>
      break
    case 3:
    activeCard = <ColorSchemeCard
      settingsState={this.props.settingsState}
      CSSstate={'block'}
           >
    </ColorSchemeCard>
    break
    default:
    throw 'Invalid tab index given to SettingsView.js'
    break
  }

    if(this.props.settingsState.isOpen){return(
      <div style={{display: this.props.settingsState.isOpen ? 'block' : 'block'}}>
        <Tabbar>
          <Tab
            active={this.props.settingsState.activeTab===1}
            onClick={() => {this.props.settingsState.setActiveTab(1)}}
          >
            General
          </Tab>
          <Tab
            active={this.props.settingsState.activeTab===2}
            onClick={() => {this.props.settingsState.setActiveTab(2)}}
          >
            Avatar
          </Tab>
          <Tab
            active={this.props.settingsState.activeTab===3}
            onClick={() => {this.props.settingsState.setActiveTab(3)}}
          >
            Color Scheme
          </Tab>
          <span className="mdc-tab-bar__indicator"></span>
        </Tabbar>
        {activeCard}
      </div>
    )} else {return(<div></div>)}
  }
}

export default SettingsView
