import { connect } from 'react-redux'
import Edit from './Edit';
import { compose } from 'redux';

import { goBack, replace, getPath } from 'Routing';
import { fromMonsterhearts } from 'state';

const mapStateToProps = (state, {id, depth}) => {
  return {
    id, depth,
    next: getPath(state, depth).next,
    ...fromMonsterhearts.getEditDone(state, id),
    readOnly: fromMonsterhearts.getReadOnly(state, id)
  }
};

const mapDispatchToProps = {goBack, replace}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Edit);