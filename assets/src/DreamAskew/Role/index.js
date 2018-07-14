import { connect } from 'react-redux'
import Role from './Role';

import { fromDreamAskew, forDreamAskew } from 'state';
import { replace } from 'Routing';

const { 
  getRole
} = fromDreamAskew;
const {
  createCharacter
} = forDreamAskew;

const mapStateToProps = (state, { name, depth } ) => ({
  ...getRole(state, name),
  depth
})

const mapDispatchToProps = { replace, createCharacter }

export default connect(mapStateToProps, mapDispatchToProps)(Role);