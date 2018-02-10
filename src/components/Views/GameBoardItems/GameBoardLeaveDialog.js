import React, {Component} from 'react'
import {connect} from 'react-redux'
import {uiGameBoardResetLeaverTimer, uiGameBoardDecrementTimer} from '../../../actions/uiActions'
import {
        Button,
        Dialog,
        DialogHeader,
        DialogTitle,
        DialogBody
        } from 'react-mdc-web'

@connect((store) => ({
  isOpen: store.gameBoardState.userLeftDialogIsOpen,
  timeLeft: store.gameBoardState.timeLeft,
}),
{
  uiGameBoardResetLeaverTimer,
  uiGameBoardDecrementTimer,
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
    let a = 1
    if(this.props.isOpen === true && this.state.fireTimer === true && a === 1){
      a = 2
      this.setState({
        fireTimer: false
      })
      setTimeout(this.props.uiGameBoardDecrementTimer, 1000)
      setTimeout(this.props.uiGameBoardDecrementTimer, 2000)
      setTimeout(this.props.uiGameBoardDecrementTimer, 3000)
      setTimeout(this.props.uiGameBoardDecrementTimer, 4000)
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
