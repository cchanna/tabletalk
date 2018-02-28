import { connect } from 'react-redux'
import GrowingUpMove from './GrowingUpMove';

import { fromMonsterhearts, forMonsterhearts } from '../../state';
import { goBack } from 'Routing';

const mapStateToProps = (state, {id}) => ({
  id,
  moves: fromMonsterhearts.getUnchosenGrowingUpMoves(state, id)
})

const mapDispatchToProps = {
  createAdvancement: forMonsterhearts.createAdvancement,
  goBack
}

export default connect(mapStateToProps, mapDispatchToProps)(GrowingUpMove);