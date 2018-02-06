import { connect } from 'react-redux'
import Stats from './Stats';

import { createAdvancement } from '../../actionCreators';

const mapStateToProps = ({monsterhearts}, {id}) => {
  const { charactersById, playersById, me } = monsterhearts;
  const { mainCharacter } = charactersById[id];
  const { 
    hot, cold, volatile, dark, playerId, addingStat
  } = mainCharacter;
  const readOnly = (playerId != me) && !playersById[me].isGM;
  return {
    id, hot, cold, volatile, dark, readOnly, addingStat
  };
};

const mapDispatchToProps = {createAdvancement}

export default connect(mapStateToProps, mapDispatchToProps)(Stats);