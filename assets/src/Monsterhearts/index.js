import { connect } from 'react-redux';

import Monsterhearts from './Monsterhearts';
import withSize from 'common/withSize';
import { compose } from 'redux';

import { load } from './actionCreators';
import { fromMonsterhearts, fromSocket } from 'state';

const mapStateToProps = (state, {depth}) => {
  return {
    depth,
    loaded: fromMonsterhearts.getIsLoaded(state), 
    connected: fromSocket.getIsConnected(state)
  }
}
const mapDispatchToProps = {load};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withSize({1023: "mobile"})
)(Monsterhearts);