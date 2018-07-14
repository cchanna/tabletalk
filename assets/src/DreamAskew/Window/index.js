import { connect } from 'react-redux'
import Window from './Window';
import { makeGetHere, goTo } from 'Routing';
import { createSelector } from 'reselect';

import { fromDreamAskew } from "state";

const { 
  getMyCharacterId,
  getOtherCharacterIds,
  getMySettings,
  getSettingNames,
  getRoleNames
} = fromDreamAskew;


const mapStateToProps = () => {
  const getHere = makeGetHere();
  return createSelector(
    (state, {depth}) => getHere(state, depth),
    getMyCharacterId,
    getMySettings,
    getOtherCharacterIds,
    getSettingNames,
    getRoleNames,
    (_state, {depth}) => depth,
    (here, myCharacterId, mySettings, otherCharacterIds, settingNames, roleNames, depth) => ({
      here,
      myCharacterId,
      mySettings,
      otherCharacterIds,
      settingNames,
      roleNames,
      depth
    }) 
  )
}

// const mapStateToProps = () => {
//   const getHere = makeGetHere()
//   return (state, { depth }) => ({
//     myCharacterId: getMyCharacterId(state),
//     mySettings: getMySettings(state),
//     otherCharacterIds: getOtherCharacterIds(state),
//     settingNames: getSettingNames(state),
//     roleNames: getRoleNames(state),
//     depth,
//     here: getHere(state, depth)
//   })
// }
const mapDispatchToProps = {goTo}

export default connect(mapStateToProps, mapDispatchToProps)(Window);