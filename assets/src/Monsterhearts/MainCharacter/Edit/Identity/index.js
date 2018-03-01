import { connect } from 'react-redux'
import Identity from './Identity';

import { forMonsterhearts, fromMonsterhearts } from 'state';
const { setName, setLook, setEyes, setOrigin } = forMonsterhearts;

const mapStateToProps = (state, {id}) => {
  const { name, mainCharacter } = fromMonsterhearts.getCharacter(state, id);
  const { look, eyes, origin, playbook } = mainCharacter;
  const { names, looks, eyesList, origins } = fromMonsterhearts.getPlaybookDefinition(state, playbook);
  return {
    id,
    name, look, eyes, origin,
    names, looks, eyesList, origins
  };
};

const mapDispatchToProps = {setName, setLook, setEyes, setOrigin};

export default connect(mapStateToProps, mapDispatchToProps)(Identity);