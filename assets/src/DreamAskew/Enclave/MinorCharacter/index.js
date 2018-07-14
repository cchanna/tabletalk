import { connect } from 'react-redux'
import MinorCharacter from './MinorCharacter';
import { fromDreamAskew, forDreamAskew } from "state"

const {
  getMinorCharacter
} = fromDreamAskew;
const {
  setMinorCharacterName,
  setMinorCharacterNotes
} = forDreamAskew

const mapStateToProps = (state, {id}) => ({
  ...getMinorCharacter(state, id)
});

const mapDispatchToProps = {setMinorCharacterName, setMinorCharacterNotes}

export default connect(mapStateToProps, mapDispatchToProps)(MinorCharacter);