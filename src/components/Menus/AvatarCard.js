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

class AvatarCard extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <Content
        className={this.props.settingsState.activeTab === 2 ? '' : 'hidden'}
      >
        <Card>
          <CardHeader>
            <CardTitle>
              Avatar Settings
            </CardTitle>
          </CardHeader>
          <CardMedia
            style={{
              backgroundImage: "url(" + this.props.avatarImg + ")",
              height: '300px',
              backgroundSize: 'contain',
            }}
          />
          <CardText>
            Select an avatar. Images will be resized if over 256px in either axis. Small images may be stretched awkwardly.
          </CardText>
          <CardActions>
            <Button dense>
              Select File
            </Button>
            <Button>
              Update Avatar
            </Button>
            <Button dense raised>Cancel</Button>
          </CardActions>
        </Card>
      </Content>
    )
  }
}

export default AvatarCard
