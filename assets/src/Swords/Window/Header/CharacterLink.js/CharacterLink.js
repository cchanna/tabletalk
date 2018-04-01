import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
import { Link } from 'Routing';

rx`
@import '~Swords/styles';
`

const Container = rx(Link)`
  @include link;
  @include button-style;
  font-family: $interact;
  font-size: 16px;
  margin: 10px;
  color: var(--text);
  transition-property: opacity, box-shadow, background, color;
  transition-duration: 300ms;
  opacity: 1;
  position: relative;
  --text: var(--text-glum);
  &.active {
    opacity: 0;
  }
  &.jovial {
    --text: var(--text-jovial);
  }
  &:after {
    z-index: 4;
  }

`
const Background = rx(Link)`
  position: absolute;
  left: -5px;
  top: -5px;
  width: calc(100% + 10px);
  height: calc(100% + 5px);
  transition-property: opacity;
  transition-duration: 300ms;
  opacity: 0;
  &:before, &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    box-shadow: -1px 1px 1px 1px rgba(0, 0, 0, .5) inset;
  }
  &.show {
    opacity: 1;
  }
  &:before {
    z-index: 1;
    background: var(--color-glum);
  }
  &:after {
    z-index: 2;
    background: var(--color-jovial);
    opacity: 0;
    transition-property: opacity;
    transition-duration: 300ms;
  }
  &.jovial:after {
    opacity: 1;
  }
`

const Text = rx('span')`
  position: relative;
  z-index: 3;
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