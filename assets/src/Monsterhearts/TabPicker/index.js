import { connect } from 'react-redux'
import TabPicker from './TabPicker';

import { 
  getCharacterTabs
} from 'Monsterhearts/selectors';

import { getPath } from 'Routing/selectors';

const mapStateToProps = (state, {depth}) => {
  const { next } = getPath(state, depth);
  const tabs = getCharacterTabs(state);

  
  return {
    depth, next, tabs
  };
};

export default connect(mapStateToProps)(TabPicker);