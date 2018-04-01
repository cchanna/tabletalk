import { connect } from 'react-redux'
import Header from './Header';

import { fromSwords, forSwords } from 'state';
import { goTo } from 'Routing'

const { 
  getTone,
  getMe,
  getOverplayerId,
  getRoguePlayerIds
} = fromSwords;
const {
  flipTone
} = forSwords;

const mapStateToProps = (state, {colorPicker, depth}) => ({
  colorPicker, depth,
  tone: getTone(state),
  roguePlayerIds: getRoguePlayerIds(state),
  amOverplayer: getMe(state) === getOverplayerId(state)
})

const mapDispatchToProps = {flipTone, goTo}

export default connect(mapStateToProps, mapDispatchToProps)(Header);