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
      <Content>
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

        <Card>
          <CardHeader>
            <CardTitle>

              Some other settings options

            </CardTitle>
            <CardSubtitle>
              Give me your money
            </CardSubtitle>
          </CardHeader>
          <CardText id="firebaseAuthContainer">
            <Textfield
              floatingLabel="CC#"
              helptext="Must be 16 digits"
            >
            </Textfield>
            <Textfield
              floatingLabel="Secure Code"
              helptext="4 or 3 digit code on back of card"
            >
            </Textfield>
            <Textfield
              floatingLabel="Exp Date"
              helptext="MM/DD/YY"
            >
            </Textfield>
            <CardActions>
              <Button dense>End</Button>
              <Button raised dense>EOF FILE NOT FOUND IN DIRECTORY</Button>
            </CardActions>
          </CardText>
        </Card>
      </Content>
    )
  }
}
