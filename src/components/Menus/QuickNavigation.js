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
    constructor(props){
      super(props)
      this.state = {
      }
    }


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
            <div><Icon name='message'/>Lobby</div>
            <ListDivider/>
            <div>Settings</div>
            <div
              selected={this.props.activeTab === 1}
              onClick={() => this.props.openToView(1)}
            >
              <Icon name='settings'/>General</div>
            <div
              selected={this.props.activeTab === 2}
              onClick={() => this.props.openToView(2)}
            >
              <Icon name='person'/>Avatar
            </div>
            <div
              selected={this.props.activeTab === 3}
              onClick={() => this.props.openToView(3)}
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
