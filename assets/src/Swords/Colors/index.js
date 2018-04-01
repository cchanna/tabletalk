import { connect } from 'react-redux'
import Colors from './Colors';

import { forSwords, fromSwords } from 'state';
import { goTo } from 'Routing';

const {
  getGlumColor,
  getJovialColor,
  getGlumText,
  getJovialText,
} = fromSwords;

const {
  suggestGlum,
  suggestJovial
} = forSwords

const mapStateToProps = (state, {depth}) => ({
  depth,
  glumColor: getGlumColor(state),
  jovialColor: getJovialColor(state),
  glumText: getGlumText(state),
  jovialText: getJovialText(state),
});

const mapDispatchToProps = {goTo, suggestGlum, suggestJovial};

export default connect(mapStateToProps, mapDispatchToProps)(Colors);