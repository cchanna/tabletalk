import React from 'react';
import rx from 'resplendence';
import { string, number, object, arrayOf, func } from 'prop-types';

import {
  kindsById, toClassName
} from "common/gameKinds";

import JoinGameForm from './JoinGameForm';
import { Button } from './FormComponents';


rx`
@import "~common/styles";
@import "~common/colors";
`


const Container = rx('div')`
  @include card;
  background: $card-background-light;
  padding: 20px;
  color: $color-dark;
  display: flex;
  flex-flow: column;
  margin: 20px 0;
`

const Header = rx('div')`
  font-size: 50px;
  text-align: center;
  font-family: "League Spartan";
  text-shadow: -1px 1px 1px hsla(0, 0%, 0%, .2);
`

const Players = rx('ul')`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  list-style: none;
  padding: 0;
  margin: -30px -15px -15px -15px;
`

const Player = rx('li')`
  font-family: "Junction";
  font-size: 20px;
  margin: 15px;  
`

const PlayerIcon = rx('span')`
  display: inline-block;
  width: 30px;
  height: 30px;
  padding: 2px 2px 0 2px;
  box-sizing: border-box;
  text-align: center;
  font-size: 22px;
  border-radius: 25px;
  background: transparent;
  font-family: "Icomoon";
  position: relative;
  top: 2px;
  &.me {
    background: $card-background-dark;
    color: hsl($hue1, 22%, 90%);
  }
`

const PlayerName = rx('span')`
  margin-left: 6px;
`

const PlayerMessage = rx('div')`
  font-size: 20px;
  font-family: "Junction";
  color: $link-hover;
  text-align: center;
`

const EnterRow = rx('div')`
  height: 53px;
  display: flex;
  flex-flow: row;
  justify-content: center;
`

const PlayersHeader = rx('h1')`
  font-size: 24px;
  font-family: "Junction";
  font-weight: bold;
`


class GameInfo extends React.Component {
  static propTypes = {
    name: string.isRequired,
    kind: number.isRequired,
    players: arrayOf(number).isRequired,
    maxPlayers: number.isRequired,
    playersById: object.isRequired,
    me: number,
    startGame: func.isRequired,
    joinGame: func.isRequired
  }

  render() {
    const { name, kind, players, maxPlayers, playersById, me, startGame, joinGame } = this.props;
    const playerComponents = players.map(id => {
      const { name, admin } = playersById[id];
      return (
        <Player key={id}>
          <PlayerIcon rx={{me: (me === id)}}>{admin ? "u" : "u"}</PlayerIcon>
          <PlayerName>{name}</PlayerName>
        </Player>
      )
    });
    let enterButton;
    if (me === null) {
      if (players.length >= maxPlayers) {
        enterButton = <PlayerMessage>This game is full.</PlayerMessage>        
      }
      else {
        enterButton = (
          <EnterRow>
            <JoinGameForm joinGame={joinGame} names={players.map(p => playersById[p].name)} />
          </EnterRow>
        );
      }
    }
    else {
      enterButton = <EnterRow><Button onClick={startGame}>Enter</Button></EnterRow>;
    }

    return (
      <Container>
        <Header rx={toClassName(kindsById[kind])}>{name}</Header>
        {enterButton}
        <PlayersHeader>Players</PlayersHeader>
        <Players>
          {playerComponents}
        </Players>
      </Container>
    )
  }
}

export default GameInfo;