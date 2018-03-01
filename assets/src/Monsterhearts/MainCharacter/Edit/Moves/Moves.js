import React, { Component } from 'react'
import { string, number, bool, func, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
import DeleteableMove from './DeleteableMove';
import { Link } from 'Routing';
import AddMove from '../../AddMove';
import SelectMovesList from '../../SelectMovesList';

rx`
@import '~common/styles';
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

const NewMove = rx(Link)`
  @include link;
  font-family: $interact;
  color: darken($foreground, 20%);
  transition: 150ms color;
  font-size: 25px;
  margin: 20px 0;
  &:hover, &:focus {
    color: $accent;
  }
`

class Moves extends Component {
  static propTypes = {
    id: number.isRequired, 
    moves: arrayOf(string).isRequired, 
    movesByName: object, 
    playbookMoves: arrayOf(string).isRequired, 
    startingMoves: arrayOf(string).isRequired,
    startingMoveChoices: number.isRequired,
    createMove: func.isRequired,
    deleteMove: func.isRequired,
    goBack: func.isRequired,
    depth: number.isRequired,
    next: string,
  }

  constructor(props) {
    super(props)
    const { moves, startingMoves, startingMoveChoices } = this.props;
    this.state = {
      initial: (moves.length < startingMoves.length + startingMoveChoices)
    }
  }

  handleAddAndGoBack = name => {
    this.handleAdd(name);
    this.props.goBack();
  }

  handleAdd = name => {
    const { id, createMove } = this.props;
    createMove({name, id});
  }

  handleRemove = name => {
    const { id, deleteMove } = this.props;
    deleteMove({name, id});
  }
  
  render() {
    const { id, moves, playbookMoves, startingMoves, startingMoveChoices, deleteMove, depth, next } = this.props;
    const { initial } = this.state;
    if (initial) {
      return (
        <Container>
          <SelectMovesList 
            requiredMoves={startingMoves} 
            availableChoices={startingMoveChoices}
            availableMoves={playbookMoves}
            selectedMoves={moves}
            add={this.handleAdd}
            remove={this.handleRemove}/>
        </Container>
      )
    }
    else {
      if (next) {
        return (
          <Container>
            <AddMove id={id} onAdd={this.handleAddAndGoBack}/>
          </Container>
        ) 
        
      }
      else {
        const content = moves
          .map(name => (
            <DeleteableMove
              {...{deleteMove, name, id}}
              key={name}/>
          ));
        return (
          <Container>
            {content}
            <NewMove to="add" depth={depth}>New Move</NewMove>
          </Container>
        )
      }
    }
  }
}

export default Moves;