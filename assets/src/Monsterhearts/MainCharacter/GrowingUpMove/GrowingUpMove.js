import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
import SelectMovesList from '../SelectMovesList';

rx`
@import '~Monsterhearts/styles';
@import '~Monsterhearts/colors';
@import '~Monsterhearts/fonts';
`

const Container = rx('div')`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`
const DoneButton = rx('button')`
  @include button-style;
  position: absolute;
  right: 30px;
  top: 25px;
  z-index: 2;
  &.under-tablet {
    font-size: 14px;
    top: 10px;
    right: 15px;
  }
`

class GrowingUpMove extends Component {
  static propTypes = {
    id: number.isRequired,
    alreadyHas: arrayOf(string).isRequired,
    moves: arrayOf(string).isRequired,
    createAdvancement: func.isRequired,
    goBack: func.isRequired
  }

  state = {
    selectedMoves: []
  }

  handleAdd = move => {
    this.setState(state => {
      if (state.selectedMoves.includes(move)) return state;
      return {
        selectedMoves: [...state.selectedMoves, move]
      }
    });
  }

  handleRemove = move => {
    this.setState(({selectedMoves}) => ({
      selectedMoves: selectedMoves.filter(name => name !== move)
    }));
  }

  handleDone = () => {
    const { id, createAdvancement, goBack } = this.props;
    createAdvancement({id, advancementId: "grow", moves: this.state.selectedMoves});
    goBack();
  }
  
  render() {
    const { id, moves, alreadyHas } = this.props;
    const { selectedMoves } = this.state;
    return (
      <Container>
        <DoneButton 
          disabled={selectedMoves.length !== moves.length && selectedMoves.length < 2} 
          onClick={this.handleDone}>
          Done
        </DoneButton>
        <SelectMovesList 
          availableChoices={2}
          availableMoves={moves}
          selectedMoves={selectedMoves}
          add={this.handleAdd}
          remove={this.handleRemove}/>
      </Container>
    );
  }
}

export default GrowingUpMove;