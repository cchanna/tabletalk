import { connect } from 'react-redux';

import Games from './Games';

import { goTo } from 'Routing/actionCreators';
import { getGames, getGame, openGame, joinGame, openNewGame } from './actionCreators';

const mapStateToProps = ({games}, {path, here}) => {
  const { list, gamesBySlug, playersById, error, lastLoaded, loading, failed, join } = games;
  
  return {
    list,
    gamesBySlug,
    playersById,
    error,
    lastLoaded,
    loading,
    failed,
    path,
    here,
    join
  }
}

const mapDispatchToProps = {goTo, getGames, getGame, openGame, openNewGame, joinGame };

export default connect(mapStateToProps, mapDispatchToProps)(Games);