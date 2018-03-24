import React, { Component } from 'react';
import style from 'styled-components';
import { Icon } from 'react-mdc-web';

import { connect } from 'react-redux';
import { toggleQuickNavigation } from '../../actions/uiActions';

const Container = style.div`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  text-align: center;
  vertical-align: middle;
  &:hover {
    cursor: pointer;
  }
`;

class HeaderQuickNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: 'var(--mdc-theme-primary)',
    };
  }

  mouseEnter = () => {
    this.setState({ backgroundColor: 'var(--mdc-theme-primary-dark)' });
  };

  mouseLeave = () => {
    this.setState({ backgroundColor: 'var(--mdc-theme-primary)' });
  };

  render() {
    return (
      <Container
        style={this.state}
        onClick={this.props.onClick}
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
      >
        <Icon
          style={{ fontSize: '24px', paddingTop: '25%', position: 'relative' }}
          name="menu"
        />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    onClick: () => {
      dispatch(toggleQuickNavigation());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  HeaderQuickNavigation,
);
