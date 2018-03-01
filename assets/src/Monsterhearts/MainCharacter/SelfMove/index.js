import { connect } from 'react-redux'
import SelfMove from './SelfMove';

import { goBack } from 'Routing';
import { fromMonsterhearts, forMonsterhearts } from 'state';
const { createAdvancement } = forMonsterhearts;

const mapStateToProps = (state, {id}) => {
  return {
    id,
    moves: fromMonsterhearts.getUnchosenSelfMoves(state, id)
  };
};

const mapDispatchToProps = {createAdvancement, goBack};

export default connect(mapStateToProps, mapDispatchToProps)(SelfMove);