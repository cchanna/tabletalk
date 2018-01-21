import { connect } from 'react-redux'
import Add from './Add';

import { createMove } from '../actionCreators';
import { goBack } from 'Routing/actionCreators'; 

const mapStateToProps = ({monsterhearts}, {path, here, showBackButton}) => {
  const id = parseInt(here[2], 10);
  const { charactersById, definitions } = monsterhearts;
  const { mainCharacter } = charactersById[id];
  const { moves } = mainCharacter;
  const { playbooksByName, playbooks } = definitions;
  return {
    here, path, showBackButton,
    id, moves, playbooksByName, playbooks,
  };
};

const mapDispatchToProps = {createMove, goBack}

export default connect(mapStateToProps, mapDispatchToProps)(Add);