import React, {Component} from 'react'
import {connect} from 'react-redux'
import {firebaseConnect} from 'react-redux-firebase'

@firebaseConnect()

@connect(store => {
  gameWin: store.
},
{

})

export default class GameBoardBar extends Component {
  render(){
    return(
      <div className="gameBoardBarContainer">
        <div className="gameBoardBarAngled">love is a lie</div>
      </div>
    )
  }
}
