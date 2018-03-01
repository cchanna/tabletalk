import { connect } from 'react-redux'
import NewSideCharacter from './NewSideCharacter';

import { forMonsterhearts, fromSocket } from 'state';

const { createSideCharacter } = forMonsterhearts;

const mapStateToProps = state => ({
  slowActionsById: fromSocket.getSlowActionsById(state)
})

const mapDispatchToProps = {createSideCharacter};

export default connect(mapStateToProps, mapDispatchToProps)(NewSideCharacter);