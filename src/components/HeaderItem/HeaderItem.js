import React, { Component } from 'react';
import style from 'styled-components';


const HeaderItemEle = style.div `
  padding: .5rem;
  font-size: 2rem;
  &:hover {
    cursor: pointer;
  }

  > span {
    text-align: center;
  }
`

class HeaderItem extends Component {
  constructor(props){
    super(props)
    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
    this.isImageItem = this.isImageItem.bind(this)
    this.state = {CSSClass: '--mdc-theme-primarytest'}
  }


  onMouseEnter(){
    this.setState({CSSClass: '--mdc-theme-primary-darktest'})
  }

  onMouseLeave(){
    this.setState({CSSClass: '--mdc-theme-primarytest'})
  }

  isImageItem() {
    if(this.props.image)
    {
      return (<img src={this.props.image} alt=""/>)
    }
  }

  render() {
    return(
      <HeaderItemEle className={this.state.CSSClass} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onClick={this.props.onClick}>
        {this.isImageItem()}
        <span>{this.props.label}</span>
      </HeaderItemEle>
    )
  }
}

export default HeaderItem;
