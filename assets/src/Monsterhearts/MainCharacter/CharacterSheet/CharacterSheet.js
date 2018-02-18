import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
import Stats from './Stats';

import Strings from 'Monsterhearts/common/Strings';
import Move from 'Monsterhearts/common/Move';
import Notes from './Notes';
import Harm from './Harm';
import Experience from './Experience';
import Conditions from 'Monsterhearts/common/Conditions';
import Advancements from './Advancements';
import DarkestSelf from './DarkestSelf';

import Markdown from 'Monsterhearts/common/Markdown';

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
  font-size: 20px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`
const Wrapper = rx('div')`
  max-width: 600px;
`

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
Look.propTypes = {
  name: string.isRequired,
  value: string
}

const Looks = rx('div')`

`
const Header = rx('h2')`
  font-family: $header;
  margin: 30px 0 0 0;
`

class CharacterSheet extends Component {
  static propTypes = {
    id: number.isRequired,
    eyes: string,
    look: string,
    origin: string,
    
    path: arrayOf(string).isRequired,
    here: arrayOf(string).isRequired,
    sexMove: string.isRequired,
    advice: string.isRequired,
    moves: arrayOf(string).isRequired,
    playbook: string.isRequired
  }
  
  render() {
    const { 
      id, eyes, look, origin, path, here, 
      sexMove, advice, moves, playbook 
    } = this.props;
      
    return (
      <Container>
        <Wrapper>
          <Header>Stats</Header>
          <Stats id={id}/>
          <Harm id={id}/>
          <Header>Conditions</Header>
          <Conditions id={id}/>
          <Header>Strings</Header>
          <Strings {...{id, path, here}}/>
          <Experience id={id}/>
          <Advancements id={id} depth={here.length}/>
          <Header>Moves</Header>
          {moves.map(move => 
            <Move key={move} id={id} name={move} showNotes/>
          )}
          <Notes id={id}/>
          <Header>Identity</Header>
          <Looks>
            <Look name="Look" value={look}/>
            <Look name="Eyes" value={eyes}/>
            <Look name="Origin" value={origin}/>
          </Looks>
          <Header>Darkest Self</Header>
          <DarkestSelf id={id}/>
          <Header>Sex Move</Header>
          <Markdown text={sexMove}/>
          <Header>Playing the {playbook}</Header>
          <Markdown text={advice}/>
        </Wrapper>
      </Container>
    );
  }
}

export default CharacterSheet;