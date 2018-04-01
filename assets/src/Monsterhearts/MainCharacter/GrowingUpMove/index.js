import { connect } from 'react-redux'
import GrowingUpMove from './GrowingUpMove';

import { fromMonsterhearts, forMonsterhearts } from 'state';
import { goBack, replace } from 'Routing';

const { 
  getUnchosenGrowingUpMoves, 
  getCharacter,
  getCanGetSeasonAdvancements
} = fromMonsterhearts;

const mapStateToProps = (state, {depth, id}) => {
  const { mainCharacter } = getCharacter(state, id);
  const { advancements } = mainCharacter;
  const allowed = getCanGetSeasonAdvancements(state, id) && !advancements.includes("grow");
  return {
    id,
    depth,
    allowed,
    moves: getUnchosenGrowingUpMoves(state, id)
  }
}

const mapDispatchToProps = {
  createAdvancement: forMonsterhearts.createAdvancement,
  goBack,
  replace
}

export default connect(mapStateToProps, mapDispatchToProps)(GrowingUpMove);