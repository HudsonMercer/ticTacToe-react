import React, {Component} from 'react';
import {connect} from 'react-redux'
import {toggleSplash, toggleQuickNavigation, setSettingsActiveItem, uiSetActiveView} from '../../actions/uiActions'
import {
        Drawer,
        DrawerContent,
        DrawerHeader,
        DrawerHeaderContent,
        Navigation,
        Icon,
        ListDivider,
        Title,
        } from 'react-mdc-web';

  class QuickNavigation extends Component {

    render(){

      return(
      <Drawer
        open={this.props.isOpen}
        onClose={this.props.toggleThis}
      >

        <DrawerHeader>
          <DrawerHeaderContent>
            <Title>
              Quick Navigation
            </Title>
          </DrawerHeaderContent>
        </DrawerHeader>
        <DrawerContent>
          <Navigation>
            <div
              onClick={()=>{
                this.props.toggleSplash()
                this.props.toggleThis()
              }}
            ><Icon name='desktop_windows'/>Title Screen</div>
            <div
              selected={this.props.activeItem === 'lobby'}
              onClick={() => {
                this.props.setActiveItem('lobby')
                this.props.toggleThis(false)
              }}
            >
              <Icon name='message'/>Lobby
            </div>
            <ListDivider/>
            <div>Settings</div>
            <div
              selected={this.props.activeItem === 'general'}
              onClick={() => {
                this.props.setActiveItem('general')
                this.props.toggleThis(false)
              }}
            >
              <Icon name='settings'/>General</div>
            <div
              selected={this.props.activeItem === 'avatar'}
              onClick={() => {
                this.props.setActiveItem('avatar')
                this.props.toggleThis(false)
              }}
            >
              <Icon name='person'/>Avatar
            </div>
            <div
              selected={this.props.activeItem === 'colorScheme'}
              onClick={() => {
                this.props.setActiveItem('colorScheme')
                this.props.toggleThis(false)
              }}
            >
              <Icon name='color_lens'/>Color Theme
            </div>
          </Navigation>
        </DrawerContent>
      </Drawer>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    isOpen: store.quickNavigationState.isOpen,
    activeItem: store.settingsState.activeItem,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSplash: () => {
      dispatch(toggleSplash())
    },
    toggleThis: () => {
      dispatch(toggleQuickNavigation())
    },
    setActiveItem: (target) => {
      dispatch(setSettingsActiveItem(target))
      if (target === 'lobby'){
        dispatch(uiSetActiveView('lobby'))
      } else {
        dispatch(uiSetActiveView('settings'))
      }
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(QuickNavigation)
