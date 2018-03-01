import { connect } from 'react-redux';

import Games from './Games';

import { goTo, getPath } from 'Routing';
import { getGames, getGame, openGame, joinGame, openNewGame } from './actionCreators';
import { compose } from 'redux';
import withSize from 'common/withSize';

import { fromGames } from 'state';
export { getGame } from './actionCreators';
  
const mapStateToProps = (state, {depth}) => {
  const { next } = getPath(state, depth);
  const slug = next;
  const isCurrentGameLoaded = slug === "new"
    ? true
    : slug ? fromGames.getIsGameLoaded(state, slug) : false;
  return {
    depth,
    slug,
    isCurrentGameLoaded,
    games: fromGames.getGames(state),
    isFailed: fromGames.getIsFailed(state),
    lastLoaded: fromGames.getLastLoaded(state)
  }
}

const mapDispatchToProps = {goTo, getGames, getGame, openGame, openNewGame, joinGame };


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withSize({375: "tiny", 482: "narrow"})
)(Games);