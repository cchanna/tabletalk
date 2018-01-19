import { connect } from 'react-redux';

import Play from './Play';

import { getGame } from 'Games/actionCreators';
import { replace } from 'Routing/actionCreators';

const mapStateToProps = ({games}, {path, here}) => {
  const { gamesBySlug } = games;
  const [slug, ...tail] = path;
  let game = null;
  if (gamesBySlug && slug !== "new" && gamesBySlug[slug]) {
    game = gamesBySlug[slug];
  }
  return {
    path: tail,
    here: [...here, slug],
    slug,
    game
  }
}

const mapDispatchToProps = {replace, getGame};


export default connect(mapStateToProps, mapDispatchToProps)(Play);