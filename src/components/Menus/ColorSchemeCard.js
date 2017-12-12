import React, {Component} from 'react'
import {
        Button,
        Card,
        CardActions,
        CardFooter,
        CardHeader,
        CardMedia,
        CardSubtitle,
        CardText,
        CardTitle,
        Content,
        FormField,
        Slider,
        Title,
        Textfield
        } from 'react-mdc-web';

class ColorSchemeCard extends Component{

  applyColorScheme = () => {
    document.documentElement.style.setProperty(`--mdc-theme-primary`,
      `rgb(
        ${this.props.colorScheme.red},
        ${this.props.colorScheme.green},
        ${this.props.colorScheme.blue}
      )`)
    document.documentElement.style.setProperty(`--mdc-theme-primary-dark`,
      `rgb(
        ${Math.floor(this.props.colorScheme.red/1.5)},
        ${Math.floor(this.props.colorScheme.green/1.5)},
        ${Math.floor(this.props.colorScheme.blue/1.5)}
      )`)


}
  render(){

    return(
      <Content>
        <Card>
          <CardHeader>
            Card Header
          </CardHeader>
          <CardText>
            Red
            <Slider
              value={this.props.colorScheme.red}
              discrete
              min={50}
              max={255}
              step={5}
              onChange={this.applyColorScheme}
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
              onChange={this.applyColorScheme}
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
              onChange={this.applyColorScheme}
              onInput={(t)=>{
                this.props.setColorScheme(this.props.colorScheme.red,this.props.colorScheme.green, t)
              }}
            />
          </CardText>
          <CardActions>
            <Button onClick={this.applyColorScheme}>Apply</Button>
          </CardActions>
        </Card>
      </Content>
    )
  }
}

export default ColorSchemeCard
