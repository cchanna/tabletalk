import { connect } from 'react-redux'
import CharacterLink from './CharacterLink';

import { fromSwords } from 'state';

const { 
  getOvertone,
  getDiceTone,
  getCharacterName
} = fromSwords;

const mapStateToProps = (state, {id, depth}) => ({
  id, depth,
  tone: getDiceTone(state),
  name: getCharacterName(state, id),
  overtone: getOvertone(state)
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterLink);