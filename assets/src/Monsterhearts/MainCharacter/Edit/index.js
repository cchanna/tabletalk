import { connect } from 'react-redux'
import Edit from './Edit';
import { compose } from 'redux';

import { goBack, replace } from 'Routing/actionCreators';
import editDone from '../editDone';

const mapStateToProps = (state, {here}) => {
  const id = parseInt(here[2], 10);
  const { monsterhearts } = state;
  const { charactersById, playersById, me } = monsterhearts;
  const { mainCharacter } = charactersById[id];
  const { playerId } = mainCharacter;
  const readOnly = (playerId !== me) && !playersById[me].isGM;
  return {
    ...editDone(id, state),
    readOnly
  }
};

const mapDispatchToProps = {goBack, replace}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Edit);