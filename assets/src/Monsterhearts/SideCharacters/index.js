import { connect } from 'react-redux'
import SideCharacters from './SideCharacters';

const mapStateToProps = ({monsterhearts}, {path, here}) => {
  const { charactersById, characters, playersById, me } = monsterhearts;
  const sideCharacters = characters
    .filter(id => !charactersById[id].mainCharacter);

  const readOnly = !playersById[me].isGM
  return {
    sideCharacters, readOnly,
    path, here
  };
};

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(SideCharacters);