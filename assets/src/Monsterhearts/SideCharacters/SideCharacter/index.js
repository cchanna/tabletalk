import { connect } from 'react-redux'
import SideCharacter from './SideCharacter';

import { editSideCharacter } from './actionCreators';

const mapStateToProps = ({monsterhearts}, {id, path, here, readOnly}) => {
  const { charactersById } = monsterhearts;
  const { name, notes } = charactersById[id];
  return {
    id, path, here, readOnly,
    name, notes
  };
};

const mapDispatchToProps = {editSideCharacter}

export default connect(mapStateToProps, mapDispatchToProps)(SideCharacter);