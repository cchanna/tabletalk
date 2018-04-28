import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
import { Link } from 'Routing';

rx`
@import '~Swords/styles';
`

const Container = rx(Link)`
  @include link;
  font-family: $interact;
  font-size: 14px;
  margin: 10px;
  flex: 1 0 0;
  transition-property: opacity, box-shadow, background, color;
  transition-duration: 300ms;
  position: relative;
  text-align: center;
  color: var(--text-opposite);
  &.active, &:hover, &:focus {
    color: var(--color-single);
  }
  &:active {
    opacity: .5;
  }
`
const Background = rx('div')`
  position: absolute;
  left: -5px;
  top: -5px;
  width: calc(100% + 10px);
  height: calc(100% + 5px);
  transition-property: opacity;
  transition-duration: 300ms;
`

const Text = rx('span')`
  position: relative;
`

class CharacterLink extends Component {
  static propTypes = {
    depth: number.isRequired,
    id: number.isRequired,
    name: string.isRequired,
    tone: bool.isRequired,
    overtone: bool.isRequired
  }
  
  render() {
    const { depth, name, id, tone, overtone } = this.props; 
    return (
      <Container 
        to={id} 
        depth={depth} 
        rx={{jovial: tone}}
      >
        <Background rx={{show: overtone !== tone, jovial: tone}}/>
        <Text>
          {name}
        </Text>
      </Container>
    );
  }
}

export default CharacterLink;