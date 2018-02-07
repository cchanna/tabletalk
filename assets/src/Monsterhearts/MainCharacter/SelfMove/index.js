import { connect } from 'react-redux'
import SelfMove from './SelfMove';

import { createAdvancement } from '../actionCreators';
import { goBack } from 'Routing/actionCreators';

const mapStateToProps = ({monsterhearts}, {id}) => {
  const { definitions, charactersById } = monsterhearts;
  const { mainCharacter } = charactersById[id];
  const { playbook, moves } = mainCharacter;
  const { playbooksByName } = definitions;
  const { moves: playbookMoves } = playbooksByName[playbook];
  return {
    id,
    moves: playbookMoves.filter(name => !moves.includes(name))
  };
};

const mapDispatchToProps = {createAdvancement, goBack};

export default connect(mapStateToProps, mapDispatchToProps)(SelfMove);