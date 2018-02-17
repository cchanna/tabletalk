import { connect } from 'react-redux'
import CharacterSheet from './CharacterSheet';

const mapStateToProps = ({monsterhearts}, {here, path}) => {
  const id = parseInt(here[2], 10);
  const { charactersById, definitions } = monsterhearts;
  const { playbooksByName } = definitions;
  const { mainCharacter } = charactersById[id];
  const { 
    eyes, look, origin, moves, playbook 
  } = mainCharacter;
  const playbookDefinition = playbooksByName[playbook];
  const { sexMove, advice } = playbookDefinition;
  return {
    id, path, here,
    eyes, look, origin,
    moves, playbook,
    sexMove, advice
  };
};

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterSheet);