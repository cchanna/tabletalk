import { connect } from 'react-redux'
import { compose } from 'redux';
import withSize from 'common/withSize';
import Stats from './Stats';
import { setStats } from './actionCreators';

const mapStateToProps = ({monsterhearts}, {here}) => {
  const id = parseInt(here[2]);
  const { charactersById, definitions } = monsterhearts;
  const { name, mainCharacter } = charactersById[id];
  const { hot, cold, volatile, dark, playbook } = mainCharacter;
  const { playbooksByName } = definitions;
  const { stats } = playbooksByName[playbook];
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