import { connect } from 'react-redux'
import CharacterSheet from './CharacterSheet';
import { compose } from 'redux';
import withSizes from 'common/withSize';

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

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withSizes({1000: "small"})
)(CharacterSheet);