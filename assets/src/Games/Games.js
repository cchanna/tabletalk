import React from 'react';
import rx from 'resplendence';

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
  route = () => {
    const currentGame = this.currentGame();
    
    if (currentGame !== null) {
      if (currentGame !== 'new') {
        const { gamesById, getGame } = this.props;
        if (gamesById === null || gamesById[currentGame] === undefined) {
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
    const { goTo, gamesById } = this.props;
    const id = this.currentGame();
    const game = gamesById[id];
    if (game.me === undefined) {
      // TODO join game
    }
    else {
      goTo(["play", this.currentGame()]);
    }
  }

  render() {
    const { list, gamesById, playersById, openGame, openNewGame } = this.props;

    const input = "test";
    const newGame = {
      name: null,
      kind: null,
      playerName: null
    }

    let content;
    let returnButton;
    const currentGame = this.currentGame();
    if (
      currentGame !== 'new' && 
      (
        gamesById === null || 
        (
          currentGame === null && 
          list === null
        ) || 
        (
          currentGame !== null && 
          gamesById[currentGame] === undefined
        )
      )
    ) {
      content = <Spinner/>
    }
    else if (currentGame === null) {
      const listGames = list.map(id => {
        const { kind, name } = gamesById[id];
        return {
          id, kind, name
        }
      })
      content = <GamesList openGame={openGame} openNewGame={openNewGame} games={listGames}/>
    }
    else {
      returnButton = <ReturnButton onClick={this.return}>{"<"}</ReturnButton>
      
      if (currentGame === 'new') {
        content = <NewGameForm {...newGame} input={input}/>
      }
      else {
        const game = gamesById[currentGame];
        if (game !== undefined) {
          content = <GameInfo {...game} playersById={playersById} startGame={this.startGame}/>
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
