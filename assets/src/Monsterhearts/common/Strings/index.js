import { connect } from 'react-redux'
import Strings from './Strings';

import { forMonsterhearts, fromMonsterhearts } from '../../state';
const { spendString, deleteString, addString, createString } = forMonsterhearts;

const mapStateToProps = (state, {id, depth, sideCharacter = false}) => {
  return {
    sideCharacter,
    id, 
    depth, 
    slowActionsById: fromMonsterhearts.getSlowActionsById(state),
    readOnly: fromMonsterhearts.getReadOnly(state, id),
    strings: fromMonsterhearts.getCharacterStrings(state, id), 
  };
};

const mapDispatchToProps = {addString, createString, spendString, deleteString};

export default connect(mapStateToProps, mapDispatchToProps)(Strings);