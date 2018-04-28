import { connect } from 'react-redux'
import Header from './Header';

import { fromSwords, forSwords } from 'state';
import { goTo } from 'Routing'

const { 
  getOvertone,
  getMe,
  getOverplayerId
} = fromSwords;
const {
  flipOvertone
} = forSwords;

const mapStateToProps = (state, {colorPicker, depth}) => ({
  colorPicker, depth,
  tone: getOvertone(state),
  amOverplayer: getMe(state) === getOverplayerId(state)
})

const mapDispatchToProps = {flipOvertone, goTo}

export default connect(mapStateToProps, mapDispatchToProps)(Header);