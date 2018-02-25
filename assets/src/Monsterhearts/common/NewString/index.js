import { connect } from 'react-redux'
import NewString from './NewString';

import { goBack } from 'Routing';
import { forMonsterhearts, fromMonsterhearts } from '../../state';
const { createString } = forMonsterhearts;


const mapStateToProps = (state, {id}) => {
  return {
    id, 
    characters: fromMonsterhearts.getUnattachedCharacters(state, id), 
    slowActionsById: fromMonsterhearts.getSlowActionsById(state)
  };
};

const mapDispatchToProps = {createString, goBack};

export default connect(mapStateToProps, mapDispatchToProps)(NewString);