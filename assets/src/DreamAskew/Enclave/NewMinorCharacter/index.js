import { connect } from 'react-redux'
import NewMinorCharacter from './NewMinorCharacter';
import { forDreamAskew } from "state"

const { createMinorCharacter } = forDreamAskew;

const mapStateToProps = () => ({});

const mapDispatchToProps = {createMinorCharacter}

export default connect(mapStateToProps, mapDispatchToProps)(NewMinorCharacter);