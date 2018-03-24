import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  setSettingsActiveItem,
  quickNavigationSetActiveItem,
} from '../../actions/uiActions';
import { Tab, Tabbar, Grid, Cell } from 'react-mdc-web';
import NameCard from '../Menus/NameCard';
import AvatarCard from '../Menus/AvatarCard';
import AboutCard from '../Menus/AboutCard';
import ColorSchemeCard from '../Menus/ColorSchemeCard';

@connect(
  store => ({
    isOpen: store.settingsState.isOpen,
    activeItem: store.settingsState.activeItem,
  }),
  dispatch => ({
    setActiveItem: target => {
      dispatch(setSettingsActiveItem(target));
      dispatch(quickNavigationSetActiveItem(target));
    },
  }),
)
export default class SettingsView extends Component {
  render() {
    let activeCard,
      err = {
        message: `Invalid tab index given to SettingsView.js, given  ${
          this.props.activeItem
        }. Defaulting to <NameCard>`,
        name: 'Invalid Index',
      };

    switch (this.props.activeItem) {
      case 'general':
        activeCard = <NameCard />;
        break;
      case 'avatar':
        activeCard = <AvatarCard />;
        break;
      case 'colorScheme':
        activeCard = <ColorSchemeCard />;
        break;
      case 'about':
        activeCard = <AboutCard />;
        break;
      default:
        activeCard = <NameCard />;
        throw err;
    }

    return (
      <Grid>
        <Cell col={2} />
        <Cell col={8}>
          <Tabbar>
            <Tab
              active={this.props.activeItem === 'general'}
              onClick={() => {
                this.props.setActiveItem('general');
              }}
            >
              General
            </Tab>
            <Tab
              active={this.props.activeItem === 'avatar'}
              onClick={() => {
                this.props.setActiveItem('avatar');
              }}
            >
              Avatar
            </Tab>
            <Tab
              active={this.props.activeItem === 'colorScheme'}
              onClick={() => {
                this.props.setActiveItem('colorScheme');
              }}
            >
              Color Scheme
            </Tab>
            <Tab
              active={this.props.activeItem === 'about'}
              onClick={() => {
                this.props.setActiveItem('about');
              }}
            >
              About
            </Tab>
            <span className="mdc-tab-bar__indicator" />
          </Tabbar>
          {activeCard}
        </Cell>
        <Cell col={2} />
      </Grid>
    );
  }
}
