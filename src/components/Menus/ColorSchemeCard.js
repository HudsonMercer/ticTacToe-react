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
  constructor(props){
    super(props)
    this.state={
      value: 50,
      inputValue: 50
    }
  }

  render(){

    return(
      <Content style={{display: this.props.CSSstate}}>
        <Card>
          <CardHeader>
            Card Header
          </CardHeader>
          <CardText>
            <div>Red</div>
            <FormField
              id="discrete-slider-oftesting"
              style={{
                width: '100%'
              }}>
              <Slider
                value={this.state.value}
                discrete
                min={0}
                max={255}
                step={5}
                onInput={(t)=>{
                  this.setState({value: t})
                }}
              />
              <Slider
                value={this.state.value}
                discrete
                min={0}
                max={255}
                step={5}
                onInput={(t)=>{
                  this.setState({value: t})
                }}
              />
              <Slider
                value={this.state.value}
                discrete
                min={0}
                max={255}
                step={5}
                onInput={(t)=>{
                  this.setState({value: t})
                }}
              />
            </FormField>
          </CardText>
        </Card>
      </Content>
    )
  }
}

export default ColorSchemeCard
