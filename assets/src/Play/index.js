import { connect } from 'react-redux';

import Play from './Play';

import { getGame } from 'Games';
import { fromGames } from 'state';
import { replace, makeGetNext } from 'Routing';
import { createSelector } from 'reselect';

const { getGamesBySlug } = fromGames;


const mapStateToProps = () => {
  const getNext = makeGetNext();
  const getSlug = (state, {depth}) => getNext(state, depth);
  const getGame = createSelector(
    getSlug,
    getGamesBySlug,
    (slug, gamesBySlug) => gamesBySlug[slug]
  )
  return createSelector(
    (_state, {depth}) => depth,
    getSlug,
    getGame,
    (depth, slug, game) => ({
      depth,
      slug,
      game: game ? {
        kind: game.kind,
        me: game.me
      } : null
    })
  )
} 

const mapDispatchToProps = {replace, getGame};


export default connect(mapStateToProps, mapDispatchToProps)(Play);