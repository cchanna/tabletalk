import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
// import CharacterLink from './CharacterLink.js';
  
rx`
@import '~Swords/styles';
`

const Container = rx('div')`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  position: relative;
  top: 0;
  height: 50px;
  transition-property: top, height, padding;
  transition-duration: 300ms;
  &.hide {
    top: -40px;
    height: 0;
    padding: 0;
  }
`
const Section = rx('div')`
  display: flex;
  flex-flow: row nowrap;
`
const Colors = rx('button')`
  @include button;
  box-shadow: -1px 1px 1px 1px rgba(0, 0, 0, .5);
  transition-property: color, background, opacity;
  transition-duration: 300ms;
  width: 30px;
  height: 30px;
  border-radius: 20px;
  font-family: "icomoon";
  color: var(--text-opposite);
  background: var(--text);
  &:hover, &:focus {
    background: gray;
  }
  &:active {
    background: var(--text);
    color: var(--text);
  }
`
const SwitchTone = rx('button')`
  @include button;
  width: 30px;
  height: 30px;
  position: relative;
  &:after, &:before {
    font-family: "icomoon";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    box-shadow: -1px 1px 1px 1px rgba(0, 0, 0, .5);
    display: flex;
    align-items: center;
    justify-content: center;
    transition-property: opacity, box-shadow;
    transition-duration: 300ms; 
  }
  &:before {
    content: "l";
    background: var(--color-jovial);
    color: var(--text-jovial);
    opacity: .5;
  }
  &:after {
    content: "l";
    background: var(--color-glum);
    color: var(--text-glum);
    opacity: 0;
  }
  &.glum {
    &:before {
      opacity: 0;
    }
    &:after {
      opacity: .5;
    }
  }
  &:focus {
    &.glum:after {
      opacity: .75;
    }
    &:not(.glum):before {
      opacity: .75;
    }
  }
  &:hover {
    &.glum:after {
      opacity: 1;
    }
    &:not(.glum):before {
      opacity: 1;
    }
  }
  &:active {
    &.glum:after {
      opacity: 0;
    }
    &:not(.glum):before {
      opacity: 0;
    }
  }
`

class Header extends Component {
  static propTypes = {
    tone: bool.isRequired,
    hide: bool.isRequired,
    depth: number.isRequired,
    amOverplayer: bool.isRequired,
    roguePlayerIds: arrayOf(number).isRequired,
    goTo: func.isRequired,
    flipTone: func.isRequired
  }

  goToColors = () => {
    const { goTo, depth } = this.props;
    goTo(["colors"], depth);
  }
  
  render() {
    const { tone, hide, amOverplayer, /*roguePlayerIds, depth,*/ flipTone } = this.props; 
    return (
      <Container rx={{hide}}>
        <Section>
          {amOverplayer ? <SwitchTone rx={{glum: tone}} onClick={flipTone}/> : null}
        </Section>
        {/* <Section>
          {roguePlayerIds.map(id => (
            <CharacterLink key={id} id={id} depth={depth}/>
          ))}
        </Section> */}
        <Colors onClick={this.goToColors}>b</Colors>
      </Container>
    );
  }
}

export default Header;