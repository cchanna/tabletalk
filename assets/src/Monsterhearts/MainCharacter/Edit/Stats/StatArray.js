import React, { Component } from 'react'
import { string, number, bool, func, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
rx`
@import '~common/styles';
@import '~Monsterhearts/colors';
@import '~Monsterhearts/fonts';
`

const Container = rx('button')`
  @include button;
  font-family: $interact;
  color: darken($foreground, 20%);
  padding: .3em 0 0 0;
  transition-property: padding, color;
  transition-duration: 150ms;
  font-size: inherit;
  &:hover, &:focus {
    padding: .6em 0 .3em 0;
  }
  &:hover, &:focus {
    color: $foreground;
  }
  &:disabled {
    color: $accent;
  }
  &.under-tablet {
    flex-flow: column nowrap;
    align-items: center;
  }
  &:not(.under-tablet) {
    :not(:first-child) {
      margin-left: .6em;
    }
  }
`
const Item = rx('span')`
`

const bonusString = bonus => {
  if (bonus >= 0) return "+ " + bonus;
  else return "− " + (-bonus);
}

class StatArray extends Component {
  static propTypes = {
    stats: arrayOf(number).isRequired,
    disabled: bool.isRequired,
    sizes: arrayOf(string).isRequired,
    onClick: func.isRequired
  }

  handleClick = () => {
    const { stats, onClick } = this.props;
    onClick(stats);
  }
  
  render() {
    const {stats, disabled, sizes} = this.props;
    return (
      <Container disabled={disabled} onClick={this.handleClick} rx={sizes}>
        <Item>Hot {bonusString(stats[0])}</Item>
        <Item>Cold {bonusString(stats[1])}</Item>
        <Item>Volatile {bonusString(stats[2])}</Item>
        <Item>Dark {bonusString(stats[3])}</Item>
      </Container>
    );
  }
}

export default StatArray;