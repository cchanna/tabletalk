import { connect } from 'react-redux'
import { compose } from 'redux';
import Swords from './Swords';
import withSize from 'common/withSize';

import { fromSwords, fromSocket, forSwords } from 'state';
import { load } from './actionCreators';

const {
  getIsLoaded,
  getGlumColor,
  getJovialColor,
  getGlumText,
  getJovialText,
  getTone
} = fromSwords;
const {
  getIsConnected
} = fromSocket;
const {
  resolveRoll
} = forSwords;

const mapStateToProps = (state, {depth}) => ({
  depth,
  loaded: !!getIsLoaded(state),
  connected: getIsConnected(state),
  glumColor: getGlumColor(state),
  jovialColor: getJovialColor(state),
  glumText: getGlumText(state),
  jovialText: getJovialText(state),
  tone: getTone(state)
});

const mapDispatchToProps = {load, resolveRoll}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withSize({1023: "mobile"})
)(Swords);