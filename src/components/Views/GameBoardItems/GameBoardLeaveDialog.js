import React, {Component} from 'react'
import {connect} from 'react-redux'
import {firebaseConnect} from 'react-redux-firebase'
import {uiGameBoardResetLeaverTimer, uiGameBoardDecrementTimer, uiLeaveGame} from '../../../actions/uiActions'
import {fireDeleteGame} from '../../../actions/firebaseActions'
import {
        Button,
        Dialog,
        DialogHeader,
        DialogTitle,
        DialogBody
        } from 'react-mdc-web'

@firebaseConnect()

@connect((store) => ({
  isOpen: store.gameBoardState.userLeftDialogIsOpen,
  timeLeft: store.gameBoardState.timeLeft,
  gameUid: store.userState.gameUid,
}),
{
  uiGameBoardResetLeaverTimer,
  uiGameBoardDecrementTimer,
  uiLeaveGame,
  fireDeleteGame,
}
)

export default class GameBoardLeaveDialog extends Component {
  constructor(){
    super()
    this.state = {
      fireTimer: true
    }
  }

  resetTimer = () => {
    this.setState({
      fireTimer: true
    })
  }

  startCountDown = () => {
    if(this.props.isOpen === true && this.state.fireTimer === true){
      this.setState({
        fireTimer: false
      })
      console.log('leave game countdown fired')
      setTimeout(this.props.uiGameBoardDecrementTimer, 1000)
      setTimeout(this.props.uiGameBoardDecrementTimer, 2000)
      setTimeout(this.props.uiGameBoardDecrementTimer, 3000)
      setTimeout(() => {
        this.props.uiGameBoardDecrementTimer()
        this.props.uiLeaveGame()
        this.props.fireDeleteGame(this.props.firebase, this.props.gameUid)
      }, 4000)
    }
  }

  render(){
    this.startCountDown()
    return(
      <Dialog open={this.props.isOpen}>
        <DialogBody>
          Opponent left game, leaving {this.props.timeLeft === 0 ? 'now':`in ${this.props.timeLeft} seconds`}...
        </DialogBody>
      </Dialog>
    )
  }
}
