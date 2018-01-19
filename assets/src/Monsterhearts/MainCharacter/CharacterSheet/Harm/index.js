import { connect } from 'react-redux'
import Harm from './Harm';

import { incrementHarm, decrementHarm } from './actionCreators';

const mapStateToProps = ({monsterhearts}, {id}) => {
  const { charactersById, playersById, me } = monsterhearts;
  const { mainCharacter } = charactersById[id];
  const { harm, playerId } = mainCharacter;
  
  const readOnly = (playerId !== me) && !playersById[me].isGM;
  return {
    id, harm, readOnly
  };
};

const mapDispatchToProps = {incrementHarm, decrementHarm}

export default connect(mapStateToProps, mapDispatchToProps)(Harm);