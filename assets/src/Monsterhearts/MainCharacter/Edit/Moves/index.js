import { connect } from 'react-redux'
import Moves from './Moves';

import { goBack, getPath } from 'Routing';
import { forMonsterhearts, fromMonsterhearts } from '../../../state';
const { createMove, deleteMove } = forMonsterhearts;

const mapStateToProps = (state, {depth, id, showBackButton}) => {
  const { moves, playbook } = fromMonsterhearts.getCharacter(state, id).mainCharacter;
  const { 
    moves: playbookMoves, startingMoves, startingMoveChoices 
  } = fromMonsterhearts.getPlaybookDefinition(state, playbook);
  return {
    depth,
    id, moves, playbookMoves, startingMoves, startingMoveChoices,
    showBackButton,
    next: getPath(state, depth).next
  };
};

const mapDispatchToProps = {goBack, createMove, deleteMove}

export default connect(mapStateToProps, mapDispatchToProps)(Moves);