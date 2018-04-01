import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
import pass from './pass.wav';
import { diceShape } from 'Swords/propTypes';
import pickUp1 from './dice_pick_up_01.wav';
import pickUp2 from './dice_pick_up_02.wav';
import pickUp3 from './dice_pick_up_03.wav';
import pickUp4 from './dice_pick_up_04.wav';
import pickUp5 from './dice_pick_up_05.wav';
import pickUp6 from './dice_pick_up_06.wav';
import roll1 from './dice_roll_01.wav';
import roll2 from './dice_roll_02.wav';
import roll3 from './dice_roll_03.wav';
import roll4 from './dice_roll_04.wav';
import roll5 from './dice_roll_05.wav';
import roll6 from './dice_roll_06.wav';
import roll7 from './dice_roll_07.wav';
import setDown from './dice_set_down.wav';

rx`
@import '~Swords/styles';
`

// pass - https://freesound.org/people/XxChr0nosxX/sounds/268226/
// pick up - https://freesound.org/people/Glaneur%20de%20sons/sounds/34171/

const Container = rx('button')`
  @include button;
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  z-index: 5;
  &:after, &:before {
    font-family: "icomoon";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    box-shadow: -1px 1px 1px 1px rgba(0, 0, 0, .5);
    display: flex;
    align-items: center;
    justify-content: center;
    transition-property: opacity, box-shadow;
    transition-duration: 300ms; 
  }
  &:before {
    content: "M";
    background: var(--color-jovial);
    color: var(--text-jovial);
    opacity: .5;
  }
  &:after {
    content: "m";
    background: var(--color-glum);
    color: var(--text-glum);
    opacity: 0;
  }
  &.muted {
    &:before {
      opacity: 0;
    }
    &:after {
      opacity: .5;
    }
  }
  &:focus {
    &.muted:after {
      opacity: .75;
    }
    &:not(.muted):before {
      opacity: .75;
    }
  }
  &:hover {
    &.muted:after {
      opacity: 1;
    }
    &:not(.muted):before {
      opacity: 1;
    }
  }
  &:active {
    &.muted:after {
      opacity: 0;
    }
    &:not(.muted):before {
      opacity: 0;
    }
  }
`

function randomSound(sounds) {
  const i = Math.floor(Math.random() * sounds.length);
  return sounds[i];
}


class Sound extends Component {
  static propTypes = {
    dice: diceShape,
    holder: number.isRequired
  }

  pickUp = [pickUp1, pickUp2, pickUp3, pickUp4, pickUp5, pickUp6].map(s => new Audio(s));
  roll = [roll1, roll2, roll3, roll4, roll5, roll6, roll7].map(s => new Audio(s));
  setDown = new Audio(setDown);
  pass = new Audio(pass);

  state = {
    muted: !!window.localStorage.getItem("muted")
  }

  componentDidUpdate(prevProps) {
    if (!this.state.muted) {
      if (prevProps.dice && !this.props.dice) {
        randomSound(this.pickUp).play();
      }
      else if (prevProps.holder !== this.props.holder) {
        this.pass.play();
      }
      else if (!prevProps.dice && this.props.dice) {
        if (this.props.dice.glum) {
          randomSound(this.roll).play();
        }
        else {
          this.setDown.play();
        }
      }
    }
  }

  toggleMute = () => {
    this.setState(({muted}) => {
      if (muted) {
        window.localStorage.removeItem("muted");
      }
      else {
        window.localStorage.setItem("muted", "muted");
      }
      return {
        muted: !muted
      }
    });
  }
  
  render() {
    const { muted } = this.state;
    return (
      <Container rx={{muted}} onClick={this.toggleMute}/>
    );
  }
}

export default Sound;