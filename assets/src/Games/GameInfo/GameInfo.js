import React from 'react';
import rx from 'resplendence';
import { string, number, object, arrayOf, func, shape, bool } from 'prop-types';

import {
  kindsById, toClassName
} from "common/gameKinds";

import JoinGameForm from './JoinGameForm';
import { Button } from '../FormComponents';


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
  font-size: 20px;
  &.under-max {
    font-size: 16px;
  }
`

const Header = rx('div')`
  font-size: 2.5em;
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
  margin: 15px;  
`

const PlayerIcon = rx('span')`
  display: inline-block;
  width: 1.4em;
  height: 1.4em;
  padding: .1em .1em 0 .1em;
  box-sizing: border-box;
  text-align: center;
  font-size: 1.1em;
  border-radius: 1.25em;
  background: transparent;
  font-family: "Icomoon";
  position: relative;
  top: .1em;
  &.me {
    background: $card-background-dark;
    color: hsl($hue1, 22%, 90%);
  }
  &.admin {
    padding-top: .15em;
  }
`

const PlayerName = rx('span')`
  margin-left: 6px;
`

const PlayerMessage = rx('div')`
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
  font-size: 1.2em;
  font-family: "Junction";
  font-weight: bold;
`


class GameInfo extends React.Component {
  static propTypes = {
    slug: string.isRequired,
    name: string.isRequired,
    kind: number.isRequired,
    players: arrayOf(shape({
      name: string.isRequired,
      admin: bool.isrequired
    })).isRequired,
    maxPlayers: number.isRequired,
    me: number,
    goTo: func.isRequired,
    joinGame: func.isRequired,
    sizes: arrayOf(string).isRequired
  }

  startGame = () => {
    const { goTo, me, slug } = this.props;
    if (me !== null) {
      goTo(["play", slug]);
    }
  }

  joinGame = (player) => {
    const { joinGame, slug } = this.props;
    return joinGame({slug, player});
  }

  render() {
    const { name, kind, players, maxPlayers, me, sizes } = this.props;
    const playerComponents = players.map(({name, admin, id}) => {
      return (
        <Player key={id}>
          <PlayerIcon rx={{me: (me === id), admin}}>{admin ? "*" : "u"}</PlayerIcon>
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
            <JoinGameForm joinGame={this.joinGame} names={players.map(p => p.name)} />
          </EnterRow>
        );
      }
    }
    else {
      enterButton = <EnterRow><Button onClick={this.startGame}>Enter</Button></EnterRow>;
    }

    return (
      <Container rx={sizes}>
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