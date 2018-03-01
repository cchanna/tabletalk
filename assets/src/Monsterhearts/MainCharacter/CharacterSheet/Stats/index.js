import { connect } from 'react-redux'
import Stats from './Stats';

import { forMonsterhearts, fromMonsterhearts } from 'state';
const { createAdvancement } = forMonsterhearts;

const mapStateToProps = (state, {id}) => {
  const { hot, cold, volatile, dark, addingStat } = fromMonsterhearts.getCharacter(state, id).mainCharacter;
  return {
    id, hot, cold, volatile, dark, 
    addingStat: !!addingStat,
    readOnly: fromMonsterhearts.getReadOnly(state, id)
  };
};

const mapDispatchToProps = {createAdvancement}

export default connect(mapStateToProps, mapDispatchToProps)(Stats);