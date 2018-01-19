import { connect } from 'react-redux'
import Moves from './Moves';

import { createMove, deleteMove } from './actionCreators';

const mapStateToProps = ({monsterhearts}, {path, here, showBackButton}) => {
  const id = parseInt(here[2], 10);
  const { charactersById, definitions } = monsterhearts;
  const { mainCharacter } = charactersById[id];
  const { moves, playbook } = mainCharacter;
  const { playbooksByName } = definitions;
  const { moves: playbookMoves, startingMoves, startingMoveChoices } = playbooksByName[playbook];
  return {
    path, here, showBackButton,
    id, moves, playbookMoves, startingMoves, startingMoveChoices
  };
};

const mapDispatchToProps = {createMove, deleteMove}

export default connect(mapStateToProps, mapDispatchToProps)(Moves);