import { connect } from 'react-redux'
import NewCharacter from './NewCharacter';
import { compose } from 'redux';

import withSize from 'common/withSize';

import { createCharacter } from './actionCreators';
import { goTo } from 'Routing/actionCreators';

const mapStateToProps = ({monsterhearts}, {path, here}) => {
  const { definitions, characters, charactersById, me } = monsterhearts;
  const { playbooks, playbooksByName, movesByName, advancementsById } = definitions;
  const myCharacters = characters
    .filter(id => charactersById[id].mainCharacter && charactersById[id].mainCharacter.playerId === me)
  return { 
    path, here,
    playbooks, playbooksByName, movesByName, advancementsById,
    myCharacters 
  };
};

const mapDispatchToProps = {createCharacter, goTo}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withSize({425: "mobile", 768: "tablet", 1024: "laptop", 1440: "large", 1920: "big"})
)(NewCharacter);