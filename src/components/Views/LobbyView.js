import React, {Component} from 'react'
import {connect} from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty, dataToJS, pathToJS, populatedDataToJS } from 'react-redux-firebase'
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


@firebaseConnect([
  {
    path: '/lobby/chat/messages',
    storeAs: 'MESSAGES',
  }
])
@connect((store) => ({
  isOpen: store.lobbyState.isOpen,
  userName: store.userState.userName,
  uid: store.userState.uid,
  chatMessages: dataToJS(store.firebase, 'MESSAGES'),
}),
  {
    lobbyChatSendMessage
  })

export default class LobbyView extends Component {

  getChatMessages = ()=>{
    const element = this.props.chatMessages

     let arr = [], msgElement = [], d = []
     //convert object to array of objects one level deep, firebase key is saved as messageKey
     for (const prop in element){
       if(element.hasOwnProperty(prop)){
         arr.push({messageKey:prop, ...element[prop]})
       }
     }

     arr.sort((firstItem, secondItem) => {
       return (firstItem.date - secondItem.date)
     })

     if (arr.length !== 0){
       arr.forEach((key, index) => {
         d.push(<ListItem key={key.messageKey}>
           <ListItemText>
             {key.userName}:
             <ListItemTextSecondary>
               {key.message}

             </ListItemTextSecondary>
           </ListItemText>
         </ListItem>)
       })
   }

     return d
  }
  scrollChatField = () => {
    let chatTextField = document.getElementById('lobbyChatList')
    if (chatTextField !== null){
      chatTextField.scrollTop = chatTextField.scrollHeight
    }
  }

  componentDidUpdate(){
    this.scrollChatField()
  }
  componentDidMount(){
    this.scrollChatField()
  }

  render(){
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
            <List id="lobbyGamesList" style={{overflowY: 'scroll', maxHeight: '28vh'}}>
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
            <List
              id="lobbyChatList"
              style={{overflowY: 'scroll', maxHeight: '28vh'}}
            >
              {this.getChatMessages()}
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
                  onKeyUp={(e) => {
                    // console.log(typeof(e.keyCode))

                    if (e.keyCode === 13 && e.target.value[0] !== '\n' && e.target.value[0] !== ' '){
                      document.getElementById('chatSendButton').click()
                    } else if (e.target.value[0] === '\n' || e.target.value[0] === ' ' ) {
                      e.target.value = ''
                    }
                  }}
                />
              </Cell>
              <Cell col={8}>
                <Button
                  id="chatSendButton"

                  onClick={() => {
                    let e = document.getElementById('chatInputField')
                    this.props.lobbyChatSendMessage(
                      this.props.uid,
                      this.props.userName,
                      e.value,
                      this.props.firebase
                    )
                    e.value = ''
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
