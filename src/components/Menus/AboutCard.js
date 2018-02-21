import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
        Elevation,
        CardActions,
        CardHeader,
        CardMedia,
        CardText,
        CardTitle,
        Content,
        GridList,
        Tile,
        TileContent,
        TilePrimary,
        TileSecondary,
        TileTitle,
        Icon
        } from 'react-mdc-web';

import reactIcon from '../../res/react.svg'
import jsIcon from '../../res/jsshield.svg'
import sassIcon from '../../res/sass.svg'
import firebaseIcon from '../../res/firebase.svg'
import reduxIcon from '../../res/redux.svg'
import nodeIcon from '../../res/nodejs.svg'
import npmIcon from '../../res/npm.svg'
import gitIcon from '../../res/git.svg'
import githubIcon from '../../res/github.svg'
import css3Icon from '../../res/css3shield.svg'
import html5Icon from '../../res/html5shield.svg'
import jsxIcon from '../../res/jsx.png'


@connect(
store => ({

}),
dispatch => ({

})
)


export default class AboutCard extends Component {

  logoIcon = (src, alt, href, offset = '0%') => {
    return (
      <a href={href}>
        <img src={src} alt={alt} style={{maxWidth: '80%', maxHeight: '15vh', margin: '0% auto 25% auto', display: 'block', paddingTop: offset}}></img>
      </a>
    )
  }

  render(){
    return(
      <Elevation z={4} style={{overflowY: 'scroll', height: '75vh', padding: '24px', margin: '8px'}}>
        Built With:<br/>

        Frameworks & Libraries <br/>
        <GridList>
          <Tile>
            <TilePrimary>
              {this.logoIcon(reactIcon,
                'react',
                'https://reactjs.org/',
                '10%'
              )}
            </TilePrimary>
            <TileSecondary>
              <TileTitle>
                React JS
              </TileTitle>
            </TileSecondary>
          </Tile>

          <Tile>
            <TilePrimary>
              {this.logoIcon(
                reduxIcon,
                'Redux',
                'https://redux.js.org/'
              )}
            </TilePrimary>
            <TileSecondary>
              <TileTitle>
                React JS
              </TileTitle>
            </TileSecondary>
          </Tile>

          <Tile>
            <TilePrimary>
              {this.logoIcon(
                firebaseIcon,
                'Firebase',
                'https://firebase.google.com/'
              )}
            </TilePrimary>
            <TileSecondary>
              <TileTitle>
                Firebase
              </TileTitle>
            </TileSecondary>
          </Tile>
        </GridList>
        <br/><br/><br/>


        Utilites & Languages: <br/>

        <GridList>
          <Tile>
            <TilePrimary>
              {this.logoIcon(
                nodeIcon,
                'Node JS',
                'https://nodejs.org/en/about/',
                '25%'
              )}
            </TilePrimary>
            <TileSecondary>
              <TileTitle>
                Node JS
              </TileTitle>
            </TileSecondary>
          </Tile>

          <Tile>
            <TilePrimary>
              {this.logoIcon(
                npmIcon,
                'NPM',
                'https://www.npmjs.com/',
                '25%'
              )}
            </TilePrimary>
            <TileSecondary>
              <TileTitle>
                NPM
              </TileTitle>
            </TileSecondary>
          </Tile>

          <Tile>
            <TilePrimary>
              {this.logoIcon(
                gitIcon,
                'Git',
                'https://git-scm.com/',
                '15%'
              )}
            </TilePrimary>
            <TileSecondary>
              <TileTitle>
                Git
              </TileTitle>
            </TileSecondary>
          </Tile>

          <Tile>
            <TilePrimary>
              {this.logoIcon(
                githubIcon,
                'Git Hub',
                'https://github.com/Lou-Saydus/ticTacToe-react'
              )}
            </TilePrimary>
            <TileSecondary>
              <TileTitle>
                Git Hub
              </TileTitle>
            </TileSecondary>
          </Tile>

          <Tile>
            <TilePrimary>
              {this.logoIcon(
                sassIcon,
                'Sass',
                'http://sass-lang.com/',
                '10%'
              )}
            </TilePrimary>
            <TileSecondary>
              <TileTitle>
                SASS
              </TileTitle>
            </TileSecondary>
          </Tile>

          <Tile>
            <TilePrimary>
              {this.logoIcon(
                jsxIcon,
                'React JSX',
                'https://reactjs.org/docs/introducing-jsx.html'
              )}
            </TilePrimary>
            <TileSecondary>
              <TileTitle>
                JSX
              </TileTitle>
            </TileSecondary>
          </Tile>

          <Tile>
            <TilePrimary>
              {this.logoIcon(
                html5Icon,
                'HTML5',
                'https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5'
              )}
            </TilePrimary>
            <TileSecondary>
              <TileTitle>
                HTML5
              </TileTitle>
            </TileSecondary>
          </Tile>

          <Tile>
            <TilePrimary>
              {this.logoIcon(
                css3Icon,
                'CSS3',
                'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3'
              )}
            </TilePrimary>
            <TileSecondary>
              <TileTitle>
                CSS3
              </TileTitle>
            </TileSecondary>
          </Tile>

          <Tile>
            <TilePrimary>
              {this.logoIcon(
                jsIcon,
                'JavaScript',
                'https://developer.mozilla.org/en-US/docs/Glossary/JavaScript'
              )}
            </TilePrimary>
            <TileSecondary>
              <TileTitle>
                JavaScript
              </TileTitle>
            </TileSecondary>
          </Tile>
        </GridList>
        {/*
            <a
            href="https://nodejs.org/en/about/">
            {this.logoIcon(nodeIcon)}
            </a>

            <a
            href="https://www.npmjs.com/">
            {this.logoIcon(npmIcon)}
            </a>

            <a
            href="https://git-scm.com/">
            {this.logoIcon(gitIcon)}
            </a>

            <a
            href="https://github.com/Lou-Saydus/ticTacToe-react">
            {this.logoIcon(githubIcon)}
            </a>

            <a
            href="http://sass-lang.com/">
            {this.logoIcon(sassIcon)}
            </a>

            <a
            href="https://reactjs.org/docs/introducing-jsx.html">
            {this.logoIcon(jsxIcon)}
            </a>

            <a
            href="https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5">
            {this.logoIcon(html5Icon)}
            </a>

            <a
            href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS3">
            {this.logoIcon(css3Icon)}
            </a>

            <a
            href="https://developer.mozilla.org/en-US/docs/Glossary/JavaScript">
            {this.logoIcon(jsIcon)}
        </a>*/}

      </Elevation>
    )
  }
}
