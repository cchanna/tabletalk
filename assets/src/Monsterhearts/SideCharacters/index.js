import { connect } from 'react-redux'
import SideCharacters from './SideCharacters';

import { getPath } from 'Routing/selectors';

const mapStateToProps = (state, {depth}) => {
  const { path, here } = getPath(state, depth);
  const { monsterhearts } = state;
  const { charactersById, characters, playersById, me } = monsterhearts;
  const sideCharacters = characters
    .filter(id => !charactersById[id].mainCharacter);

  const readOnly = !playersById[me].isGM
  return {
    sideCharacters, readOnly,
    path, here
  };
};

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(SideCharacters);