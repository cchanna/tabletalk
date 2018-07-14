import { connect } from 'react-redux'
import Character from './Character';

import { fromDreamAskew, forDreamAskew } from "state";

const { 
  getCharacterSheet
} = fromDreamAskew;
const { setCharacterNotes } = forDreamAskew;

const mapStateToProps = (state, {id}) => getCharacterSheet(state, id);

const mapDispatchToProps = { setNotes: setCharacterNotes }

export default connect(mapStateToProps, mapDispatchToProps)(Character);