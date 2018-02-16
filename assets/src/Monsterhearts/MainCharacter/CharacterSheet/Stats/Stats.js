import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'

import bonusString from 'common/bonusString';

rx`
@import '~Monsterhearts/styles';
@import '~Monsterhearts/colors';
@import '~Monsterhearts/fonts';
`

const Container = rx('div')`
  display: flex;
  flex-flow: row wrap;
`
const Button = rx('button')`
  @include button;
  font-family: $header;
  color: $foreground;
  transition-property: color, background;
  transition-duration: 150ms;
  border-radius: 5px;
  padding: 0 5px;
  &:not(:last-child) {
    margin-right: 20px;
  }
  &:not(:disabled) {
    background: $accent;
    &:hover, &:focus {
      background: lighten($accent, 10%);
    }
    &:active {
      background: darken($accent, 30%);
    }
  }
`


class Stats extends Component {
  static propTypes = {
    id: number.isRequired,
    hot: number,
    cold: number,
    volatile: number,
    dark: number,
    readOnly: bool.isRequired,
    addingStat: bool.isRequired,
    createAdvancement: func.isRequired
  }

  handleClick = e => {
    const stat = e.target.name;
    const { id, createAdvancement } = this.props;
    createAdvancement({id, advancementId: "+stat", stat});
  }
  
  render() {
    const {  readOnly, addingStat } = this.props;
    return (
      <Container>
        {["Hot", "Cold", "Volatile", "Dark"].map(name =>
          <Button 
            key={name}
            onClick={this.handleClick}
            disabled={readOnly || !addingStat}
            name={name.toLowerCase()}
          >
            {name}
            {bonusString(this.props[name.toLowerCase()])}
          </Button>
        )}
      </Container>
    );
  }
}

export default Stats;