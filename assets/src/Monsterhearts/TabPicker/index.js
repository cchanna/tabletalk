import { connect } from 'react-redux'
import TabPicker from './TabPicker';

import { fromMonsterhearts } from '../state';

import { getPath } from 'Routing';

const { getCharacterTabs } = fromMonsterhearts;

const mapStateToProps = (state, {depth}) => ({
  depth, 
  next: getPath(state, depth), 
  tabs: getCharacterTabs(state)
});

export default connect(mapStateToProps)(TabPicker);