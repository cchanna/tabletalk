import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
import bonusString from 'common/bonusString';

import Strings from 'Monsterhearts/common/Strings';
import Move from 'Monsterhearts/common/Move';
import Notes from './Notes';
import Harm from './Harm';
import Experience from './Experience';
import Conditions from 'Monsterhearts/common/Conditions';

import parseMove from 'Monsterhearts/parseMove';

rx`
@import '~Monsterhearts/styles';
@import '~Monsterhearts/colors';
@import '~Monsterhearts/fonts';
`

const Container = rx('div')`
  color: $foreground;
  font-family: $body;
  height: 100%;
  box-sizing: border-box;
  overflow-y: scroll;
  font-size: 20px;
  p {
    margin-top: 0;
  }
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`
const Wrapper = rx('div')`
  max-width: 600px;
`
const Stats = rx('div')`
  display: flex;
  flex-flow: row wrap;
`
const StatContainer = rx('div')`
  font-family: $header;
  &:not(:last-child) {
    margin-right: 20px;
  }
`
const Stat = ({value, name}) => 
  <StatContainer>{name}{bonusString(value)}</StatContainer>

const LookContainer = rx('div')`
  font-family: $body;
`
const LookName = rx('span')`
  font-family: $header;
`
const Look = ({name, value}) =>
  <LookContainer>
    <LookName>{name}: </LookName>
    {value}
  </LookContainer>
const Looks = rx('div')`

`
const Header = rx('h2')`
  font-family: $header;
  margin: 30px 0 0 0;
`

class CharacterSheet extends Component {
  static propTypes = {
  }
  
  render() {
    const { id, hot, cold, volatile, dark, eyes, look, origin, path, here, playbookDefinition, moves, playbook } = this.props;
    const { darkestSelf, sexMove, advice } = playbookDefinition;
    const movesComponents = moves
      .map(move => (
        <Move key={move} id={id} name={move} showNotes/>
      ))
    return (
      <Container>
        <Wrapper>
          <Header>Stats</Header>
          <Stats>
            <Stat name="Hot" value={hot}/>
            <Stat name="Cold" value={cold}/>
            <Stat name="Volatile" value={volatile}/>
            <Stat name="Dark" value={dark}/>
          </Stats>
          <Harm id={id}/>
          <Experience id={id}/>
          <Header>Conditions</Header>
          <Conditions id={id}/>
          <Header>Identity</Header>
          <Looks>
            <Look name="Look" value={look}/>
            <Look name="Eyes" value={eyes}/>
            <Look name="Origin" value={origin}/>
          </Looks>
          <Header>Strings</Header>
          <Strings {...{id, path, here}}/>
          <Header>Darkest Self</Header>
          {parseMove(darkestSelf)}
          <Header>Sex Move</Header>
          {parseMove(sexMove)}
          <Header>Moves</Header>
          {movesComponents}
          <Header>Playing the {playbook}</Header>
          {parseMove(advice)}
          <Notes id={id}/>
        </Wrapper>
      </Container>
    );
  }
}

export default CharacterSheet;