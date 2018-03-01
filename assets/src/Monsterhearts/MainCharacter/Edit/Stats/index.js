import { connect } from 'react-redux'
import { compose } from 'redux';
import withSize from 'common/withSize';
import Stats from './Stats';

import { forMonsterhearts, fromMonsterhearts } from 'state';
const { setStats } = forMonsterhearts;

const mapStateToProps = (state, {id}) => {
  const { 
    hot, cold, volatile, dark, playbook } = fromMonsterhearts.getCharacter(state, id).mainCharacter;
  const { stats } = fromMonsterhearts.getPlaybookDefinition(state, playbook);
  return {
    id,
    hot, cold, volatile, dark,
    stats
  };
};
const mapDispatchToProps = {setStats}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withSize({600: "mobile", 768: "tablet"})
)(Stats);