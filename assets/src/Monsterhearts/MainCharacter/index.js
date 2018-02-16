import { connect } from 'react-redux'
import { compose } from 'redux'
import withSize from 'common/withSize';
import MainCharacter from './MainCharacter';

import isEditDone from './editDone';

import { replace, goBack } from 'Routing/actionCreators';
import { getPath } from 'Routing/selectors';

const mapStateToProps = (state, {depth}) => {
  const { path, here } = getPath(state, depth);
  const { monsterhearts } = state;
  const { charactersById, playersById, me } = monsterhearts;
  const id = parseInt(here[2], 10);
  const character = charactersById[id];
  let name = null;
  let playbook = null;
  let readOnly = true;
  let editDone = true;
  if (character) {
    name = character.name;
    const { mainCharacter } = character;
    if (mainCharacter) {
      playbook = mainCharacter.playbook;
      const { playerId } = mainCharacter;
      readOnly = (playerId !== me) && !playersById[me].isGM;
    }
    editDone = isEditDone(id, {monsterhearts}).allDone;
  }
  return {
    path, here, editDone,
    id, name, playbook,
    readOnly
  };
};

const mapDispatchToProps = {replace, goBack};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withSize({425: "mobile", 768: "tablet", 1024: "laptop"})
)(MainCharacter);