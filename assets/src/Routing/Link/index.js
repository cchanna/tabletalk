import { connect } from 'react-redux'
import Link from './Link';

import { goTo } from '../actionCreators';
import { exactMatch, subPath } from 'utils/pathTools';

const mapStateToProps = ({path}, ownProps) => {
  return {
    exact: exactMatch(path, ownProps.to),
    active: subPath(ownProps.to, path),
    ...ownProps
  };
};

const mapDispatchToProps = {goTo}

export default connect(mapStateToProps, mapDispatchToProps)(Link);