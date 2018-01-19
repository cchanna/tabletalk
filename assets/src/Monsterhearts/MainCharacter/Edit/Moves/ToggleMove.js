import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
import BaseMove from 'Monsterhearts/common/Move';
import Button from './Button';

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
    id: number.isRequired,
    name: string.isRequired,
    disabled: bool.isRequired,
    selected: bool.isRequired,
    createMove: func.isRequired,
    deleteMove: func.isRequired
  }

  handleClick = () => {
    const { id, name, selected, disabled, createMove, deleteMove } = this.props;
    if (!disabled) {
      if (selected) deleteMove({id, name});
      else {
        createMove({id, name});
      }
    }
  }
  
  render() {
    const { id, selected, name, disabled } = this.props;
    return (
      <Container rx={{selected, disabled}}>
        <BaseMove id={id} name={name} disabled={!selected} showNotes={selected}/> 
        <Button onClick={this.handleClick} disabled={disabled}>{selected ? "X" : "+"}</Button>
      </Container>
    );
  }
}

export default Move;