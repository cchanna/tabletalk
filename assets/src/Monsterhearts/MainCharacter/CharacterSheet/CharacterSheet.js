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
`
const Wrapper = rx('div')`
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
const Mechanics = rx('div')`
  display: flex;
  flex-flow: row wrap;
`
const Section = rx('div')`
  padding: 0 40px 0 0;
`
const MovesSection = rx('div')`
  @include column-width(600px);
`
const Text = rx('div')`
  margin-top: 20px;
  @include column-width(600px);
`
const TextSection = rx('div')`
  @include break-inside(avoid);
  max-width: 600px;
`

class CharacterSheet extends Component {
  static propTypes = {
    id: number.isRequired,
    eyes: string,
    look: string,
    origin: string,
    
    depth: number.isRequired,
    sexMove: string.isRequired,
    advice: string.isRequired,
    moves: arrayOf(string).isRequired,
    playbook: string.isRequired,
    sizes: arrayOf(string).isRequired
  }
  
  render() {
    const { 
      id, eyes, look, origin, depth, 
      sexMove, advice, moves, playbook, sizes
    } = this.props;
      
    return (
      <Container>
        <Wrapper>
          <Mechanics>
            <Section>
              <Header>Stats</Header>
              <Stats id={id}/>
              <Harm id={id}/>
              <Header>Conditions</Header>
              <Conditions id={id}/>
            </Section>
            <Section>
              <Header>Strings</Header>
              <Strings id={id} depth={depth}/>
            </Section>
            <Section>
              <Experience id={id}/>
              <Advancements id={id} depth={depth}/>
            </Section>
          </Mechanics>
          <div>
            <Header>Moves</Header>
            <MovesSection rx={sizes}>
              {moves.map(move => 
                <Move key={move} id={id} name={move} showNotes/>
              )}
            </MovesSection>
          </div>
          <Text rx={sizes}>
            <Notes id={id}/>
            <TextSection>
              <Header>Identity</Header>
              <Looks>
                <Look name="Look" value={look}/>
                <Look name="Eyes" value={eyes}/>
                <Look name="Origin" value={origin}/>
              </Looks>
            </TextSection>
            <TextSection>
              <Header>Darkest Self</Header>
              <DarkestSelf id={id}/>
            </TextSection>
            <TextSection>
              <Header>Sex Move</Header>
              <Markdown text={sexMove}/>
            </TextSection>
            <TextSection>
              <Header>Playing the {playbook}</Header>
              <Markdown text={advice}/>
            </TextSection>
          </Text>
        </Wrapper>
      </Container>
    );
  }
}

export default CharacterSheet;