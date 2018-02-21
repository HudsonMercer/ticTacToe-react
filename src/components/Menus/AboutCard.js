import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
        Card,
        CardActions,
        CardHeader,
        CardMedia,
        CardText,
        CardTitle,
        Content,
        Icon
        } from 'react-mdc-web';

import reactIcon from '../../res/react.svg'
import jsIcon from '../../res/jsshield.svg'
import sassIcon from '../../res/sass.svg'
import firebaseIcon from '../../res/firebase.svg'
import reduxIcon from '../../res/redux.svg'
import nodeIcon from '../../res/nodejs.svg'
import npmIcon from '../../res/npm.svg'
import css3Icon from '../../res/css3shield.svg'
import html5Icon from '../../res/html5shield.svg'


@connect(
store => ({

}),
dispatch => ({

})
)


export default class AboutCard extends Component {

  logoIcon = (src) => {
    let size = 5
    return (
      <img src={src} style={{width: size + 'vw'}}></img>
    )
  }

  render(){
    return(
      <Card>
        <CardText>
          Built With:

          Frameworks & Libraries <br/>
          REACT {this.logoIcon(reactIcon)}<br/>
          REDUX {this.logoIcon(reduxIcon)}<br/>
          FIREBASE {this.logoIcon(firebaseIcon)}<br/>
          REACT MDC WEB {this.logoIcon(firebaseIcon)}<br/>


          Utilites & Languages: <br/>
          NODEJS {this.logoIcon(nodeIcon)}<br/>
          NPM {this.logoIcon(npmIcon)}<br/>
          GIT, GIT CLI, & GITHUB <br/>
          JSX <br/>
          SASS {this.logoIcon(sassIcon)}<br/>
          JSON <br/>
          HTML5 {this.logoIcon(html5Icon)}<br/>
          CSS3 {this.logoIcon(css3Icon)}<br/>
          JAVASCRIPT{this.logoIcon(jsIcon)}<br/>


        </CardText>
      </Card>
    )
  }
}
