import React, {Component} from 'react'
import {connect} from 'react-redux'
import {firebaseConnect, dataToJS} from 'react-redux-firebase'
import {lobbyChatSendMessage} from '../../actions/uiActions'
import {
        Button,
        CardActions,
        CardText,
        Icon,
        List,
        ListItem,
        ListItemText,
        ListItemTextSecondary,
        Grid,
        Cell,
        Textfield
        } from 'react-mdc-web'

@firebaseConnect([{
  path: '/lobby/chat/messages',
  storeAs: 'MESSAGES',
}])

@connect(store => ({
  chatMessages: dataToJS(store.firebase, 'MESSAGES'),
  userName: store.userState.userName,
  uid: store.userState.uid,
}), {
  lobbyChatSendMessage,
})

export default class LobbyChatCard extends Component{

chatScrollToBottom = () => {
  let chatTextField = document.getElementById('lobbyChatList')
  if (chatTextField !== null){
    chatTextField.scrollTop = chatTextField.scrollHeight
  }
}

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

chatInputHandler = (e) => {
  if (e.keyCode === 13 && e.target.value[0] !== '\n' && e.target.value[0] !== ' '){
    document.getElementById('chatSendButton').click()
  } else if (e.target.value[0] === '\n' || e.target.value[0] === ' ' ) {
    e.target.value = ''
  }
}

chatSendHandler = () => {
  let e = document.getElementById('chatInputField')
  this.props.lobbyChatSendMessage(
    this.props.uid,
    this.props.userName,
    e.value,
    this.props.firebase
  )
  e.value = ''
}

componentDidUpdate(){
  this.chatScrollToBottom()
}

componentDidMount(){
  this.chatScrollToBottom()
}

render(){
  return(
    <div>
      <CardText id="lobbyChatCardText">
        <List
          id="lobbyChatList"
          style={{ maxHeight: '53vh', overflowY: 'scroll'}}
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
              onKeyUp={this.chatInputHandler}
            />
          </Cell>
          <Cell col={8}>
            <Button
              id="chatSendButton"
              onClick={this.chatSendHandler}
              style={{ marginTop: '2%'}}
            >Send</Button>
          </Cell>
        </Grid>
      </CardActions>
    </div>
  )
}
}
