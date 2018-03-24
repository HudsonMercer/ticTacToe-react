import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { avatarFileLoad, avatarFileUse } from '../../actions/uiActions';
import { fireSendData, fireSendFile } from '../../actions/firebaseActions';
import {
  Button,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardText,
  CardTitle,
  Content,
  Icon,
} from 'react-mdc-web';

@firebaseConnect()
@connect(
  store => ({
    avatarImg: store.avatarImg,
    avatarFileBlob: store.avatarData.selectedFile,
    avatarUploadFile: store.avatarData.uploadFile,
    userName: store.userState.name,
    uid: store.userState.uid,
  }),
  {
    fireSendData,
    fireSendFile,
    avatarFileLoad,
    avatarFileUse,
  },
)
export default class AvatarCard extends Component {
  resolveAvatar = () => {
    if (this.props.avatarFileBlob !== undefined) {
      return this.props.avatarFileBlob;
    } else {
      return this.props.avatarImg;
    }
  };

  onClickFileSelect = () => {
    document.getElementById('avatarFileSelect').click();
  };

  render() {
    return (
      <Content>
        <Card>
          <CardHeader>
            <CardTitle>Avatar Settings</CardTitle>
          </CardHeader>
          <CardMedia
            style={{
              backgroundImage: 'url(' + this.resolveAvatar() + ')',
              height: '300px',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }}
          />
          <CardText>
            Images will be resized. Small or large images may be skewed
            awkwardly.
          </CardText>
          <CardActions>
            <Button onClick={this.onClickFileSelect}>
              <Icon
                name="file_upload"
                style={{ position: 'relative', top: '7px', left: '-7px' }}
              />
              Select File
              <input
                id="avatarFileSelect"
                type="file"
                name="avatarFile"
                accept=".jpg, .png, .bmp, .svg"
                style={{ display: 'none' }}
                onChange={e => {
                  this.props.avatarFileLoad(e.target.files[0]);
                }}
              />
            </Button>
            <Button
              onClick={() => {
                this.props.avatarFileUse(this.props.avatarFileBlob);
                this.props.fireSendFile(
                  this.props.firebase,
                  this.props.uid,
                  this.props.avatarUploadFile,
                );
              }}
            >
              Update Avatar
            </Button>
            <Button raised>Cancel</Button>
          </CardActions>
        </Card>
      </Content>
    );
  }
}
