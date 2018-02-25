import { connect } from 'react-redux'
import Skin from './Skin';

import { fromMonsterhearts } from '../../state';
const { getPlaybookDefinition, getPlaybookAdvancements, getPlaybookMoves } = fromMonsterhearts;

const mapStateToProps = (state, {playbook, sizes}) => {
  const def = getPlaybookDefinition(state, playbook);
  const advancements = getPlaybookAdvancements(state, playbook)
    .map(advancement => advancement.text);
  const moves = getPlaybookMoves(state, playbook);
  return {
    ...def,
    moves,
    advancements,
    sizes,
    name: playbook,
  };
};

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Skin);