import { connect } from 'react-redux'
import Experience from './Experience';

import { forMonsterhearts, fromMonsterhearts } from '../../../state';
const { incrementXP, decrementXP } = forMonsterhearts;

const mapStateToProps = (state, {id}) => ({
  id, 
  experience: fromMonsterhearts.getCharacter(state, id).mainCharacter.experience, 
  readOnly: fromMonsterhearts.getReadOnly(state, id)
});

const mapDispatchToProps = {incrementXP, decrementXP}

export default connect(mapStateToProps, mapDispatchToProps)(Experience);