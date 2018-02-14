import React, {Component} from 'react'
import {connect} from 'react-redux'
import store from '../../../store'
import {firebaseConnect, dataToJS} from 'react-redux-firebase'
import {fireResetGameBoard} from '../../../actions/firebaseActions'
import {
        Button,
        Dialog,
        DialogHeader,
        DialogTitle,
        DialogBody,
        DialogFooter
        } from 'react-mdc-web'

@firebaseConnect(() => ([
    {
      path: `/lobby/games/${store.getState().userState.gameUid}/winDialogIsOpen`,
      storeAs: 'GAMEBOARD_WIN_DIALOG_IS_OPEN'
    },
    {
      path: `/lobby/games/${store.getState().userState.gameUid}/winner`,
      storeAs: 'GAMEBOARD_WIN_DIALOG_WINNER'
    }
  ])
)

@connect((store) => ({
  isOpen: dataToJS(store.firebase, 'GAMEBOARD_WIN_DIALOG_IS_OPEN'),
  gameUid: store.userState.gameUid,
  winner: dataToJS(store.firebase, 'GAMEBOARD_WIN_DIALOG_WINNER'),
}),
{
  fireResetGameBoard,
}
)

export default class GameBoardWinDialog extends Component {

  resetHandler = () => {
    try{
      this.props.fireResetGameBoard(this.props.firebase, this.props.gameUid)
    } catch(err){
      console.log(err);
    }
  }

  getWinner(){
    switch(this.props.winner){
      case 'x':
      return 'X wins!'
      case 'o':
      return 'O wins!'
      case 'tie':
      return 'Game was a tie'
      default:
      return 'ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR'
    }
  }

  render(){
    return(
      <Dialog open={this.props.isOpen}>
        <DialogHeader>
          <DialogTitle>
          </DialogTitle>
        </DialogHeader>
        <DialogBody style={{textAlign: 'center'}}>
          {this.getWinner()}
        </DialogBody>
        <DialogFooter>
          <Button
            dense
            raised
            onClick={this.resetHandler}
          >Reset</Button>
        </DialogFooter>
      </Dialog>
    )
  }
}
