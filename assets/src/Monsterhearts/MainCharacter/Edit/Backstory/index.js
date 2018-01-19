import { connect } from 'react-redux'
import Backstory from './Backstory';

const mapStateToProps = ({monsterhearts}, {path, here}) => {
  const id = parseInt(here[2]);
  const { definitions, charactersById } = monsterhearts;
  const { mainCharacter } = charactersById[id];
  const { playbook } = mainCharacter;
  const { playbooksByName } = definitions;
  const { backstory } = playbooksByName[playbook];
  return {
    id, path, here, backstory
  };
};
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Backstory);