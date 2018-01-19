import React, { Component } from 'react'
import { string, number, func, shape, arrayOf } from 'prop-types'
import rx from 'resplendence'
import { exactMatch } from 'utils/pathTools';

import Monsterhearts from 'Monsterhearts';

rx`
@import '~common/styles';
@import '~common/colors';
`

const Container = rx('div')`
 height: 100%;
 width: 100%;
`

class Play extends Component {
  static propTypes = {
    path: arrayOf(string).isRequired,
    here: arrayOf(string).isRequired,
    slug: string,
    game: shape({
      kind: number.isRequired,
      me: number
    }),
    replace: func.isRequired,
    getGame: func.isRequired
  }

  route = () => {
    const { game, slug, getGame, replace } = this.props;
    
    if (!game) {
      if (slug && slug !== 'new') {
        getGame({slug});
      }
      else {
        replace([]);
      }
    }
  }
  componentDidMount = this.route;
  componentDidUpdate(prevProps) {
    if (!exactMatch(this.props.path, prevProps.path)) {
      this.route();
    }
    if (!prevProps.game && this.props.game && !this.props.game.me) {
      const { replace, slug } = this.props;
      replace(["games", slug]);
    }
  }

  render() {
    const { game, path, here } = this.props;
    let content = null;
    const args = {path, here};
    if (game && game.me) {
      switch(game.kind) {
        case 0:
          content = <Monsterhearts {...args}/>;
          break;
        default:
          console.error("Can't play a game with no kind.");
      }
    }
    return (
      <Container>
        {content}
      </Container>
    );
  }
}

export default Play;