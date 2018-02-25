import { connect } from 'react-redux'
import NewSideCharacter from './NewSideCharacter';

import { forMonsterhearts, fromMonsterhearts } from '../../state';

const { createSideCharacter } = forMonsterhearts;

const mapStateToProps = state => ({
  slowActionsById: fromMonsterhearts.getSlowActionsById(state)
})

const mapDispatchToProps = {createSideCharacter};

export default connect(mapStateToProps, mapDispatchToProps)(NewSideCharacter);