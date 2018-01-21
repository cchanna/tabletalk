import { connect } from 'react-redux';

import Monsterhearts from './Monsterhearts';
import withSize from 'common/withSize';
import { compose } from 'redux';

import { load } from './actionCreators';

/*
const mapStateToProps = ({path, here}) => {
  return {
    path, here,
    loaded: true,
    
  }
}
*/

const mapStateToProps = ({monsterhearts}, {path, here}) => {
  const { loaded, socket } = monsterhearts;
  const { connected } = socket;
  return {
    path, here,
    loaded, connected
  }
}
const mapDispatchToProps = {load};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withSize({1023: "mobile"})
)(Monsterhearts);