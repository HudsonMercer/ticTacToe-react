import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
        Card,
        CardFooter,
        CardText,
        CardTitle,
        CardHeader,
        Icon,
        List,
        ListItem,
        ListItemText,
        ListItemTextSecondary,
        ListDivider,
        ListGroup,
        Toolbar,
        ToolbarRow,
        ToolbarSection,
        ToolbarTitle
        } from 'react-mdc-web'

class LobbyView extends Component {

 createLobbyItem = (name, host, key) => {
  let returnElement =
  <ListItem key={key}>
    <ListItemText>
      {name}:
      <ListItemTextSecondary>
        {host}
      </ListItemTextSecondary>
    </ListItemText>
  </ListItem>
  return returnElement
  }

  pushGameTest = (e) => {this.props.pushLobbyGame(e)}

  render(){
    let element = [this.createLobbyItem('James', 'Hello world', 'ww3')]
    element.push(this.createLobbyItem('John', 'Test', 'ww2'))
    element.push(this.createLobbyItem('Deb', 'Test2', 'ww4'))

    if(this.props.isOpen){
    return(
      <Card>
        <Toolbar>
          <ToolbarRow>
            <ToolbarSection>
              <ToolbarTitle>
                Lobby
              </ToolbarTitle>
            </ToolbarSection>
          </ToolbarRow>
        </Toolbar>
        <CardText>
          <List>
            <ListItem>
              <ListItemText>Alberto
                <ListItemTextSecondary>Hey whats up guys
                </ListItemTextSecondary>
              </ListItemText>
            </ListItem>
            <ListItem><ListItemTextSecondary>Hey whats up goys</ListItemTextSecondary></ListItem>
            <ListDivider></ListDivider>
            <ListItem>PH-Item 3</ListItem>
            <ListItem>PH-Item 4</ListItem>
            <ListItem>PH-Item 5</ListItem>
            <ListDivider></ListDivider>
            <ListItem>PH-Item 6</ListItem>
            {element}
          </List>
        </CardText>

      </Card>
    )} else {
      return null
    }
  }
}

const mapStateToProps = (store) => {
  return {
    isOpen: store.lobbyState.isOpen
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LobbyView)
