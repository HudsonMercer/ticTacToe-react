import React, {Component} from 'react';
import {connect} from 'react-redux'
import {toggleSplash, toggleQuickNavigation, setSettingsActiveItem, uiSetActiveView, quickNavigationSetActiveItem} from '../../actions/uiActions'
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
                this.props.toggleThis(false)
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
            <div
              style={{display: this.props.userIsPlaying ? 'flex' : 'none'}}
              selected={this.props.activeItem === 'gameBoard'}
              onClick={() => {
                this.props.setActiveItem('gameBoard')
                this.props.toggleThis(false)
              }}>
              <Icon name="border_all"/>Game Board
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
    activeItem: store.quickNavigationState.activeItem,
    userIsPlaying: store.userState.isPlaying,
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
      switch(target){
        case 'lobby':
          dispatch(uiSetActiveView(target))
          dispatch(quickNavigationSetActiveItem(target))
        break
        case 'general':
          dispatch(uiSetActiveView('settings'))
          dispatch(setSettingsActiveItem(target))
          dispatch(quickNavigationSetActiveItem(target))
        break
        case 'avatar':
          dispatch(uiSetActiveView('settings'))
          dispatch(setSettingsActiveItem(target))
          dispatch(quickNavigationSetActiveItem(target))
        break
        case 'colorScheme':
          dispatch(uiSetActiveView('settings'))
          dispatch(setSettingsActiveItem(target))
          dispatch(quickNavigationSetActiveItem(target))
        break
        case 'gameBoard':
          dispatch(uiSetActiveView(target))
          dispatch(quickNavigationSetActiveItem(target))
        break
        default:
          dispatch(uiSetActiveView('lobby'))
        break
      }
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(QuickNavigation)
