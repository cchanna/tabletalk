import React, { Component } from 'react'
import { string, number, bool, func } from 'prop-types'
import rx from 'resplendence'
  
import BaseMove from 'Monsterhearts/common/Move';
import Button from './MoveButton';

rx`
@import '~Monsterhearts/styles';
@import '~Monsterhearts/colors';
@import '~Monsterhearts/fonts';
`

const Container = rx('div')`
  position: relative;
  transition: 150ms color;
  color: $foreground;
  &.disabled {
    color: darken($foreground, 50%);
  }
  &.selected {
    color: $accent;
  }

`

class Move extends Component {
  static propTypes = {
    name: string.isRequired,
    disabled: bool.isRequired,
    selected: bool.isRequired,
    add: func.isRequired,
    remove: func.isRequired
  }

  handleClick = () => {
    const { name, selected, disabled, add, remove } = this.props;
    if (!disabled) {
      if (selected) remove(name);
      else {
        add(name);
      }
    }
  }
  
  render() {
    const { selected, name, disabled } = this.props;
    return (
      <Container rx={{selected, disabled}}>
        <BaseMove name={name} disabled={!selected} showNotes={selected}/> 
        <Button onClick={this.handleClick} disabled={disabled}>{selected ? "X" : "+"}</Button>
      </Container>
    );
  }
}

export default Move;