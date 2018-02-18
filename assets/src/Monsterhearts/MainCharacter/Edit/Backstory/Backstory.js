import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
import Strings from 'Monsterhearts/common/Strings';
import NewString from 'Monsterhearts/common/NewString';

rx`
@import '~common/styles';
@import '~Monsterhearts/colors';
@import '~Monsterhearts/fonts';
`

const Container = rx('div')`
  font-size: 20px;
  font-family: $body;
  color: $foreground;
  max-width: 600px;
`

class Backstory extends Component {
  static propTypes = {
    id: number.isRequired,
    backstory: arrayOf(string).isRequired,
    path: arrayOf(string).isRequired,
    here: arrayOf(string).isRequired
  }
  
  render() {
    const { id, backstory, path, here } = this.props;
    const backstories = backstory.map((b, i) => (
      <p key={i}>
        {b}
      </p>
    ))
    
    if (path.length === 0) {
      return (
        <Container>
          {backstories}
          <Strings {...{id, path, here}}/>
        </Container>
      )
    }
    else {
      return (
        <Container>
          <NewString here={here} path={path}/>
        </Container>
      );
    }

  }
}

export default Backstory;