import { connect } from 'react-redux'
import NewCharacter from './NewCharacter';
import { compose } from 'redux';

import withSize from 'common/withSize';

import { createCharacter } from './actionCreators';
import { goTo } from 'Routing/actionCreators';

import { getPath } from 'Routing/selectors';
import { getPlaybooks, getMyCharacters } from 'Monsterhearts/selectors';

const mapStateToProps = (state, {depth}) => {
  const { here, next } = getPath(state, depth);
  const playbooks = getPlaybooks(state);
  const myCharacters = getMyCharacters(state);
  return { 
    here, playbooks, myCharacters,
    playbook: !next ? null : (next[0].toUpperCase() + next.slice(1))
  };
};

const mapDispatchToProps = {createCharacter, goTo}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withSize({425: "mobile", 768: "tablet", 1024: "laptop", 1440: "large", 1920: "big"})
)(NewCharacter);