import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { setColorScheme } from '../../actions/uiActions';
import {
  fireSaveColorScheme,
  fireGetColorScheme,
} from '../../actions/firebaseActions';
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  CardText,
  Content,
  Slider,
} from 'react-mdc-web';

@firebaseConnect([
  {
    path: 'userProfiles/',
  },
])
@connect(
  store => ({
    colorScheme: store.colorScheme,
  }),
  {
    setColorScheme,
    fireSaveColorScheme,
    fireGetColorScheme,
  },
)
export default class ColorSchemeCard extends Component {
  resetColorScheme = () => {
    this.props.setColorScheme(30, 136, 229);
  };
  render() {
    return (
      <Content style={{ userSelect: 'none' }}>
        <Card>
          <CardHeader>Pick a new color</CardHeader>
          <CardText>
            Red
            <Slider
              value={this.props.colorScheme.red}
              discrete
              min={50}
              max={255}
              step={5}
              // onChange={this.applyColorScheme}
              onInput={red => {
                this.props.setColorScheme(
                  red,
                  this.props.colorScheme.green,
                  this.props.colorScheme.blue,
                );
              }}
            />Green
            <Slider
              value={this.props.colorScheme.green}
              discrete
              min={50}
              max={255}
              step={5}
              // onChange={this.applyColorScheme}
              onInput={green => {
                this.props.setColorScheme(
                  this.props.colorScheme.red,
                  green,
                  this.props.colorScheme.blue,
                );
              }}
            />Blue
            <Slider
              value={this.props.colorScheme.blue}
              discrete
              min={50}
              max={255}
              step={5}
              // onChange={this.applyColorScheme}
              onInput={blue => {
                this.props.setColorScheme(
                  this.props.colorScheme.red,
                  this.props.colorScheme.green,
                  blue,
                );
              }}
            />
          </CardText>
          <CardActions>
            <Button
              onClick={() => {
                this.props.setColorScheme(
                  this.props.colorScheme.red,
                  this.props.colorScheme.green,
                  this.props.colorScheme.blue,
                );
                this.props.fireSaveColorScheme(
                  this.props.colorScheme,
                  this.props.firebase,
                );
              }}
            >
              Save
            </Button>
            <Button onClick={this.resetColorScheme} raised>
              Reset
            </Button>
          </CardActions>
        </Card>
      </Content>
    );
  }
}
