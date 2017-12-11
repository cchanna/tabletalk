import { connect } from 'react-redux';

import Games from './Games';

import { goTo } from 'Routing/actionCreators';
import { getGames, getGame, openGame, joinGame, startJoinGame, cancelJoinGame, setInput } from './actionCreators';
import { openNewGame } from './NewGameForm/actionCreators';

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

const mapDispatchToProps = {goTo, getGames, getGame, openGame, openNewGame, joinGame, startJoinGame, cancelJoinGame, setInput};

export default connect(mapStateToProps, mapDispatchToProps)(Games);