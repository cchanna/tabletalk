import { connect } from 'react-redux'
import CharacterLink from './CharacterLink';

import { fromSwords } from 'state';

const { 
  getTone,
  getCharacterName
} = fromSwords;

const mapStateToProps = (state, {id, depth}) => ({
  id, depth,
  tone: getTone(state, id),
  name: getCharacterName(state, id),
  overtone: getTone(state)
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterLink);