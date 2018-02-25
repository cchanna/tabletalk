import { connect } from 'react-redux'
import SideCharacter from './SideCharacter';

import { forMonsterhearts, fromMonsterhearts } from '../../state';
const { editSideCharacter } = forMonsterhearts;

const mapStateToProps = (state, {id, depth, readOnly}) => {
  const { name, notes } = fromMonsterhearts.getCharacter(state, id);
  return {
    id, 
    depth, readOnly,
    name, notes
  };
};

const mapDispatchToProps = {editSideCharacter}

export default connect(mapStateToProps, mapDispatchToProps)(SideCharacter);