import { connect } from 'react-redux'
import Motifs from './Motifs';
import { fromSwords, forSwords } from "state";

const { getMotifs } = fromSwords;
const { editMotif } = forSwords;

const mapStateToProps = state => ({
  motifs: getMotifs(state)
})

const mapDispatchToProps = {editMotif}

export default connect(mapStateToProps, mapDispatchToProps)(Motifs);