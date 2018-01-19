import { connect } from 'react-redux'
import CharacterSheet from './CharacterSheet';

const mapStateToProps = ({monsterhearts}, {here, path}) => {
  const id = parseInt(here[2], 10);
  const { charactersById, definitions } = monsterhearts;
  const { playbooksByName } = definitions;
  const { mainCharacter, ...character } = charactersById[id]; 
  const playbookDefinition = playbooksByName[mainCharacter.playbook];
  return {
    id, path, here,
    ...character,
    ...mainCharacter,
    playbookDefinition
  };
};

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterSheet);