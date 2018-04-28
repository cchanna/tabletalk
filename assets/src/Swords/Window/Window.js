import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'

import Colors from '../Colors';
import DiceRoller from '../DiceRoller';
import Characters from '../Characters';
import Motifs from '../Motifs';
import Threads from '../Threads';
import Header from './Header';

rx`
@import '~Swords/styles';
`

const Container = rx('div')`
  flex: 1 0 0;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  position: relative;
  background: transparent;
  @include mood-background;
`

const Cover = rx('div')`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 4;
  opacity: 0;
  background: black;
  transition: opacity 1s;
  &.show {
    opacity: .5;
  }
  pointer-events: none;
  &:not(.show) {
  }
`

const Body = rx('div')`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding: 50px 0 250px 0;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`



class Window extends Component {
  static propTypes = {
    depth: number.isRequired,
    next: string,
    tone: bool.isRequired,
    amHoldingDice: bool.isRequired,
    areColorsSet: bool.isRequired,
    replace: func.isRequired
  }

  route = () => {
    const { next, depth, areColorsSet, replace } = this.props;
    if (next !== "colors" && !areColorsSet) {
      replace(["colors"], depth)
    }
  }

  componentDidMount = this.route;
  componentDidUpdate(prevProps) {
    if (prevProps.next !== this.props.next) this.route();
  }
  
  render() {
    const { depth, next, tone, amHoldingDice } = this.props;
    const isColors = next === "colors";
    return (
      <Container rx={{jovial: tone}}>
        <Cover rx={{show: amHoldingDice}}/>
        <Header hide={isColors} depth={depth}/>
        {isColors ? null : <DiceRoller/>}
        {isColors ? (
          <Colors depth={depth + 1}/>
        ) : (
          <Body>
            <Motifs />
            <Threads/>
            <Characters depth={depth}/>
          </Body>
        )}
      </Container>
    );
  }
}

export default Window;