import { connect } from 'react-redux';

import Games from './Games';

import { goTo } from 'Routing/actionCreators';
import { getGames, getGame, openGame, joinGame, openNewGame } from './actionCreators';
import { compose } from '../../../../../Users/castl/AppData/Local/Microsoft/TypeScript/2.6/node_modules/redux';
import withSize from '../common/withSize';

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


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withSize({375: "tiny", 482: "narrow"})
)(Games);