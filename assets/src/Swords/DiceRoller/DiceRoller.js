import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
import BaseDie from '../Die';
import { diceShape } from 'Swords/propTypes';
  
rx`
@import '~Swords/styles';
`


const Container = rx('div')`
  position: absolute;
  z-index: 2;
  top: calc(100% - 160px);
  transition: 500ms top ease-in-out;
  &.mine {
    top: calc(100% - 200px);
    &.held {
      top: calc(50% - 90px);
    }
  }
  &:not(.mine).held {
    top: calc(100% - 20px);
  }
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
`

const DiceButton = rx('button')`
  @include button;
  position: relative;
  height: 180px;
  width: 320px;
  flex: 0 0 auto;
  border: 20px solid white;
  @include mood-background;
  box-shadow: -1px 1px 1px 1px rgba(0, 0, 0, .5), -1px 1px 1px 1px rgba(0, 0, 0, .5) inset;
  background: transparent;
  left: calc(50% - 160px);
  bottom: 0;
  transition-property: bottom, left, box-shadow;
  transition-duration: 300ms;
  &:not(:disabled) {
    &:hover {
      bottom: 10px;
    }
    &:focus {
      bottom: -1px;
      left: 1px;
      box-shadow: -2px 2px 2px 2px rgba(0, 0, 0, .5), -1px 1px 1px 1px rgba(0, 0, 0, .5) inset;
    }
    &:hover:focus {
      bottom: 9px;
    }
    &:active {
      bottom: 20px;
    }
    &:active:focus {
      bottom: 19px;
    }
  }
`


const Cover = rx('div')`
  pointer-events: none;
  position: absolute;
  opacity: 0;
  transition: 300ms opacity;
  width: 100%;
  height: 100%;
  left: 0;
  bottom: 0;
  background: white;
  &.show {
    opacity: 1;
  }
`

const Dice = rx('div')`
  font-size: 100px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`
const Die = rx(BaseDie)`
  margin: 20px;
  svg {
    filter: drop-shadow(-1px 1px 1px rgba(0, 0, 0, .25));
  }
`
const CurrentHolder = rx('div')`
  font-family: $body;
  font-weight: bold;
  font-size: 14px;
  color: black;
  text-align: center;
  position: absolute;
  z-index: 1;
  top: 3px;
  opacity: 0;
  transition: 300ms opacity;
  pointer-events: none;
  &.show {
    opacity: 1;
  }
  width: 100%;
  z-index: 1;
`
const GiveToList = rx('div')`
  display: flex;
  --text: white;
  color: var(--text);
  flex-flow: row wrap;
  justify-content: center;
`
const GiveTo = rx('div')`
  font-family: $body;
  font-weight: bold;
  font-size: 20px;
  margin-top: 10px;
  text-align: center;
  color: white;
  width: 100%;
  position: relative;
  transition: 300ms top ease-in-out;
  top: 20px;
  &.show {
    top: 0;
  }
`
const GiveToButton = rx('button')`
  @include button-style;
  margin: 10px;
`
const SetDown = rx('div')`
  position: absolute;
  top: 5px;
  --text: white;
  transition: 300ms top;
  &.show {
    top: -32px;
  }
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  z-index: 1;
`
const SetDownButton = rx('button')`
  @include button-style;
`
const TakeButton = rx('button')`
  @include button-style;
  left: calc(50% - 24.25px);
  position: absolute;
  top: -30px;
  width: 48.5px;

`

class DiceRoller extends Component {
  static propTypes = {
    dice: diceShape,
    tone: bool.isRequired,
    mine: bool.isRequired,
    amOverplayer: bool.isRequired,
    players: arrayOf(shape({
      id: number.isRequired,
      name: string.isRequired
    })).isRequired,
    holder: string.isRequired,
    roll: func.isRequired,
    pickUpDice: func.isRequired,
    giveDice: func.isRequired,
    setDownDice: func.isRequired,
    takeDice: func.isRequired
  }

  onGive = e => {
    const id = parseInt(e.target.name, 10);
    this.props.giveDice({id});
  }
  
  render() {
    const { dice, tone, mine, amOverplayer, players, holder, roll, pickUpDice, setDownDice, takeDice } = this.props;
    const held = dice === null;
    return (
      <Container rx={{mine, held}} >
        <TakeButton disabled={!amOverplayer || mine} onClick={takeDice}>Take</TakeButton>
        <CurrentHolder rx={{show: !mine}}>{held ? `${holder} is holding the dice` : `${holder} is talking`}</CurrentHolder>
        <SetDown rx={{show: mine && held}}>
          <SetDownButton onClick={setDownDice} disabled={!mine || !held}>
            Set Down
          </SetDownButton>
        </SetDown>
        <DiceButton rx={{jovial: tone}} onClick={(held ? roll : pickUpDice)} disabled={!mine}>
          <Cover rx={{show: held}}/>
          <Dice>
            <Die value={dice ? dice.glum : 0} tone={false} clear={dice && (tone === false)}/>
            <Die value={dice ? dice.jovial : 0} tone={true} clear={dice && (tone === true)}/>
          </Dice>
        </DiceButton>
        <GiveTo rx={{show: mine && held}}>Give to:</GiveTo>
        <GiveToList rx={{show: mine && held}}>
          {players.map(({id, name}) => (
            <GiveToButton disabled={!mine || !held} onClick={this.onGive} name={id} key={id}>{name}</GiveToButton>
          ))}
        </GiveToList>
      </Container>
    );
  }
}

export default DiceRoller;