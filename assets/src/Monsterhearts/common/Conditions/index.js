import { connect } from 'react-redux'
import Conditions from './Conditions';

import { createCondition, deleteCondition } from './actionCreators';

const mapStateToProps = ({monsterhearts}, {id}) => {
  const { charactersById, me, playersById } = monsterhearts;
  const { conditions, mainCharacter } = charactersById[id];
  let readOnly = !playersById[me].isGM;
  if (readOnly && mainCharacter && me === mainCharacter.playerId) {
    readOnly = true;
  }
  return {id, conditions, readOnly};
};

const mapDispatchToProps = {createCondition, deleteCondition}

export default connect(mapStateToProps, mapDispatchToProps)(Conditions);