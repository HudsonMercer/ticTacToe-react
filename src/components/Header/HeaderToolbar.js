import React, {Component} from 'react';
import style from 'styled-components';
import HeaderQuickNavigation from './HeaderQuickNavigation'
import {
        Toolbar,
        ToolbarRow,
        ToolbarSection,
        Display1
        } from 'react-mdc-web';


const ToolBarImage = style.img`
  max-width: 8vh;
  max-height: 8vh;
  margin: 1vh;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
  }
  `

class HeaderToolbar extends Component {

  render(){
    return(
      <Toolbar fixed style={{paddingLeft: '2vh', paddingRight: '2vh'}}>
        <ToolbarRow>
          <ToolbarSection align="start">
            <HeaderQuickNavigation onClick={this.props.toggleQuickNavigation}>
            </HeaderQuickNavigation>
          </ToolbarSection>
          <ToolbarSection>
            <Display1 className="settingsHeader">
              {`${this.props.userName ? `Hello, ${this.props.userName}` : 'Tic Tac Toe'} `}
            </Display1>
          </ToolbarSection>
          <ToolbarSection align="end">
            <ToolBarImage onClick={() => {this.props.openToView(2)}} src={this.props.avatarImg} alt=""/>
          </ToolbarSection>
        </ToolbarRow>
      </Toolbar>


    )
  }
}

export default HeaderToolbar;
