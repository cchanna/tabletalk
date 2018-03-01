import { connect } from 'react-redux'
import Link from './Link';

import { goTo } from '../actionCreators';
import { exactMatch, subPath } from 'utils/pathTools';
import { fromRouting } from 'state';

const mapStateToProps = (state, {to = [], depth = 0, ...ownProps}) => {
  const path = fromRouting.getPath(state);
  const inputTo = Array.isArray(to) ? to : [to.toString()];
  const fullTo = path.slice(0, depth).concat(inputTo);

  return {
    to: fullTo,
    exact: exactMatch(path, fullTo),
    active: subPath(fullTo, path),
    ...ownProps
  };
};

const mapDispatchToProps = {goTo}

export default connect(mapStateToProps, mapDispatchToProps)(Link);