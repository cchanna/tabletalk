import React from 'react';
import rx from 'resplendence';
import { string, bool, object, shape, instanceOf, arrayOf, func } from 'prop-types';

import GameInfo from './GameInfo';
import GamesList from './GamesList';
import NewGameForm from './NewGameForm';
import Spinner from 'common/components/Spinner';

import { exactMatch } from 'utils/pathTools';
import expired from 'utils/expired';

rx`
@import "~common/styles";
`

const Container = rx('div')`
  width: 100%;
  height: 100%;
  max-width: 800px;
  padding: 40px;
`

const Title = rx('div')`
  @include card;
  font-family: "Marvin Visions";
  color: #B24592;
  font-size: 80px;
  margin: 10px 0;
  position: relative;
  text-align: center;
`

const ReturnButton = rx('button')`
  @include button;
  font-family: "Icomoon";
  position: absolute;
  display: block;
  top: 25px;
  left: 10px;
  color: #B24592;
  font-size: 40px;
`


class Games extends React.Component {
  static propTypes = {
    path: arrayOf(string).isRequired,
    here: arrayOf(string).isRequired,

    list: arrayOf(string),
    gamesBySlug: object,
    playersById: object,

    error: bool.isRequired,
    lastLoaded: instanceOf(Date),

    getGame: func.isRequired,
    goTo: func.isRequired,
    openGame: func.isRequired,
    openNewGame: func.isRequired,
    joinGame: func.isRequired,
    startJoinGame: func.isRequired,
    cancelJoinGame: func.isRequired,
    setInput: func.isRequired,

    join: shape({
      joining: bool.isRequired,
      failed: bool.isRequired,
      loading: bool.isRequired,
      input: string.isRequired
    }).isRequired,
  }

  route = () => {
    const currentGame = this.currentGame();
    
    if (currentGame !== null) {
      if (currentGame !== 'new') {
        const { gamesBySlug, getGame } = this.props;
        if (gamesBySlug === null || gamesBySlug[currentGame] === undefined) {
          getGame({id: currentGame});
        }
      }
    }
    else
    {
      const { list, error, lastLoaded, getGames } = this.props;
      if ((list === null && !error) || expired(lastLoaded, 10)) {
        getGames();
      }
    }
  }
  componentDidMount = this.route;
  componentDidUpdate(prevProps) {
    if (!exactMatch(this.props.path, prevProps.path)) {
      this.route();
    }
  }
  return = () => {
    const { goTo, here } = this.props;
    goTo(here);
  }
  currentGame = () => this.props.path.length > 0 ? this.props.path[0] : null;

  startGame = () => {
    const { goTo, gamesBySlug } = this.props;
    const slug = this.currentGame();
    const game = gamesBySlug[slug];
    if (game.me !== undefined) {
      goTo(["play", this.currentGame()]);
    }
  }

  joinGame = () => {
    const { joinGame, join } = this.props;
    const slug = this.currentGame();
    joinGame({slug, player: join.input});
  }

  render() {
    const { list, gamesBySlug, loading, failed } = this.props;

    let content;
    let returnButton;
    const currentGame = this.currentGame();
    if (
      currentGame !== 'new' && 
      (
        loading ||
        gamesBySlug === null || 
        (
          currentGame === null && 
          list === null
        ) || 
        (
          currentGame !== null && 
          gamesBySlug[currentGame] === undefined
        )
      )
    ) {
      content = <Spinner/>
    }
    else if (failed) {
      content = "Failed!"
    }
    else if (currentGame === null) {
      const { openGame, openNewGame } = this.props;

      const listGames = list.map(slug => {
        const { kind, name } = gamesBySlug[slug];
        return {
          slug, kind, name
        }
      })
      content = <GamesList openGame={openGame} openNewGame={openNewGame} games={listGames} />
    }
    else {
      returnButton = <ReturnButton onClick={this.return}>{"<"}</ReturnButton>
      
      if (currentGame === 'new') {
        content = <NewGameForm/>
      }
      else {
        const { playersById, startJoinGame, cancelJoinGame, setInput, join } = this.props;

        const game = gamesBySlug[currentGame];

        const props = {
          ...game, ...join, 
          playersById, startJoinGame, cancelJoinGame, setInput, 
          joinGame: this.joinGame,
          startGame: this.startGame
        }
        if (game !== undefined) {
          content = <GameInfo {...props}/>
        }
  
      }
    }

    return (
      <Container>
        <Title>
          {returnButton}
          TableTalk
        </Title>
        {content}
      </Container>
    )
  }
}

export default Games;
