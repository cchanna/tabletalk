import React, { Component } from 'react'
import { string, number, bool, func, shape, object, node } from 'prop-types'
import rx from 'resplendence'
  
rx`
@import '~Swords/styles';
`

const Container = rx('div')`
  display: flex;
  flex-flow: row nowrap;
`
const Toggle = rx('button')`
  @include button;
  background: black;
  width: 20px;
  flex: 0 0 auto;
  height: 20px;
  margin: 2px 4px 4px 0;
  transition: 150ms box-shadow;
  position: relative;
  box-shadow: -1px 1px 1px 1px rgba(black, .1) inset;
  &.jovial {
    background: var(--color-jovial);
  }
  &.glum {
    background: var(--color-glum);
  }
  &:after {
    content: "";
    position: absolute;
    left: 4px;
    top: 4px;
    right: 4px;
    bottom: 4px;
    background: white;
    opacity: 1;
    box-shadow: -1px 1px 1px 1px rgba(black, .1);
    transition-property: box-shadow, opacity;
    transition-duration: 150ms;
  }
  &:not(:disabled) {
    box-shadow: -1px 1px 1px 1px rgba(black, .25);
    &:after {
      box-shadow: -1px 1px 1px 1px rgba(black, .25) inset;
    }
    &:hover:after {
      opacity: .75;
    }
    &.checked:hover:after {
      opacity: .1;
    }
    &:active:after {
      opacity: .25;
    }
    &.checked:active:after {
      opacity: .9;
    }
    &:focus {
      box-shadow: -1px 1px 2px 1px rgba(black, .5);
      &:after {
        box-shadow: -1px 1px 2px 1px rgba(black, .5) inset;
      }
    }
  }
  &.checked:after {
    opacity: 0;
  }
`
const Text = rx('div')`
  margin: 4px 0;
  flex: 1 0 0;
`
class ToggleSection extends Component {
  static propTypes = {
    glum: bool.isRequired,
    jovial: bool.isRequired,
    checked: bool.isRequired,
    disabled: bool.isRequired,
    text: node.isRequired,
    onClick: func.isRequired
  }
  static defaultProps = {
    glum: false,
    jovial: false
  }
  render () {
    const { disabled, glum, jovial, checked, text, onClick } = this.props;
    return (
      <Container>
        <Toggle
          disabled={disabled}
          rx={{jovial, glum, checked}} 
          onClick={onClick}/>
        <Text>{text}</Text>
      </Container>
    )
  }
}

export default ToggleSection;