import React, { Component } from 'react'
import { bool, func, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
import RollButton from './RollButton';

rx`
@import '~Monsterhearts/styles';
@import '~Monsterhearts/colors';
@import '~Monsterhearts/fonts';
`

const Container = rx('div')`
  flex: 0 0 auto;
  height: 20px;
  background: $foreground;
  // border-bottom: 20px solid $foreground;
  box-shadow: -1px 1px 2px 1px rgba(0, 0, 0, .5);
  transition-property: top, padding;
  transition-duration: 150ms;
  height: 120px;
  top: -100px;
  padding: 10px 5px 30px 5px;
  &.overlay {
    padding-bottom: 10px;
    top: -140px;
  }
  &.open {
    top: 0px;
  }
  box-sizing: border-box;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  left: 0;
  width: 100%;
  position: absolute;
`
const OpenButton = rx('button')`
  @include button;
  flex: 0 0 auto;
  display: block;
  font-family: "icomoon";
  background: $accent;
  border: 5px solid $foreground;
  color: $foreground;
  border-radius: 50px;
  font-size: 30px;
  padding: 10px;
  z-index: 1;
  height: 30px;
  width: 30px;
  box-sizing: content-box;
  position: absolute;
  left: calc(50% - 30px);
  bottom: -25px;
  box-shadow: -1px 1px 2px 1px rgba(0, 0, 0, .5);
  transition-property: left, bottom;
  transition-duration: 150ms;
  &.overlay {
    left: 40px;
    bottom: -70px;
    &.collapsed {
      bottom: -15px;
    }
    &.open {
      bottom: -20px;
    }
  }
`

class DiceRoller extends Component {
  static propTypes = {
    overlay: bool.isRequired,
    collapsed: bool.isRequired,
    onChat: func.isRequired
  }

  state = {
    open: false
  }


  handleClose = () => {
    this.setState({open: false});
    document.removeEventListener("click", this.handleClose);
  }

  handleOpen = () => {
    this.setState(({open}) => ({open: !open}));
    document.addEventListener("click", this.handleClose);
  }
  
  render() {
    const { onChat, overlay, collapsed } = this.props;
    const { open } = this.state;
    const buttons = Array
      .from(new Array(7), (x, i) => (i - 2))
      .map(value => (
        <RollButton key={value} value={value} onChat={onChat}/>
      ))
    return (
      <Container rx={{open, overlay, collapsed}}>
        {buttons}
        <OpenButton rx={{overlay, collapsed, open}} onClick={this.handleOpen}>6</OpenButton>
      </Container>
    );
  }
}

export default DiceRoller;