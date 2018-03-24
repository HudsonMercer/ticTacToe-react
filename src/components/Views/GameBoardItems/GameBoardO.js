import React, { Component } from 'react';

export default class GameBoardO extends Component {
  render() {
    return (
      <svg class="gameBoardOContainer">
        <circle class="gameBoardOCircle1" />
        <circle class="gameBoardOCircle2" />
      </svg>
    );
  }
}
