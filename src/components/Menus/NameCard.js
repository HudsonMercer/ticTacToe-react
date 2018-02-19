import React, {Component} from 'react'
import {connect} from 'react-redux'
import {storeUserName} from '../../actions/uiActions'
import { firebaseConnect, isLoaded, isEmpty, dataToJS } from 'react-redux-firebase'
import {
        Button,
        Card,
        CardTitle,
        CardSubtitle,
        CardHeader,
        CardText,
        CardActions,
        Content,
        Textfield
} from 'react-mdc-web';

@firebaseConnect()

@connect( store => ({
    userName: store.userState.userName,
    uid: store.userState.uid,
}),
  {
  storeUserName,
  }
)

export default class NameCard extends Component {
  render(){
    return(
      <div>
        <Card>
          <CardHeader>
            <CardTitle>
              Name Settings
            </CardTitle>
          </CardHeader>
          <CardText>
            <Textfield
              floatingLabel="Current Name"
              helptext="Must be alphanumeric, spaces are okay"
              value={this.props.userName}
              onChange={(name) => this.props.storeUserName(name.target.value)}
            >
            </Textfield>
            <CardActions>
              <Button onClick={() => {
                this.props.firebase.update(`userProfiles/${this.props.uid}`, {displayName: this.props.userName})
              }}
                dense
              >Change Name</Button>
              <Button raised dense>Cancel</Button>
            </CardActions>
          </CardText>
        </Card>
      </div>
    )
  }
}
