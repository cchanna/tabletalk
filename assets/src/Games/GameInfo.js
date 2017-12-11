import React from 'react';
import rx from 'resplendence';
import { string, number, object, arrayOf, bool, func } from 'prop-types';

import {
  kindsById, toClassName
} from "common/gameKinds";

import TextForm from './TextForm';
import Spinner from 'common/components/Spinner';

rx`
@import "~common/styles";
@import "~common/colors";
`


const Container = rx('div')`
  @include card;
  padding: 15px;
  color: black;
  display: flex;
  flex-flow: column;
  margin: 20px 0;
`

const Header = rx('div')`
  @include game-kind-header;
  box-shadow: -1px 1px 1px 1px hsla(0, 0%, 0%, .1) inset;
`

const Players = rx('ul')`
  list-style: none;
  padding: 0;
  margin: 0;
`

const Player = rx('li')`
  color: black;
  font-family: "Junction";
  font-size: 20px;
  margin: 10px;  
  color: darken($background-1, 10%);
`

const PlayerIcon = rx('span')`
  display: inline-block;
  width: 30px;
  height: 30px;
  padding: 3px 2px 0 2px;
  box-sizing: border-box;
  text-align: center;
  font-size: 22px;
  border-radius: 25px;
  background: transparent;
  font-family: "Icomoon";
  position: relative;
  top: 2px;
  &.me {
    background: darken($background-1, 10%);
    color: white;
  }
`

const PlayerName = rx('span')`
  margin-left: 10px;
`

const EnterButton = rx('button')`
  @include button;
  display: block;
  align-self: center;
  margin: 10px;
  font-family: "League Spartan";
  text-shadow: -1px 1px 1px hsla(0, 0%, 0%, .1);
  box-shadow: -1px 1px 1px 1px hsla(0, 0%, 0%, .3);
  background: $background-1;
  color: white;
  font-size: 20px;
  padding: 7px 7px 2px 7px;
`


class GameInfo extends React.Component {
  static propTypes = {
    name: string.isRequired,
    kind: number.isRequired,
    players: arrayOf(number).isRequired,
    playersById: object.isRequired,
    me: number,
    input: string.isRequired,
    joining: bool.isRequired,
    loading: bool.isRequired,
    failed: bool.isRequired,
    startGame: func.isRequired,
    startJoinGame: func.isRequired,
    cancelJoinGame: func.isRequired,
    joinGame: func.isRequired,
    setInput: func.isRequired
  }

  handleSubmit = () => {
    const { joinGame, input } = this.props;
    if (input !== "") joinGame(); 
  }

  render() {
    const { joining, loading, failed } = this.props;

    if (failed) {
      return "oops";
    }
    else if (loading) {
      return <Spinner/>
    }
    else if (joining) {
      const { input, setInput, cancelJoinGame } = this.props;
      return (
        <TextForm label="What's your name? (Not your character's)" input={input} setInput={setInput} submit={this.handleSubmit} goBack={cancelJoinGame}/>
      )
    }
    else {
      const { name, kind, players, playersById, me, startGame, startJoinGame } = this.props;
      const playerComponents = players.map(id => {
        const { name, admin } = playersById[id];
        return (
          <Player key={id}>
            <PlayerIcon rx={{me: (me === id)}}>{admin ? "u" : "u"}</PlayerIcon>
            <PlayerName>{name}</PlayerName>
          </Player>
        )
      });
      const enterButton = (me === null) 
        ? <EnterButton onClick={startJoinGame}>Join</EnterButton>
        : <EnterButton onClick={startGame}>Enter</EnterButton>
  
      return (
        <Container>
          <Header rx={toClassName(kindsById[kind])}>{name}</Header>
          {enterButton}
          <Players>
            {playerComponents}
          </Players>
        </Container>
      )
    }
  }
}

export default GameInfo;