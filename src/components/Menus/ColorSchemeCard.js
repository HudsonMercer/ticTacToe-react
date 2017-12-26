import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setColorScheme} from '../../actions/uiActions'
import {
        Button,
        Card,
        CardActions,
        CardHeader,
        CardText,
        Content,
        Slider,
        } from 'react-mdc-web';

class ColorSchemeCard extends Component{

  resetColorScheme = () => {
    this.props.setColorScheme(30, 136, 229)
  }
  render(){

    return(
      <Content style={{userSelect: 'none'}}>
        <Card>
          <CardHeader>
            Pick a new color
          </CardHeader>
          <CardText>
            Red
            <Slider
              value={this.props.colorScheme.red}
              discrete
              min={50}
              max={255}
              step={5}
              // onChange={this.applyColorScheme}
              onInput={(t)=>{
                this.props.setColorScheme(t,this.props.colorScheme.green, this.props.colorScheme.blue)
              }}
            />Green
            <Slider
              value={this.props.colorScheme.green}
              discrete
              min={50}
              max={255}
              step={5}
              // onChange={this.applyColorScheme}
              onInput={(t)=>{
                this.props.setColorScheme(this.props.colorScheme.red,t, this.props.colorScheme.blue)
              }}
            />Blue
            <Slider
              value={this.props.colorScheme.blue}
              discrete
              min={50}
              max={255}
              step={5}
              // onChange={this.applyColorScheme}
              onInput={(t)=>{
                this.props.setColorScheme(this.props.colorScheme.red,this.props.colorScheme.green, t)
              }}
            />
          </CardText>
          <CardActions>
            <Button onClick={ () => {
              this.props.setColorScheme(this.props.colorScheme.red, this.props.colorScheme.green, this.props.colorScheme.blue)
            }}>Save</Button>
            <Button onClick={this.resetColorScheme}raised>Reset</Button>
          </CardActions>
        </Card>
      </Content>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    colorScheme: store.colorScheme
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setColorScheme: (r, g, b) => {
      dispatch(setColorScheme(r, g, b))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorSchemeCard)
