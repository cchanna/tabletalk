import { connect } from 'react-redux'
import Sidebar from './Sidebar';
import { fromDreamAskew } from 'state';
import { goTo, replace, makeGetHere } from 'Routing';

const {
  getCharacterSummaries,
  getUnpickedRoles,
  getSettingSummaries,
  getMyCharacterId,
  getVisuals,
  getMyPlayer
} = fromDreamAskew;

const mapStateToProps = () => {
  const getHere = makeGetHere();
  return (state, { depth }) => ({
    characterSummaries: getCharacterSummaries(state),
    unpickedRoles: getMyCharacterId(state) ? [] : getUnpickedRoles(state),
    settingSummaries: getSettingSummaries(state),
    visuals: getVisuals(state),
    depth,
    here: getHere(state, depth)
  })
}

const mapDispatchToProps = {goTo, replace}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);