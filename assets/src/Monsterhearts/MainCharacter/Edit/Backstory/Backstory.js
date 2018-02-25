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
    depth: number.isRequired,
    next: string
  }
  
  render() {
    const { id, backstory, depth, next } = this.props;
    const backstories = backstory.map((b, i) => (
      <p key={i}>
        {b}
      </p>
    ))
    
    if (next) {
      return (
        <Container>
          <NewString id={id}/>
        </Container>
      );
    }
    else {
      return (
        <Container>
          {backstories}
          <Strings id={id} depth={depth}/>
        </Container>
      )
    }

  }
}

export default Backstory;