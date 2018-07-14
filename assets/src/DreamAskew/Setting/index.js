import { connect } from 'react-redux'
import Setting from './Setting';
import { replace } from 'Routing';

import { fromDreamAskew, forDreamAskew } from "state";

const { 
  getSettingSheet
} = fromDreamAskew;
const {
  createSetting, pickUpSetting, giveAwaySetting, setSettingDesires, setSettingNotes
} = forDreamAskew

const mapStateToProps = (state, {name, depth}) => ({
  ...getSettingSheet(state, name),
  depth
})

const mapDispatchToProps = {
  replace, createSetting, pickUpSetting, giveAwaySetting, setSettingDesires, setSettingNotes
}

export default connect(mapStateToProps, mapDispatchToProps)(Setting);