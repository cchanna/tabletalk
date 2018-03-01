import { connect } from 'react-redux'
import Notes from './Notes';

import { forMonsterhearts, fromMonsterhearts } from 'state';
const { setNotes } = forMonsterhearts;

const mapStateToProps = (state, {id}) => ({
  notes: fromMonsterhearts.getCharacter(state, id).notes, 
  readOnly: fromMonsterhearts.getReadOnly(state, id)
});

const mapDispatchToProps = {setNotes}

export default connect(mapStateToProps, mapDispatchToProps)(Notes);