import { connect } from 'react-redux'
import NewSideCharacter from './NewSideCharacter';

import { createSideCharacter } from './actionCreators';

const mapStateToProps = ({monsterhearts}) => {
  const { unansweredSlowActions } = monsterhearts;
  return {unansweredSlowActions};
}

const mapDispatchToProps = {createSideCharacter};

export default connect(mapStateToProps, mapDispatchToProps)(NewSideCharacter);