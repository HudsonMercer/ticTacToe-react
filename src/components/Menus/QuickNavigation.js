import React, {Component} from 'react';
import {
        Drawer,
        DrawerContent,
        DrawerHeader,
        DrawerHeaderContent,
        Navigation,
        Icon,
        List,
        ListItem,
        ListDivider,
        Title,
        } from 'react-mdc-web';

  class QuickNavigation extends Component {

    render(){

      return(
      <Drawer
        open={this.props.isOpen}
        onClose={this.props.toggle}
      >

        <DrawerHeader>
          <DrawerHeaderContent>
            <Title>
              Quick Navigation
            </Title>
          </DrawerHeaderContent>
        </DrawerHeader>
        <DrawerContent>
          <Navigation id="hperadejadj">
            <div
              onClick={()=>{
                this.props.toggleSplash()
                this.props.toggle()
              }}
            ><Icon name='desktop_windows'/>Title Screen</div>
            <div
              selected={this.props.activeItem === 'lobby'}
              onClick={this.props.openLobby}
            >
              <Icon name='message'/>Lobby
            </div>
            <ListDivider/>
            <div>Settings</div>
            <div
              selected={this.props.activeItem === 'general'}
              onClick={() => this.props.openToView('general')}
            >
              <Icon name='settings'/>General</div>
            <div
              selected={this.props.activeItem === 'avatar'}
              onClick={() => this.props.openToView('avatar')}
            >
              <Icon name='person'/>Avatar
            </div>
            <div
              selected={this.props.activeItem === 'colorScheme'}
              onClick={() => this.props.openToView('colorScheme')}
            >
              <Icon name='color_lens'/>Color Theme
            </div>
          </Navigation>
        </DrawerContent>
      </Drawer>
    )
  }
}

export default QuickNavigation;
