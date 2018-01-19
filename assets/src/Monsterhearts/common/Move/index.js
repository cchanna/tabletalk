import { connect } from 'react-redux'
import Move from './Move';

import { editMoveNotes } from './actionCreators';

const mapStateToProps = ({monsterhearts}, {id, name, disabled, showNotes}) => {
  const { definitions, charactersById, playersById, me } = monsterhearts;
  const { movesByName } = definitions;
  let text, notes = null;
  let def = movesByName[name];
  let readOnly = true;
  if (def) {
    text = def.text;
    if (def.notes) {
      const { mainCharacter } = charactersById[id];
      const { moveNotesByName, playerId } = mainCharacter;
      notes = moveNotesByName[name];
      readOnly = (playerId !== me) && !playersById[me].isGM;
    }
  }
  
  return {id, name, disabled, text, notes, readOnly, showNotes};
};

const mapDispatchToProps = {editMoveNotes}

export default connect(mapStateToProps, mapDispatchToProps)(Move);