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
    }
  ])
)

@connect((store) => ({
  isOpen: dataToJS(store.firebase, 'GAMEBOARD_WIN_DIALOG_IS_OPEN'),
  gameUid: store.userState.gameUid,
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

  render(){
    return(
      <Dialog open={this.props.isOpen}>
        <DialogHeader>
          <DialogTitle>
            Somebody won
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          S wins! or ties, or whatever.....
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
