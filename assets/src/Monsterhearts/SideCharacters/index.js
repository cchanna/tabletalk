import { connect } from 'react-redux'
import SideCharacters from './SideCharacters';
import { compose } from 'redux';
import withSizes from 'common/withSize';

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

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withSizes({1000: "small"})
)(SideCharacters);