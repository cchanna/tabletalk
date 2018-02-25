import { connect } from 'react-redux'
import { compose } from 'redux'
import withSize from 'common/withSize';
import MainCharacter from './MainCharacter';

import { replace, goBack, getPath } from 'Routing';
import { fromMonsterhearts } from '../state';

const mapStateToProps = (state, {depth}) => {
  const { path, here } = getPath(state, depth);
  const id = parseInt(here[2], 10);
  const character = fromMonsterhearts.getCharacter(state, id);
  let name = null;
  let playbook = null;
  let editDone = true;
  if (character) {
    name = character.name;
    const { mainCharacter } = character;
    if (mainCharacter) {
      playbook = mainCharacter.playbook;
    }
    editDone = fromMonsterhearts.getEditDone(state, id).allDone;
  }
  return {
    path, depth, editDone,
    id, name, playbook,
    readOnly: fromMonsterhearts.getReadOnly(state, id)
  };
};

const mapDispatchToProps = {replace, goBack};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withSize({425: "mobile", 768: "tablet", 1024: "laptop"})
)(MainCharacter);