import React, {Component} from 'react'
import {connect} from 'react-redux'
import {avatarFileLoad, avatarFileUse} from '../../actions/uiActions'
import {fireSendData, fireSendFile} from '../../actions/firebaseActions'
import firebase from '../../firebaseInit'
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

    const resolveAvatar = () => {
      if(this.props.avatarFileBlob !== undefined){
        return this.props.avatarFileBlob
      } else {
        return this.props.avatarImg
      }
    }

    const onClickFileSelect = (e) => {
      let target = document.getElementById('avatarFileSelect')
      target.click()
    }

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
              backgroundImage: "url(" + resolveAvatar() + ")",
              height: '300px',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center'
            }}
          />
          <CardText>
            Images will be resized. Small or large images may be skewed awkwardly.
          </CardText>
          <CardActions>
            <Button
              dense
              onClick={onClickFileSelect}>
              Select File
              <input
                id="avatarFileSelect"
                type="file"
                name="avatarFile"
                accept=".jpg, .png, .bmp, .svg"
                style={{display: "none"}}
                onChange={(e) => {
                  this.props.avatarFileLoad(e.target.files[0])
                }}
              />
            </Button>
            <Button
              onClick={() => {
                this.props.avatarFileUse(this.props.avatarFileBlob)
                this.props.fireSendFile(`${this.props.user.UUID}/${this.props.user.name}Avatar`, this.props.avatarUploadFile)
              }}
            >
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
    avatarImg: store.avatarImg,
    avatarFileBlob: store.avatarData.selectedFile,
    avatarUploadFile: store.avatarData.uploadFile,
    user: {
      name: store.userName,
      UUID: store.UUID
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fireSendData: (dest, data) => {
      dispatch(fireSendData(dest, data))
    },
    fireSendFile: (dest, file, name) => {
      dispatch(fireSendFile(dest, file, name))
    },
    avatarFileLoad: (file) => {
      dispatch(avatarFileLoad(file))
    },
    avatarFileUse: (file) => {
      dispatch(avatarFileUse(file))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AvatarCard)
