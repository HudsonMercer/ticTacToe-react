import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
        Button,
        Card,
        CardActions,
        CardHeader,
        CardMedia,
        CardText,
        CardTitle,
        Content,
        } from 'react-mdc-web';

class AvatarCard extends Component{

  render(){
    return(
      <Content>
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

const mapStateToProps = (store) => {
  return{
  avatarImg: store.avatarImg
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(AvatarCard)
