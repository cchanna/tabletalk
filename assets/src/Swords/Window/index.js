import { connect } from 'react-redux'
import Window from './Window';

import { fromSwords, fromRouting } from 'state';
import { replace } from 'Routing';

const { 
  getNext
} = fromRouting;
const {
  getAreColorsSet,
  getOvertone,
  getDice,
  getMe,
  getDiceHolder
} = fromSwords;

const mapStateToProps = (state, {depth}) => ({
  depth,
  next: getNext(state, depth),
  areColorsSet: getAreColorsSet(state),
  tone: getOvertone(state),
  amHoldingDice: !getDice(state) && (getDiceHolder(state) === getMe(state))
})

const mapDispatchToProps = {replace};

export default connect(mapStateToProps, mapDispatchToProps)(Window);