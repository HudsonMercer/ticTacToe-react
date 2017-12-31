import React, {Component} from 'react'
import {connect} from 'react-redux'
import {lobbyChatSendMessage} from '../../actions/uiActions'
import {
        Button,
        Card,
        CardActions,
        CardFooter,
        CardText,
        CardTitle,
        CardHeader,
        Grid,
        Cell,
        Icon,
        List,
        ListItem,
        ListItemText,
        ListItemTextSecondary,
        ListDivider,
        ListGroup,
        Textfield,
        Toolbar,
        ToolbarRow,
        ToolbarSection,
        ToolbarTitle
        } from 'react-mdc-web'

@connect((store) => ({
  isOpen: store.lobbyState.isOpen,
  userName: store.userState.userName,
  uid: store.userState.uid,
}))

export default class LobbyView extends Component {

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
    element.push(<ListDivider/>)
    element.push(this.createLobbyItem('Alex T', 'Why was 6 afraid of 7?', 'ww322'), <ListDivider/>)
    element.push(this.createLobbyItem('Sean C', 'I know why Alex!', 'w2w2'))
    element.push(this.createLobbyItem('Sean C', 'I know I know I know!', 'ww2'), <ListDivider/>)
    element.push(this.createLobbyItem('Alex T', 'Why?', 'w42w2'), <ListDivider/>)
    element.push(this.createLobbyItem('Sean C', 'Because your mother is a whore!', 'ww32f4'), <ListDivider/>)
    element.push(this.createLobbyItem('Alex T', '.............', 'wf3w2'))
    element.push(this.createLobbyItem('Alex T', 'Seriously?', 'wsdfw2'), <ListDivider/>)

    if(this.props.isOpen){
    return(
      <div style={{height: '92.5vh'}}>
        <Card style={{maxHeight: '45vh'}}>
          <Toolbar>
            <ToolbarRow>
              <ToolbarSection>
                <ToolbarTitle>
                  Games
                </ToolbarTitle>
              </ToolbarSection>
            </ToolbarRow>
          </Toolbar>
          <CardText>
            <List style={{overflowY: 'scroll', maxHeight: '28vh'}}>
              <ListItem>
                <Icon name="menu"/>
                <ListItemText>Alberto's Game
                  <ListItemTextSecondary>In Progress...
                  </ListItemTextSecondary>
                </ListItemText>
              </ListItem>
              <ListDivider/>
              <ListItem>
                <Icon name="menu"/>
                <ListItemText>John-Bob's Game
                  <ListItemTextSecondary>Waiting for second player...
                  </ListItemTextSecondary>
                </ListItemText>
              </ListItem>
              <ListDivider/>
              <ListItem>
                <Icon name="menu"/>
                <ListItemText>Rob's Game
                  <ListItemTextSecondary>In Progress...
                  </ListItemTextSecondary>
                </ListItemText>
              </ListItem>
              <ListDivider/>
              <ListItem>
                <Icon name="menu"/>
                <ListItemText>James's Game
                  <ListItemTextSecondary>In Progress...
                  </ListItemTextSecondary>
                </ListItemText>
              </ListItem>
            </List>
          </CardText>
        </Card>

        <Card style={{maxHeight: '45vh'}}>
          <Toolbar>
            <ToolbarRow>
              <ToolbarSection>
                <ToolbarTitle>
                  Chat
                </ToolbarTitle>
              </ToolbarSection>
            </ToolbarRow>
          </Toolbar>
          <CardText>
            <List style={{overflowY: 'scroll', maxHeight: '28vh'}}>
              <ListItem>
                <ListItemText>Alberto
                  <ListItemTextSecondary>Hey whats up guys
                  </ListItemTextSecondary>
                </ListItemText>
              </ListItem>
              <ListItem><ListItemTextSecondary>Hey whats up goys</ListItemTextSecondary></ListItem>
              <ListDivider/>
              <ListItem>PH-Item 3</ListItem>
              <ListItem>PH-Item 4</ListItem>
              <ListItem>PH-Item 5</ListItem>
              <ListItem>PH-Item 5</ListItem>
              <ListItem>PH-Item 5</ListItem>
              <ListItem>PH-Item 5</ListItem>
              <ListItem>PH-Item 5</ListItem>
              <ListItem>PH-Item 5</ListItem>
              <ListItem>PH-Item 5</ListItem>
              <ListItem>PH-Item 5</ListItem>
              <ListDivider/>
              <ListItem>PH-Item 6</ListItem>
              {element}
            </List>
          </CardText>
          <CardActions>
            <Grid style={{width: '100%'}}>
              <Cell col={4}>
                <Textfield
                  style={{resize: 'none'}}
                  textarea
                  rows={1}
                  cols={100}
                  id="chatInputField"
                  floatingLabel={`${this.props.userName}:`}
                  onKeyDown={(e) => {
                    // console.log(typeof(e.keyCode))
                    if (e.keyCode === 13){
                      this.props.lobbyChatSendMessage('4554', 'test', e.target.value, )
                    }

                  }}
                />
              </Cell>
              <Cell col={8}>
                <Button
                  id="chatSendButton"

                  onClick={() => {

                  }}
                  style={{ marginTop: '2%'}}
                >Send</Button>
              </Cell>
            </Grid>
          </CardActions>
        </Card>
      </div>
    )} else {
      return null
    }
  }
}
