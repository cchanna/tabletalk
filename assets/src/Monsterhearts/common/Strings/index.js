import { connect } from 'react-redux'
import Strings from './Strings';

import { spendString, deleteString } from './actionCreators';
import { addString, createString } from '../actionCreators';

const mapStateToProps = ({monsterhearts}, {id, path, here}) => {
  const { charactersById, stringsById, strings, socket, me, playersById } = monsterhearts;
  const { slowActionsById } = socket;
  const stringsTo = strings
    .filter(string => stringsById[string].from === id);
  const stringsFrom = strings
    .filter(string => stringsById[string].to === id);
  const { mainCharacter } = charactersById[id];
  let readOnly = !playersById[me].isGM;
  if (readOnly && mainCharacter && mainCharacter.playerId === me) {
    readOnly = false;
  }
  return {
    path, here, slowActionsById,
    id, stringsTo, stringsFrom, stringsById, charactersById,
    readOnly
  };
};

const mapDispatchToProps = {addString, createString, spendString, deleteString};

export default connect(mapStateToProps, mapDispatchToProps)(Strings);