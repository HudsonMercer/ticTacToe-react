import React, {Component} from 'react'
import {connect} from 'react-redux'
import store from '../../../store'
import {firebaseConnect, dataToJS} from 'react-redux-firebase'
import {fireSendData} from '../../../actions/firebaseActions'

@firebaseConnect(() => ([{
    path: `lobby/games/${store.getState().userState.gameUid}/`,
    storeAs: 'GameBoardBar_GAMESTATE',
  },
  {
    path: `lobby/games/${store.getState().userState.gameUid}/victory`,
    storeAs: 'GameBoardBar_VICTORY',
  },
  {
    path: `lobby/games/${store.getState().userState.gameUid}/position`,
    storeAs: 'GameBoardBar_VICTORY_POSITION',
  }])
)

@connect(store => (
  {
    gameWin: dataToJS(store.firebase, 'GameBoardBar_VICTORY'),
    gameWinPosition: dataToJS(store.firebase, 'GameBoardBar_VICTORY_POSITION'),
    boardState: dataToJS(store.firebase, 'GameBoardBar_GAMESTATE'),
    gameUid: store.userState.gameUid,
    windowResize: store.windowResize,
  }
),
{
fireSendData
})

export default class GameBoardBar extends Component {

  componentDidMount(){
    this.windowChangeHandler()
  }

  componentDidUpdate(){
    this.windowChangeHandler()
  }

  windowChangeHandler = () => {
    let containerRect = document.getElementsByClassName('gameBoardContainer')[0].getBoundingClientRect(),
    y = 0, x = 0, rotation = 0, cellHeight = (containerRect.height - 56)/3, cellWidth = (containerRect.width - 56)/3

    console.log(cellHeight)
    switch(this.props.gameWinPosition){
      case 'topDiag':
          y = containerRect.bottom - containerRect.top,
          x = containerRect.right - containerRect.left,
          rotation = Math.atan2(y, x)
        document.documentElement.style.setProperty('--win-bar-rotation', rotation + 'rad')
        document.documentElement.style.setProperty('--win-bar-top', containerRect.top + ((containerRect.height/2) - 20) + 'px')
        document.documentElement.style.setProperty('--win-bar-left', '10%')
        document.documentElement.style.setProperty('--win-bar-width', window.innerWidth * 0.8 + 'px')
      break

      case 'bottomDiag':
          y = containerRect.top - containerRect.bottom,
          x = containerRect.right - containerRect.left,
          rotation = Math.atan2(y, x)
        document.documentElement.style.setProperty('--win-bar-rotation', rotation + 'rad')
        document.documentElement.style.setProperty('--win-bar-top', containerRect.top + ((containerRect.height/2) - 20) + 'px')
        document.documentElement.style.setProperty('--win-bar-left', '10%')
        document.documentElement.style.setProperty('--win-bar-width', window.innerWidth * 0.8 + 'px')
      break
      case 'rowTop':
        document.documentElement.style.setProperty('--win-bar-rotation', 0 + 'rad')
        document.documentElement.style.setProperty('--win-bar-top', containerRect.top + (cellHeight/2 + 12 - 20)+ 'px')
        document.documentElement.style.setProperty('--win-bar-left', '10%')
        document.documentElement.style.setProperty('--win-bar-width', window.innerWidth * 0.8 + 'px')
      break
      case 'rowMiddle':

        document.documentElement.style.setProperty('--win-bar-rotation', 0 + 'rad')
        document.documentElement.style.setProperty('--win-bar-top', containerRect.top + ((cellHeight * 2 + 20 - 20) - (cellHeight/2)) + 'px')
        document.documentElement.style.setProperty('--win-bar-left', '10%')
        document.documentElement.style.setProperty('--win-bar-width', window.innerWidth * 0.8 + 'px')
      break
      case 'rowBottom':

        document.documentElement.style.setProperty('--win-bar-rotation', 0 + 'rad')
        document.documentElement.style.setProperty('--win-bar-top', containerRect.top + ((cellHeight * 3 + 28 - 20) - (cellHeight/2)) + 'px')
        document.documentElement.style.setProperty('--win-bar-left', '10%')
        document.documentElement.style.setProperty('--win-bar-width', window.innerWidth * 0.8 + 'px')
      break
      case 'columnLeft':
        document.documentElement.style.setProperty('--win-bar-rotation', 90 + 'deg')
        document.documentElement.style.setProperty('--win-bar-top', containerRect.top + ((cellHeight * 2 + 20 - 20) - (cellHeight/2)) + 'px')
        document.documentElement.style.setProperty('--win-bar-left', containerRect.left + cellWidth * 0 + 20 + (cellWidth / 2) - (containerRect.height * .8 / 2) + 'px')
        document.documentElement.style.setProperty('--win-bar-width', containerRect.height * 0.8 + 'px')
      break
      case 'columnMiddle':
        document.documentElement.style.setProperty('--win-bar-rotation', 90 + 'deg')
        document.documentElement.style.setProperty('--win-bar-top', containerRect.top + ((containerRect.height/2) - 28) + 'px')
        document.documentElement.style.setProperty('--win-bar-left', containerRect.left + cellWidth * 1 + 28 + (cellWidth / 2) - (containerRect.height * .8 / 2) + 'px')
        document.documentElement.style.setProperty('--win-bar-width', containerRect.height * 0.8 + 'px')
      break
      case 'columnRight':
        document.documentElement.style.setProperty('--win-bar-rotation', 90 + 'deg')
        document.documentElement.style.setProperty('--win-bar-top', containerRect.top + ((containerRect.height/2) - 28) + 'px')
        document.documentElement.style.setProperty('--win-bar-left', containerRect.left + cellWidth * 2 + 36 + (cellWidth / 2) - (containerRect.height * .8 / 2) + 'px')
        document.documentElement.style.setProperty('--win-bar-width', containerRect.height * 0.8 + 'px')
      break
      default:
      document.getElementsByClassName('gameBoardBarAngled')[0].innerText = 'it broked'
      break
    }
  }

  render(){
    if(this.props.gameWin === true){
      this.props.fireSendData(this.props.firebase, `/lobby/games/${this.props.gameUid}`, {playerTurn: 'disabled'})
      return(
        <div className="gameBoardBarContainer">
          <div className="gameBoardBarAngled">Winners never give up</div>
        </div>
      )
    } else {
      return null
    }

  }
}
