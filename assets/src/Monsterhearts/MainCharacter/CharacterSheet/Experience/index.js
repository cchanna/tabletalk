import { connect } from 'react-redux'
import Experience from './Experience';

import { incrementXP, decrementXP } from './actionCreators';

const mapStateToProps = ({monsterhearts}, {id}) => {
  const { charactersById, playersById, me } = monsterhearts;
  const { mainCharacter } = charactersById[id];
  const { experience, playerId } = mainCharacter;
  const readOnly = (playerId !== me) && !playersById[me].isGM;
  return {id, experience, readOnly};
};

const mapDispatchToProps = {incrementXP, decrementXP}

export default connect(mapStateToProps, mapDispatchToProps)(Experience);