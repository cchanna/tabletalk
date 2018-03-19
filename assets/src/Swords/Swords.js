import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
rx`
@import '~Swords/styles';
`

const Container = rx('div')`
  background: $background;
  color: $foreground;
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  ::-webkit-scrollbar-thumb {
    background: darken($foreground, 50%);
    &:hover {
      background: darken($foreground, 40%);
    }
  }
`

class Swords extends Component {
  static propTypes = {
    
  }
  
  render() {
    return (
      <Container>
      </Container>
    );
  }
}

export default Swords;