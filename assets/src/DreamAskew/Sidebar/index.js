import { connect } from 'react-redux'
import Sidebar from './Sidebar';
import { fromDreamAskew, forDreamAskew } from 'state';
import { goTo, replace, makeGetHere } from 'Routing';

const {
  getCharacterSummaries,
  getUnpickedRoles,
  getSettingSummaries,
  getMyCharacterId,
  getVisuals,
  getMyPlayer
} = fromDreamAskew;
const { gainToken, spendToken } = forDreamAskew;

const mapStateToProps = () => {
  const getHere = makeGetHere();
  return (state, { depth }) => ({
    characterSummaries: getCharacterSummaries(state),
    unpickedRoles: getMyCharacterId(state) ? [] : getUnpickedRoles(state),
    settingSummaries: getSettingSummaries(state),
    visuals: getVisuals(state),
    depth,
    tokens: getMyPlayer(state).tokens,
    here: getHere(state, depth)
  })
}

const mapDispatchToProps = {goTo, replace, gainToken, spendToken}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);