import { connect } from 'react-redux'
import Window from './Window';
import { makeGetHere, goTo } from 'Routing';

import { fromDreamAskew } from "state";

const { 
  getMyCharacterId,
  getOtherCharacterIds,
  getMySettings,
  getSettingNames,
  getRoleNames
} = fromDreamAskew;


const mapStateToProps = () => {
  const getHere = makeGetHere()
  return (state, { depth }) => ({
    myCharacterId: getMyCharacterId(state),
    mySettings: getMySettings(state),
    otherCharacterIds: getOtherCharacterIds(state),
    settingNames: getSettingNames(state),
    roleNames: getRoleNames(state),
    depth,
    here: getHere(state, depth)
  })
}
const mapDispatchToProps = {goTo}

export default connect(mapStateToProps, mapDispatchToProps)(Window);