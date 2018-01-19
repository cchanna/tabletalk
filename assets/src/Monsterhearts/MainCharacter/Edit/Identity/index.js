import { connect } from 'react-redux'
import Identity from './Identity';

import { setName, setLook, setEyes, setOrigin } from './actionCreators';

const mapStateToProps = ({monsterhearts}, {here}) => {
  const id = parseInt(here[2]);
  const { charactersById, definitions } = monsterhearts;
  const { name, mainCharacter } = charactersById[id];
  const { look, eyes, origin, playbook } = mainCharacter;
  const { playbooksByName } = definitions;
  const { names, looks, eyesList, origins } = playbooksByName[playbook];
  return {
    id,
    name, look, eyes, origin,
    names, looks, eyesList, origins
  };
};

const mapDispatchToProps = {setName, setLook, setEyes, setOrigin};

export default connect(mapStateToProps, mapDispatchToProps)(Identity);