import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
import movesInstructions from 'Monsterhearts/movesInstructions';
import ToggleMove from './ToggleMove';
  
rx`
@import '~Monsterhearts/styles';
@import '~Monsterhearts/colors';
@import '~Monsterhearts/fonts';
`

const Container = rx('div')`
  color: white;
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  * {
    flex: 0 0 auto;
  }
  padding-left: 30px;
`

const Instructions = rx('div')`
  width: 100%;
  font-family: $body;
  font-style: italic;
  font-size: 20px;
  max-width: 600px;
  color: darken($foreground, 10%);
  margin-bottom: 20px;
`
class SelectMovesList extends Component {
  static propTypes = {
    requiredMoves: arrayOf(string).isRequired,
    availableChoices: number.isRequired,
    availableMoves: arrayOf(string).isRequired,
    selectedMoves: arrayOf(string).isRequired,
    add: func.isRequired,
    remove: func.isRequired
  }
  static defaultProps = {
    requiredMoves: []
  }
  
  render() {
    const { requiredMoves, availableChoices, availableMoves, selectedMoves, add, remove } = this.props;
    return (
      <Container>
        <Instructions>{movesInstructions(requiredMoves, availableChoices)}</Instructions>
        {availableMoves.map(name => {
          const selected = selectedMoves.includes(name);
          const disabled = (
            (requiredMoves.includes(name) && selected) || (
              !selected &&
              selectedMoves.length >= requiredMoves.length + availableChoices
            ) 
          )
          return (
            <ToggleMove
              key={name}
              {...{add, remove, name, selected, disabled}}/>
          )
        })}
      </Container>
    );
  }
}

export default SelectMovesList;