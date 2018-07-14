import { connect } from 'react-redux'
import Reincorporation from './Reincorporation';
import { fromSwords, forSwords, fromSocket } from "state";

const { getCanReincorporate } = fromSwords;
const { getSlowActionsById } = fromSocket;
const { undoReincorporation } = forSwords;

const mapStateToProps = (state, {hide, mine, reincorporatedBy, onReincorporate}) => ({
  hide,
  mine,
  reincorporatedBy,
  onReincorporate,
  canReincorporate: getCanReincorporate(state),
  slowActionsById: getSlowActionsById(state)
})

const mapDispatchToProps = {onUnincorporate: undoReincorporation}

export default connect(mapStateToProps, mapDispatchToProps)(Reincorporation);