import { connect } from 'react-redux'
import AddMove from './AddMove';

import { fromMonsterhearts } from '../../state';

const mapStateToProps = (state, {id, onAdd}) => ({
  id, onAdd,
  playbooks: fromMonsterhearts.getUnchosenPlaybookMoves(state, id)
});

export default connect(mapStateToProps)(AddMove);