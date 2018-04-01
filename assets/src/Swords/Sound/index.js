import { connect } from 'react-redux'
import Sound from './Sound';

import { fromSwords } from 'state';

const { 
  getDice,
  getDiceHolder
} = fromSwords;

const mapStateToProps = (state) => ({
  dice: getDice(state),
  holder: getDiceHolder(state)
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Sound);