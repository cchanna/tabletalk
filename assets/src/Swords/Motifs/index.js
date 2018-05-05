import { connect } from 'react-redux'
import Motifs from './Motifs';
import { fromSwords, forSwords, fromSocket } from "state";

const { getMotifs, getCanReincorporate } = fromSwords;
const { editMotif, reincorporateMotif, undoReincorporation } = forSwords;
const { getSlowActionsById } = fromSocket;

const mapStateToProps = state => ({
  motifs: getMotifs(state),
  canReincorporate: getCanReincorporate(state),
  slowActionsById: getSlowActionsById(state)
})

const mapDispatchToProps = {editMotif, reincorporateMotif, undoReincorporation}

export default connect(mapStateToProps, mapDispatchToProps)(Motifs);