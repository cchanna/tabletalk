import { connect } from 'react-redux'
import AddMove from './AddMove';

import { createMove, createAdvancement } from '../actionCreators';
import { goBack } from 'Routing/actionCreators'; 

const mapStateToProps = ({monsterhearts}, {path, here, showBackButton = true, advancement = false}) => {
  const id = parseInt(here[2], 10);
  const { charactersById, definitions } = monsterhearts;
  const { mainCharacter } = charactersById[id];
  const { moves } = mainCharacter;
  const { playbooksByName, playbooks } = definitions;
  return {
    here, path, showBackButton, advancement,
    id, moves, playbooksByName, playbooks,
  };
};

const mapDispatchToProps = {createMove, createAdvancement, goBack}

export default connect(mapStateToProps, mapDispatchToProps)(AddMove);