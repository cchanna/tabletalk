import { connect } from 'react-redux'
import Move from './Move';
import { forMonsterhearts, fromMonsterhearts } from '../../state';

const { editMoveNotes } = forMonsterhearts;

const mapStateToProps = (state, {id, name, disabled, showNotes}) => ({  
  id, 
  name, 
  disabled, 
  showNotes,
  readOnly: fromMonsterhearts.getReadOnly(state, id),
  ...fromMonsterhearts.getMove(state, name, id),
});

const mapDispatchToProps = {editMoveNotes}

export default connect(mapStateToProps, mapDispatchToProps)(Move);