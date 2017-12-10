import { connect } from 'react-redux';

import Games from './Games';

import { goTo } from 'Routing/actionCreators';
import { getGames, getGame, openGame } from './actionCreators';
import { openNewGame } from './NewGameForm/actionCreators';

const mapStateToProps = ({games}, {path, here}) => {
  const { list, gamesById, playersById, error, lastLoaded } = games;
  
  return {
    list,
    gamesById,
    playersById,
    error,
    lastLoaded,
    path,
    here
  }
}

const mapDispatchToProps = {goTo, getGames, getGame, openGame, openNewGame};

export default connect(mapStateToProps, mapDispatchToProps)(Games);