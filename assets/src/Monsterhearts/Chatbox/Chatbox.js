import React, { Component } from 'react'
import { bool, func, arrayOf, string, object, number, shape } from 'prop-types'
import rx from 'resplendence'

import Input from './Input';
import Chat, { chatProperties } from './Chat';  
import BaseChatbox from 'common/components/Chatbox';
import DiceRoller from './DiceRoller';

rx`
@import '~Monsterhearts/fonts';
@import '~Monsterhearts/colors';
`

const Styling = rx(BaseChatbox)`--1
font-family: $body;
  color: hsl(240, 10%, 95%);
  background: hsl(240, 10%, 21%);
  .toggle {
    color: black;
    background-color: $foreground;
    &.notify {
      background-color: black;
      color: white;
    }
  }
  .input {
    color: hsl(240, 10%, 7%);
    background-color: hsl(240, 10%, 95%);
  }
  &::-webkit-scrollbar-thumb {
    background: darken($foreground, 50%);
    &:hover {
      background: darken($foreground, 40%);
    }
  }
`

const Container = rx('div')`
  width: 320px;
  height: 100%;
  box-shadow: -2px 0px 2px 1px fade-out(black, .5);
  flex: 0 0 auto;
  font-size: 16px;
  z-index: 100;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  -moz-user-select: text;
  -khtml-user-select: text;
  -webkit-user-select: text;
  -ms-user-select: text;
  user-select: text;
  cursor: text;
  position: relative;
  &.overlay {
    box-shadow: 0px -6px 2px 1px fade-out(black, .5);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    transition: height 0.2s cubic-bezier(1, 0, 0, 1);
    &.collapsed {
      height: 32px;
    }
  }
`

const Toggle = rx('div')`
  transition-property: color, background-color;
  transition-duration: 0.5s;
  text-shadow: -1px 1px 1px fade-out(black, .7);
  font-family: 'icomoon';
  font-size: 24px;
  width: 100%;
  height: 36px;
  border: none;
  box-shadow: 0 1px 1px 1px fade-out(black, .8);
  padding: 0;
  position: relative;
  top: 0px;
  transition-property: height, top, padding;
  transition-duration: 150ms;
  box-sizing: border-box;
  text-align: center;
  &:focus {
    outline: none;
  }
`

const Body = rx('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 0;
  flex: 1 1 auto;
  overflow: hidden;
  font-family: $body;
  &.overlay {
    height: auto;
    &.collapsed {
      height: 0;
    }
  }
`

const Conversation = rx('div')`
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
  width: 100%;
  flex: 1 1 auto;
  overflow-y: scroll;
  height: 100%;
  padding: 1em;
  margin-right: 6px;
  
`

const Header = rx('div')`
  font-size: 1em;
  position: relative;
  font-weight: bold;
  -webkit-font-smoothing: antialiased;
  margin: 2em 0 0 0;
  &.mine {
    align-self: flex-end;
  }
`

const Divider = rx('div')`
  height: 0px;
  border: 1px inset black;
  flex: none;
  width: 90%;
  border-radius: 1em;
`

const ChatList = rx('div')`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: flex-end;
`

class Chatbox extends Component {
  static propTypes = {
    overlay: bool.isRequired,
    collapsed: bool.isRequired,
    chats: arrayOf(shape(chatProperties)).isRequired,
    playerNamesById: object.isRequired,
    setChatboxCollapsed: func.isRequired,
    chat: func.isRequired
  }

  handleChat = ({text}) => {
    const { chat } = this.props;
    chat({text});
  }

  render() {
    const { overlay, collapsed } = this.props;
    return (
      <Styling {...this.props}
        diceRoller={
          <DiceRoller onChat={this.handleChat} {...{overlay, collapsed}}/>
        }
        Chat={Chat}
      />
    );
  }
}

export default Chatbox;