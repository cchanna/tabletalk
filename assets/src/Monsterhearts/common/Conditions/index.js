import { connect } from 'react-redux'
import Conditions from './Conditions';

import { forMonsterhearts, fromMonsterhearts } from 'state';
const { createCondition, deleteCondition } = forMonsterhearts

const mapStateToProps = (state, {id}) => ({
  id, 
  conditions: fromMonsterhearts.getCharacter(state, id).conditions, 
  readOnly: fromMonsterhearts.getReadOnly(state, id)
});

const mapDispatchToProps = {createCondition, deleteCondition}

export default connect(mapStateToProps, mapDispatchToProps)(Conditions);