import React, {Component} from 'react'
import style from 'styled-components'
import {
        Icon
        } from 'react-mdc-web'

import {connect} from 'react-redux'
import {toggleQuickNavigation} from '../../actions/uiActions'

const Container = style.div`
  width: 8vh;
  height: 8vh;
  border-radius: 50%;
  text-align: center;
  padding-top: auto;
  padding-bottom: auto;
  &:hover {
    cursor: pointer;
  }
`


class HeaderQuickNavigation extends Component {
  constructor(props){
    super(props)
    this.state = {
    backgroundColor: 'var(--mdc-theme-primary)'}
  }

  mouseEnter = () => {
    this.setState({backgroundColor: 'var(--mdc-theme-primary-dark)'})

  }

  mouseLeave = () => {
    this.setState({backgroundColor: 'var(--mdc-theme-primary)'})
  }

  render(){
    return (
      <Container
        style={this.state}
        onClick={this.props.onClick}
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
      >
        <Icon
          style={{fontSize: '4vh', top: '25%', position: 'relative'}} name="menu">
        </Icon>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return state

}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: () => {
      dispatch(toggleQuickNavigation())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderQuickNavigation)
