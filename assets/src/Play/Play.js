import React, { Component } from 'react'
import { string, number, func, shape, arrayOf } from 'prop-types'
import rx from 'resplendence'

// import Monsterhearts from 'Monsterhearts';
// import Swords from 'Swords';
// import DreamAskew from 'DreamAskew';

let componentsForKind;
if (module.hot) {
  componentsForKind = [
    require('Monsterhearts').default,
    require('Swords').default,
    require('DreamAskew').default
  ]
} 
else {
  componentsForKind = [
    () => import(/* webpackChunkName: "monsterhearts" */ 'Monsterhearts'), 
    () => import(/* webpackChunkName: "swords" */ 'Swords'), 
    () => import(/* webpackChunkName: "dream_askew" */ 'DreamAskew'), 
  ];
}

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
  componentDidUpdate(prevProps, prevState) {
    if (this.props.slug !== prevProps.slug) {
      this.route();
    }
    if (!prevProps.game && this.props.game && !this.props.game.me) {
      const { replace, slug } = this.props;
      replace(["games", slug]);
    }
    const { game } = this.props;
    console.log("update?")
    if (!module.hot && (prevProps.game && prevProps.game.me) !== (game && game.me)) {
      if (game && game.me) {
        componentsForKind[game.kind]().then(({ default: Component }) => {
          this.setState({Component});
        })
      }
      else {
        this.setState({Component: null});
      }
    }
  }

  state = {
    Component: null
  }




  render() {
    const { game, depth } = this.props;
    let content = null;
    let Component = null;
    if (game && game.me) {
      if (module.hot) {
        Component = componentsForKind[game.kind]
      }
      else {
        Component = this.state.Component;
      }
    }
    console.log(Component);
    if (Component) {
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