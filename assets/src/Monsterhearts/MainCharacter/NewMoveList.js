import React, { Component } from 'react'
import { string, number, func, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
import BaseMove from 'Monsterhearts/common/Move';
import MoveButton from './MoveButton';

rx`
@import '~Monsterhearts/styles';
@import '~Monsterhearts/colors';
@import '~Monsterhearts/fonts';
`

const Container = rx('div')`
  width: 100%;
  max-width: 600px;
`

const Move = rx('div')`
  position: relative;
  color: $foreground;
  padding-bottom: 1px;
`

class NewMovesList extends Component {
  static propTypes = {
    id: number.isRequired,
    moves: arrayOf(string).isRequired,
    onAdd: func.isRequired
  }

  handleClick = e => {
    const name = e.target.value;
    this.props.onAdd(name);
  }
  
  render() {
    const { id, moves } = this.props;

    return (
      <Container>
        {moves.map(name => 
          <Move key={name}>
            <BaseMove {...{id, name}}/>
            <MoveButton value={name} onClick={this.handleClick}>+</MoveButton>
          </Move>
        )}
      </Container>
    );
  }
}

export default NewMovesList;