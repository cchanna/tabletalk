import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'

import Input from './Input';
import Chat from './Chat';  

rx`
@import '~Monsterhearts/fonts';
@import '~Monsterhearts/colors';
`

const Container = rx('div')`
  width: 320px;
  height: 100%;
  color: hsl(240, 10%, 95%);
  background: hsl(240, 10%, 21%);
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
  text-align: center;
  box-shadow: 0 1px 1px 1px fade-out(black, .8);
  padding: 0;
  color: black;
  background-color: white;
  &:focus {
    outline: none;
  }
  &.notify {
    background-color: black;
    color: white;
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
  &::-webkit-scrollbar-thumb {
    background: darken($foreground, 50%);
    &:hover {
      background: darken($foreground, 40%);
    }
  }
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
    setChatboxCollapsed: func.isRequired
  }

  conversation = null;
  atBottom = false;

  handleToggle = () => {
    const { collapsed, setChatboxCollapsed } = this.props;
    setChatboxCollapsed({collapsed: !collapsed});
  }

  handleRef = e => this.conversation = e;

  scrollToBottom = () => {
    if (this.conversation) {
      this.conversation.scrollTop = this.conversation.scrollHeight;
    }
  }

  componentWillUpdate(newProps, newState) {
    if (this.conversation) {
      const { scrollTop, offsetHeight, scrollHeight } = this.conversation;
      this.atBottom = scrollTop + offsetHeight === scrollHeight;
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.collapsed && !this.props.collapsed) {
      setTimeout(this.scrollToBottom.bind(this), 700);
    }
    else if (this.atBottom) {
      this.scrollToBottom();
    }
  }

  render() {
    const { overlay, collapsed, chats, chatsById, playersById, me } = this.props;
    let toggle = null;
    if (overlay) toggle = (
      <Toggle rx={{collapsed}} onClick={this.handleToggle}>
        {collapsed ? '%' : '^'}
      </Toggle>
    )
    const chatComponents = [];
    let prevPlayerId = null;
    chats.forEach((id, index) => {
      const chat = chatsById[id];
      const mine = (chat.playerId === me);
      if (chat.playerId !== prevPlayerId) {
        chatComponents.push(
          <Header key={id + "-header"} rx={{mine}}>{playersById[chat.playerId].name}</Header>
        )
      }
      prevPlayerId = chat.playerId;
      chatComponents.push(
        <Chat key={id} mine={mine} newest={index === chats.length - 1} {...chat}/>
      );
    })
    return (
      <Container rx={{overlay, collapsed}}>
        {toggle}
        <Body rx={{overlay, collapsed}}>
          <Conversation innerRef={this.handleRef}>
            <ChatList>
              {chatComponents}
            </ChatList>
          </Conversation>
          <Divider/>
          <Input onChat={() => {}}/>
        </Body>
      </Container>
    );
  }
}

export default Chatbox;