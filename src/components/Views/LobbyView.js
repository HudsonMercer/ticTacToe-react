import React, {Component} from 'react'
import {connect} from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty, dataToJS, pathToJS, populatedDataToJS } from 'react-redux-firebase'
import {lobbyChatSendMessage, toggleLobbyActiveItem} from '../../actions/uiActions'
import {fireHostGame} from '../../actions/firebaseActions'
import LobbyGameItem from './LobbyItems/LobbyGameItem'
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
  },
  {
    path: '/lobby/games',
    storeAs: 'GAMESLIST',
  }
])
@connect((store) => ({
  isOpen: store.lobbyState.isOpen,
  userName: store.userState.userName,
  uid: store.userState.uid,
  chatMessages: dataToJS(store.firebase, 'MESSAGES'),
  gamesList: dataToJS(store.firebase, 'GAMESLIST'),
  activeItem: store.lobbyState.activeItem,
}),
  {
    lobbyChatSendMessage,
    toggleLobbyActiveItem,
    fireHostGame,
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

  getGamesList = () => {
    let list = this.props.gamesList
    let elements = []
    let returnList = []

    for (let game in list){
      elements.push(
        <LobbyGameItem
          hostName={list[game].host}
          gameStatus={list[game].status}
        />
      )
    }

    elements.forEach((curVal) => {
      returnList.push(curVal)
      returnList.push(<ListDivider/>)
    })
    return (
      <div>
        {returnList}
      </div>
    )
  }


  componentDidUpdate(){
    this.scrollChatField()
  }

  componentDidMount(){
    this.scrollChatField()
  }

  render(){
    let gamesView = null, chatView = null

    if(this.props.activeItem === 'games') {gamesView = (
      <div>
        <CardText>
          <List id="lobbyGamesList" style={{overflowY: 'visible', maxHeight: '55vh'}}>
            {this.getGamesList()}
          </List>
        </CardText>
        <CardActions>
          <Button
            raised
            onClick={() => {
              this.props.fireHostGame(this.props.firebase)
            }}
          >Host Game</Button>
        </CardActions>
      </div>)}else{gamesView = null}

    if(this.props.activeItem === 'chat'){chatView = (
      <div>
        <CardText id="lobbyChatCardText">
          <List
            id="lobbyChatList"
            style={{overflowY: 'scroll', maxHeight: '55vh'}}
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
      </div>
  )}else{chatView = null}

    if(this.props.isOpen){
    return(
      <div style={{height: '92.5vh'}}>
        <Card>
          <Toolbar
            onClick={this.props.toggleLobbyActiveItem}
          >
            <ToolbarRow>
              <ToolbarSection>
                <ToolbarTitle>
                  Games
                </ToolbarTitle>
              </ToolbarSection>
            </ToolbarRow>{}
          </Toolbar>
          {gamesView}
        </Card>

        <Card>
          <Toolbar
            onClick={this.props.toggleLobbyActiveItem}>
            <ToolbarRow>
              <ToolbarSection>
                <ToolbarTitle>
                  Chat
                </ToolbarTitle>
              </ToolbarSection>
            </ToolbarRow>
          </Toolbar>
          {chatView}
        </Card>
      </div>
    )} else {
      return null
    }
  }
}
