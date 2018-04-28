import { connect } from 'react-redux'
import Characters from './Characters';

import { fromRouting, fromSwords } from 'state';
import { forRouting } from 'state';

const { getNext } = fromRouting;
const { getActiveCharacterIds } = fromSwords;
const { goTo } = forRouting;

const mapStateToProps = (state, {depth}) => ({
  depth,
  selectedCharacter: parseInt(getNext(state, depth), 10),
  characterIds: getActiveCharacterIds(state)
})

const mapDispatchToProps = {goTo}

export default connect(mapStateToProps, mapDispatchToProps)(Characters);