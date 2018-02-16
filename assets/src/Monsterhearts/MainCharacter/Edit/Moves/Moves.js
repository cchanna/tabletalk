import React, { Component } from 'react'
import { string, number, bool, func, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
import ToggleMove from './ToggleMove';
import DeleteableMove from './DeleteableMove';
import movesInstructions from 'Monsterhearts/movesInstructions';
import Link from 'Routing/Link';
import AddMove from '../../AddMove';

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

const Instructions = rx('div')`
  width: 100%;
  font-family: $body;
  font-style: italic;
  font-size: 20px;
  max-width: 600px;
  color: darken($foreground, 10%);
  margin-bottom: 20px;
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
    path: arrayOf(string).isRequired,
    here: arrayOf(string).isRequired
  }

  constructor(props) {
    super(props)
    const { moves, startingMoves, startingMoveChoices } = this.props;
    this.state = {
      initial: (moves.length < startingMoves.length + startingMoveChoices)
    }
  }

  handleAdd = name => {
    const { id, createMove, goBack } = this.props;
    createMove({name, id});
    goBack();
  }
  
  render() {
    const { id, moves, playbookMoves, startingMoves, startingMoveChoices, createMove, deleteMove, path, here } = this.props;
    const { initial } = this.state;
    if (initial) {
      const content = playbookMoves
        .map(name => {
          const selected = moves.includes(name);
          const disabled = (
            (startingMoves.includes(name) && selected) || (
              !selected &&
              moves.length >= startingMoves.length + startingMoveChoices
            ) 
          )
          return (
            <ToggleMove
              key={name}
              characterId={id}
              {...{id, createMove, deleteMove, name, selected, disabled}}/>
          )
        })
        return (
          <Container>
            <Instructions>{movesInstructions(startingMoves, startingMoveChoices)}</Instructions>
            {content}
          </Container>
        );
      }
    else {
      if (path.length > 0) {
        return (
          <Container>
            <AddMove id={id} onAdd={this.handleAdd}/>
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
            <NewMove to={[...here, "add"]}>New Move</NewMove>
          </Container>
        )
      }
    }
  }
}

export default Moves;