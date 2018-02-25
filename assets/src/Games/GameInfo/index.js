import { connect } from 'react-redux'
import GameInfo from './GameInfo';

import { fromGames } from '../state';
import { goTo } from 'Routing';
import { joinGame } from '../actionCreators';

const mapStateToProps = (state, {slug, sizes}) => {

  return {
    slug,
    ...fromGames.getGame(state, slug),
    sizes
  };
};

const mapDispatchToProps = {goTo, joinGame}

export default connect(mapStateToProps, mapDispatchToProps)(GameInfo);