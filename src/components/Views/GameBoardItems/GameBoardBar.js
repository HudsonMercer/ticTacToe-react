import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../../store';
import { firebaseConnect, dataToJS } from 'react-redux-firebase';

@firebaseConnect(() => [
  {
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
  },
])
@connect(
  store => ({
    gameWin: dataToJS(store.firebase, 'GameBoardBar_VICTORY'),
    gameWinPosition: dataToJS(store.firebase, 'GameBoardBar_VICTORY_POSITION'),
    boardState: dataToJS(store.firebase, 'GameBoardBar_GAMESTATE'),
    gameUid: store.userState.gameUid,
    windowResize: store.windowResize,
  }),
  {},
)
export default class GameBoardBar extends Component {
  componentDidMount() {
    this.windowChangeHandler();
  }

  componentDidUpdate() {
    this.windowChangeHandler();
  }

  windowChangeHandler = () => {
    let containerRect = document
        .getElementsByClassName('gameBoardContainer')[0]
        .getBoundingClientRect(),
      y = 0,
      x = 0,
      rotation = 0,
      cellHeight = (containerRect.height - 56) / 3,
      cellWidth = (containerRect.width - 56) / 3;

    switch (this.props.gameWinPosition) {
      case 'topDiag':
        y = containerRect.bottom - 24 - (containerRect.top - 8);
        x = containerRect.right - 16 - (containerRect.left - 16);
        rotation = Math.atan2(y, x);
        document.documentElement.style.setProperty(
          '--win-bar-rotation',
          rotation + 'rad',
        );
        document.documentElement.style.setProperty(
          '--win-bar-top',
          containerRect.top + containerRect.height / 2 - 32 + 'px',
        );
        document.documentElement.style.setProperty('--win-bar-left', '0%');
        document.documentElement.style.setProperty(
          '--win-bar-width',
          window.innerWidth + 'px',
        );
        break;

      case 'bottomDiag':
        y = containerRect.top - 8 - (containerRect.bottom - 24);
        x = containerRect.right - 16 - (containerRect.left - 16);
        rotation = Math.atan2(y, x);
        document.documentElement.style.setProperty(
          '--win-bar-rotation',
          rotation + 'rad',
        );
        document.documentElement.style.setProperty(
          '--win-bar-top',
          containerRect.top + containerRect.height / 2 - 32 + 'px',
        );
        document.documentElement.style.setProperty('--win-bar-left', '0%');
        document.documentElement.style.setProperty(
          '--win-bar-width',
          window.innerWidth + 'px',
        );
        break;
      case 'rowTop':
        document.documentElement.style.setProperty(
          '--win-bar-rotation',
          0 + 'rad',
        );
        document.documentElement.style.setProperty(
          '--win-bar-top',
          containerRect.top + (cellHeight / 2 + 12 - 20) + 'px',
        );
        document.documentElement.style.setProperty('--win-bar-left', '10%');
        document.documentElement.style.setProperty(
          '--win-bar-width',
          window.innerWidth * 0.8 + 'px',
        );
        break;
      case 'rowMiddle':
        document.documentElement.style.setProperty(
          '--win-bar-rotation',
          0 + 'rad',
        );
        document.documentElement.style.setProperty(
          '--win-bar-top',
          containerRect.top +
            (cellHeight * 2 + 20 - 20 - cellHeight / 2) +
            'px',
        );
        document.documentElement.style.setProperty('--win-bar-left', '10%');
        document.documentElement.style.setProperty(
          '--win-bar-width',
          window.innerWidth * 0.8 + 'px',
        );
        break;
      case 'rowBottom':
        document.documentElement.style.setProperty(
          '--win-bar-rotation',
          0 + 'rad',
        );
        document.documentElement.style.setProperty(
          '--win-bar-top',
          containerRect.top +
            (cellHeight * 3 + 28 - 20 - cellHeight / 2) +
            'px',
        );
        document.documentElement.style.setProperty('--win-bar-left', '10%');
        document.documentElement.style.setProperty(
          '--win-bar-width',
          window.innerWidth * 0.8 + 'px',
        );
        break;
      case 'columnLeft':
        document.documentElement.style.setProperty(
          '--win-bar-rotation',
          90 + 'deg',
        );
        document.documentElement.style.setProperty(
          '--win-bar-top',
          containerRect.top +
            (cellHeight * 2 + 20 - 20 - cellHeight / 2) +
            'px',
        );
        document.documentElement.style.setProperty(
          '--win-bar-left',
          containerRect.left +
            cellWidth * 0 +
            20 +
            cellWidth / 2 -
            containerRect.height * 0.8 / 2 +
            'px',
        );
        document.documentElement.style.setProperty(
          '--win-bar-width',
          containerRect.height * 0.8 + 'px',
        );
        break;
      case 'columnMiddle':
        document.documentElement.style.setProperty(
          '--win-bar-rotation',
          90 + 'deg',
        );
        document.documentElement.style.setProperty(
          '--win-bar-top',
          containerRect.top + (containerRect.height / 2 - 28) + 'px',
        );
        document.documentElement.style.setProperty(
          '--win-bar-left',
          containerRect.left +
            cellWidth * 1 +
            28 +
            cellWidth / 2 -
            containerRect.height * 0.8 / 2 +
            'px',
        );
        document.documentElement.style.setProperty(
          '--win-bar-width',
          containerRect.height * 0.8 + 'px',
        );
        break;
      case 'columnRight':
        document.documentElement.style.setProperty(
          '--win-bar-rotation',
          90 + 'deg',
        );
        document.documentElement.style.setProperty(
          '--win-bar-top',
          containerRect.top + (containerRect.height / 2 - 28) + 'px',
        );
        document.documentElement.style.setProperty(
          '--win-bar-left',
          containerRect.left +
            cellWidth * 2 +
            36 +
            cellWidth / 2 -
            containerRect.height * 0.8 / 2 +
            'px',
        );
        document.documentElement.style.setProperty(
          '--win-bar-width',
          containerRect.height * 0.8 + 'px',
        );
        break;
      case 'NONE':
        document.documentElement.style.setProperty('--win-bar-width', '0px');
        break;
      default:
        break;
    }
  };

  render() {
    if (this.props.gameWin === true) {
      return (
        <div className="gameBoardBarContainer">
          <div className="gameBoardBarAngled">
            The difference between winners and losers is quitting
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
