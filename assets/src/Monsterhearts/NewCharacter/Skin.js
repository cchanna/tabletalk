import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import { playbookProperties } from '../propTypes';
import rx from 'resplendence'

import Markdown from 'Monsterhearts/common/Markdown';

import Move from './Move';
import mortalImg from './mortal.svg';
import faeImg from './fae.svg';
import ghostImg from './ghost.svg';
import ghoulImg from './ghoul.svg';
import hollowImg from './hollow.svg';
import infernalImg from './infernal.svg';
import queenImg from './queen.svg';
import serpentineImg from './serpentine.svg';
import vampireImg from './vampire.svg';
import werewolfImg from './werewolf.svg';
import witchImg from './witch.svg';
import movesInstructions from '../movesInstructions';
import BaseCheckbox from 'Monsterhearts/common/Checkbox';

rx`
@import '~common/styles';
@import '~Monsterhearts/colors';
`


const Container = rx('div')`
  font-family: "Fontin";
  color: darken($foreground, 10%);
  padding: 15px;
  overflow-y: scroll;
  flex: 1 0 0;
  width: 100%;
  font-size: 16px;
  box-sizing: border-box;
  &.under-laptop {
    overflow: visible;
    flex: 0 0 auto;
  }
  user-select: text;
  ::selection {
    background-color: $accent;
  }
  padding-bottom: 20px;
`
const Wrapper = rx('div')`
  -webkit-columns: 2;
  -moz-columns: 2;
      columns: 2;
  &.under-laptop {
  -webkit-columns: 1;
    -moz-columns: 1;
        columns: 1;
  }
  &.max {
  -webkit-columns: 3;
    -moz-columns: 3;
        columns: 3;
  }
`

const Flavour = rx('div')`
  margin-bottom: 15px;
  line-height: 1.3;
  max-width: 700px;
  font-style: italic;
  -webkit-column-break-inside: avoid;
            page-break-inside: avoid;
                 break-inside: avoid;
`



const IdentityContainer = 'p'
const Header = rx('h1')`
  font-size: 1.5em;
  font-weight: regular;
  margin: 0;
  font-family: "Yataghan";
  -webkit-column-break-inside: avoid;
  page-break-inside: avoid;
      break-inside: avoid;
`
const Title = rx('div')`
  font-size: 2em;
  font-family: "Yataghan";
`
const IdentityName = rx(`span`)`
  font-weight: bold;
  margin-right: 4px;
  font-size: 1.1em;
`

const Instructions = rx('div')`
  font-style: italic;
  margin-bottom: 1.4em;
`
const Columns = rx('div')`
  width: 100%;
  -webkit-columns: 2;
     -moz-columns: 2;
          columns: 2;
  &.laptop, &.under-tablet {
    -webkit-columns: 1;
       -moz-columns: 1;
            columns: 1;
  }
  -webkit-column-break-inside: avoid;
            page-break-inside: avoid;
                 break-inside: avoid;
`
const Split = rx('div')`
  width: 100%;
  display: grid;
  grid-column-gap: 10px;
  grid-template-columns: repeat(2, 1fr);
  &.laptop, &.under-tablet {
    grid-template-columns: 1fr;
    div:not(:last-child) {
      margin-bottom: 20px;
    }
  }
  margin-bottom: 20px;
  -webkit-column-break-inside: avoid;
            page-break-inside: avoid;
                 break-inside: avoid;
`

const Divider = rx('div')`
  background: darken($foreground, 10%);
  height: 1px;
  width: 100%;
  margin: 1.4em 0;
`

const Image = rx('img')`
  max-width: 400px;
  path {
    fill: $foreground;
  }
`
const Section = rx('div')`
  -webkit-column-break-inside: avoid;
            page-break-inside: avoid;
                 break-inside: avoid;
`
const Circle = rx('div')`
  fill: transparent;
  &.checked {
    fill: darken($foreground, 10%);
  }
`
const Path = rx('div')`
  fill: darken($foreground, 10%);
`

const Advancements = rx('ul')`
  list-style: none;
  margin: 0;
  padding: 0;
`
const AdvancementLi = 'li';
const CheckboxContainer = rx('span')`
  &.checked circle {
    fill: darken($foreground, 10%);
  }
  path {
    fill: darken($foreground, 10%);
  }
  position: relative;
  width: 1em;
  height: 1em;
  display: inline-block;
  margin-right: .5em;
  top: .1em;
`
const DividableColumns = rx('div')`
  -webkit-columns: 2;
     -moz-columns: 2;
          columns: 2;
  &.under-laptop {
    -webkit-columns: 1;
       -moz-columns: 1;
            columns: 1;
  }
`

const Checkbox = rx(BaseCheckbox)`
  &.checked circle {
    fill: darken($foreground, 10%);
  }
  path {
    fill: darken($foreground, 10%);
  }
  position: relative;
  width: 1em;
  height: 1em;
  display: inline-block;
  margin-right: .5em;
  top: .1em;
`

const Advancement = ({children}) => 
  <AdvancementLi>
    <Checkbox/>
    {children}
  </AdvancementLi>


const Identity = ({name, list}) => 
  <IdentityContainer>
    <IdentityName>{name}:</IdentityName>
    {list.map(item => item.trim().replace(" ", '\u00A0')).join(", ")}
  </IdentityContainer>

const StatsArrayContainer = rx('div')`
  font-family: "Yataghan";
  font-size: 1.25em;
  &.under-tablet {
    font-size: 1em;
  }
  -webkit-column-break-inside: avoid;
            page-break-inside: avoid;
                 break-inside: avoid;
`
const StatsDivider = rx('div')`
  width: calc(100% - 40px);
  height: 1px;
  box-sizing: border-box;
  background: darken($foreground, 10%);
  margin: 20px;
  -webkit-column-break-inside: avoid;
            page-break-inside: avoid;
                 break-inside: avoid;
`
const StatList = rx('div')`
  display: flex;
  flex-flow: row nowrap;
  margin: -15px 0;
  width: 100%;
  justify-content: space-between;
  -webkit-column-break-inside: avoid;
            page-break-inside: avoid;
                 break-inside: avoid;
`
const Stat = 'div';

const bonusString = number => {
  if (number >= 0) return "+ " + number;
  else return "− " + (-number);
}

const StatArray = ({stats, sizes}) => 
  <StatsArrayContainer rx={sizes}>
    <StatList>
      <Stat>Hot {bonusString(stats[0][0])}</Stat>
      <Stat>Cold {bonusString(stats[0][1])}</Stat>
      <Stat>Volatile {bonusString(stats[0][2])}</Stat>
      <Stat>Dark {bonusString(stats[0][3])}</Stat>
    </StatList>
    <StatsDivider/>
    <StatList>
      <Stat>Hot {bonusString(stats[1][0])}</Stat>
      <Stat>Cold {bonusString(stats[1][1])}</Stat>
      <Stat>Volatile {bonusString(stats[1][2])}</Stat>
      <Stat>Dark {bonusString(stats[1][3])}</Stat>
    </StatList>
  </StatsArrayContainer>


const image = playbook => {
  switch(playbook) {
    case "Fae":
      return faeImg;
    case "Mortal":
      return mortalImg;
    case "Ghost":
      return ghostImg;
    case "Ghoul":
      return ghoulImg;
    case "Hollow":
      return hollowImg;
    case "Infernal":
      return infernalImg;
    case "Queen":
      return queenImg;
    case "Serpentine":
      return serpentineImg;
    case "Vampire":
      return vampireImg;
    case "Werewolf": 
      return werewolfImg;
    case "Witch":
      return witchImg;
    default:
      return mortalImg;

  }
}

class Skin extends Component {
  static propTypes = {
    name: string.isRequired,
    movesByName: object.isRequired,
    advancementsById: object.isRequired,
    ...playbookProperties,
    sizes: arrayOf(string)
  }
  
  render() {
    const { 
      name, movesByName, advancementsById, sexMove,
      names, looks, eyesList, origins, backstory, darkestSelf, advice, 
      flavour, advancements, stats, moves, startingMoves, startingMoveChoices,
      sizes
    } = this.props;
    
    if (names === undefined) return null; 
    return (
      <Container rx={sizes}>
        <Wrapper rx={sizes}>
          <Section>
            <Image src={image(name)}/>
            <Title>The {name}</Title>
            <Flavour><Markdown text={flavour}/></Flavour>
          </Section>
          <Divider/>
          <Columns rx={sizes}>
            <Header>Identity</Header>
            <Identity name="Name" list={names}/>
            <Identity name="Look" list={looks}/>
            <Identity name="Eyes" list={eyesList}/>
            <Identity name="Origins" list={origins}/>
          </Columns>
          <Divider/>
          <StatArray stats={stats} sizes={sizes}/>
          <Divider/>
          <Split rx={sizes}>
            <Section>
              <Header>Your Backstory</Header>
              {backstory.map((x, i) => <p key={i}>{x}</p>)}
            </Section>
            <Section>
              <Header>Advancements</Header>
              <Advancements>
                {advancements.map((id, i) =>
                  <Advancement key={i}>{advancementsById[id].text.replace("{playbook}", name)}</Advancement> 
                )}
              </Advancements>
            </Section>
          </Split>
          <Split rx={sizes}>
            <Section>
              <Header>Darkest Self</Header>
              <Markdown text={darkestSelf}/>
            </Section>
            <Section>
              <Header>Sex Move</Header>
              <Markdown text={sexMove}/>
            </Section>
          </Split>
          <Divider/>
          <Columns rx={sizes}>
            <Header>{name} Moves</Header>
            <Instructions>{movesInstructions(startingMoves, startingMoveChoices)}</Instructions>
            {moves.map((name, i) => 
              <Move key={i} name={name} {...movesByName[name]}/>
            )}
          </Columns>
          <Divider/>
          <Section rx={sizes}>
            <Header>Playing the {name}</Header>
            <Markdown text={advice}/>
          </Section>
        </Wrapper>
      </Container>
    );
  }
}

export default Skin;