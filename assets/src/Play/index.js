import { connect } from 'react-redux';

import Play from './Play';

import { forGames, fromGames } from 'Games';
import { replace, getPath } from 'Routing';

const mapStateToProps = (state, {depth}) => {
  const { next: slug } = getPath(state, depth);
  const game = fromGames.getGame(state, slug);
  return {
    depth,
    slug,
    game: !game ? null : {
      kind: game.kind,
      me: game.me
    }
  }
}

const mapDispatchToProps = {replace, getGame: forGames.getGame};


export default connect(mapStateToProps, mapDispatchToProps)(Play);