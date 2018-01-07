import React, {Component} from 'react';
import {connect} from 'react-redux'
import {uiSetActiveView, toggleQuickNavigation, setSettingsActiveItem, quickNavigationSetActiveItem} from '../../actions/uiActions'
import style from 'styled-components';
import HeaderQuickNavigation from './HeaderQuickNavigation'
import {
        Toolbar,
        ToolbarRow,
        ToolbarSection,
        Display1
        } from 'react-mdc-web';


const ToolBarImage = style.img`
  max-width: 4vh;
  max-height: 4vh;
  margin: 1vh;
  height: 7.5vh;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
  }
  `

@connect(
  (store) => ({
    userName: store.userState.userName,
    avatarImg: store.avatarImg

  }),
  (dispatch) => (
    {
      openAvatarMenu: () => {
        dispatch(uiSetActiveView('settings'))
        dispatch(toggleQuickNavigation(false))
        dispatch(setSettingsActiveItem('avatar'))
        dispatch(quickNavigationSetActiveItem('avatar'))
      }
  })
)

export default class HeaderToolbar extends Component {

  render(){
    return(
      <Toolbar style={{paddingLeft: '2vh', paddingRight: '2vh', maxHeight: '10vh'}}>
        <ToolbarRow>
          <ToolbarSection align="start">
            <HeaderQuickNavigation>
            </HeaderQuickNavigation>
          </ToolbarSection>
          <ToolbarSection>
            <Display1 className="settingsHeader no-mobile">
              {`${this.props.userName ? `Hello, ${this.props.userName}` : 'Tic-Tac-Toe'} `}
            </Display1>
          </ToolbarSection>
          <ToolbarSection align="end">
            <ToolBarImage onClick={this.props.openAvatarMenu} src={this.props.avatarImg} alt=""/>
          </ToolbarSection>
        </ToolbarRow>
      </Toolbar>


    )
  }
}
