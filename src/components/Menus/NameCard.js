import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setUserName} from '../../actions/uiActions'
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

class NameCard extends Component {
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
              onChange={(name) => this.props.setUserName(name.target.value)}
            >
            </Textfield>
            <CardActions>
              <Button dense>Change Name</Button>
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

const mapStateToProps = (store) => {
  return {
    userName: store.userName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUserName: (name) => {
      dispatch(setUserName(name))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NameCard)
