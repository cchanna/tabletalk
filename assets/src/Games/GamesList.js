import React from 'react';
import rx from 'resplendence';

import GameListItem from './GameListItem';

rx`
@import "~common/styles";
`

const Container = rx('div')`
  display: flex;
  flex-flow: column;
  align-items: center;
`

const NewGame = rx('button')`
  @include button;
  font-family: "League Spartan";
  color: white;
  display: block;
  font-size: 40px;
  opacity: .7;
  margin: 20px 0;
  text-shadow: -2px 2px 1px hsla(0, 0%, 0%, .4);
  transition: opacity .15s;
  &:hover, &:focus {
    opacity: 1;
  }
`




class GamesList extends React.Component {
  render() {
    const { games, openGame, openNewGame } = this.props;
    const gameComponents = games.map((game) => <GameListItem key={game.id} kind={game.kind} id={game.id} name={game.name} openGame={openGame}/>);
    return (
      <Container>
        {gameComponents}
        <NewGame onClick={openNewGame}>New Game</NewGame>
      </Container>
    )
  }
}
export default GamesList;