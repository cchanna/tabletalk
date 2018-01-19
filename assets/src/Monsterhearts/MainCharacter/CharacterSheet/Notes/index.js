import { connect } from 'react-redux'
import Notes from './Notes';

import { setNotes } from './actionCreators';

const mapStateToProps = ({monsterhearts}, {id}) => {
  const { charactersById, playersById, me } = monsterhearts;
  const { notes, mainCharacter } = charactersById[id];
  let readOnly = false;
  if (mainCharacter) {
    const { playerId } = mainCharacter;
    readOnly = (playerId !== me) && !playersById[me].isGM;
  }
  return {notes, readOnly};
};

const mapDispatchToProps = {setNotes}

export default connect(mapStateToProps, mapDispatchToProps)(Notes);