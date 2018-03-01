import { connect } from 'react-redux'
import Backstory from './Backstory';
import { getPath } from 'Routing';
import { fromMonsterhearts } from 'state';

const mapStateToProps = (state, {id, depth}) => ({
  id, 
  depth, 
  next: getPath(state, depth).next,
  backstory: fromMonsterhearts.getCharacterPlaybookDefinition(state, id).backstory
});

export default connect(mapStateToProps)(Backstory);