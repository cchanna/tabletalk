import React, { Component } from 'react'
import { string, number, func, shape, arrayOf } from 'prop-types'
import rx from 'resplendence'

import Monsterhearts from 'Monsterhearts';
import Swords from 'Swords';

rx`
@import '~common/styles';
@import '~common/colors';
`

const Container = rx('div')`
 height: 100%;
 width: 100%;
`

const componentsForKind = [Monsterhearts, Swords];

class Play extends Component {
  static propTypes = {
    depth: number.isRequired,
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
    if (this.props.slug !== prevProps.slug) {
      this.route();
    }
    if (!prevProps.game && this.props.game && !this.props.game.me) {
      const { replace, slug } = this.props;
      replace(["games", slug]);
    }
  }

  render() {
    const { game, depth } = this.props;
    let content = null;
    if (game && game.me) {
      const Component = componentsForKind[game.kind];
      if (Component) content = <Component depth={depth + 1}/>
      else {
        console.error("invalid component!");
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