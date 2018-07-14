import { connect } from 'react-redux'
import Enclave from './Enclave';
import { fromDreamAskew, forDreamAskew } from "state";

const { 
  getConflicts,
  getAllConflicts,
  getVisuals,
  getAllVisuals,
  getMinorCharacterIds
} = fromDreamAskew;
const {
  setEnclaveConflicts,
  setEnclaveVisuals
} = forDreamAskew

const mapStateToProps = state => ({
  conflicts: getConflicts(state),
  allConflicts: getAllConflicts(state),
  visuals: getVisuals(state),
  allVisuals: getAllVisuals(state),
  minorCharacterIds: getMinorCharacterIds(state)
})

const mapDispatchToProps = {setEnclaveConflicts, setEnclaveVisuals}

export default connect(mapStateToProps, mapDispatchToProps)(Enclave);