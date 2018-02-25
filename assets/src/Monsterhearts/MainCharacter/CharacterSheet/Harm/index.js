import { connect } from 'react-redux'
import Harm from './Harm';

import { forMonsterhearts, fromMonsterhearts } from '../../../state';
const { incrementHarm, decrementHarm } = forMonsterhearts;

const mapStateToProps = (state, {id}) => ({
  id, 
  harm: fromMonsterhearts.getCharacter(state, id).mainCharacter.harm, 
  readOnly: fromMonsterhearts.getReadOnly(state, id)
});

const mapDispatchToProps = {incrementHarm, decrementHarm}

export default connect(mapStateToProps, mapDispatchToProps)(Harm);