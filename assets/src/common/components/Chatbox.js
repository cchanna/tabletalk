import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf, node } from 'prop-types'
import rx from 'resplendence'
import AutosizeTextarea from 'react-textarea-autosize';
  
const Container = rx('div')`
  width: 320px;
  height: 100%;
  background: white;
  color: black;
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
  color: black;
  background-color: white;
  position: relative;
  top: 0px;
  transition-property: height, top, padding;
  transition-duration: 150ms;
  box-sizing: border-box;
  text-align: center;
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
const Textarea = rx(AutosizeTextarea)`
  flex: none;
  width: 100%;
  height: auto;
  border: none;
  resize: none;
  padding: 1em;
  min-height: 1em;
  box-sizing: border-box;
  background: white;
  &:focus {
    outline: none;
  }
`

class Input extends React.Component {
  static propTypes = {
    onChat: func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      value: ""
    }
  }
  handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      this.props.onChat({text: this.state.value});
      this.setState({value: ""});
      e.preventDefault();
    }
  }
  handleChange(e) {
    this.setState({value: e.target.value});
  }
  render() {
    const { onChat, ...rest } = this.props;
    return (
      <Textarea placeholder='Say something'
                onKeyDown={this.handleKeyDown.bind(this)}
                onChange={this.handleChange.bind(this)}
                value={this.state.value}
                {...rest}/>
    );
  }
}

class Chatbox extends Component {
  static propTypes = {
    overlay: bool.isRequired,
    collapsed: bool.isRequired,
    chats: arrayOf(shape({
      id: number.isRequired,
      playerId: number.isRequired,
      mine: bool.isRequired
    })).isRequired,
    playerNamesById: object.isRequired,
    Chat: func.isRequired,
    diceRoller: node,
    className: string,
    setChatboxCollapsed: func.isRequired,
    chat: func.isRequired,
  }

  handleToggle = () => {
    const { collapsed, setChatboxCollapsed } = this.props;
    setChatboxCollapsed({collapsed: !collapsed});
  }

  handleRef = e => this.conversation = e;

  scrollToBottom = () => {
    if (this.conversation) {
      this.conversation.scrollTop = this.conversation.scrollHeight;
      this.atBottom = true;
    }
  }

  componentWillUpdate() {
    if (this.conversation) {
      const { scrollTop, offsetHeight, scrollHeight } = this.conversation;
      this.atBottom = scrollTop + offsetHeight === scrollHeight;
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.collapsed && !this.props.collapsed) {
      setTimeout(this.scrollToBottom, 700);
    }
    else if (this.atBottom) {
      setTimeout(this.scrollToBottom, 50);
    }
  }

  componentDidMount() {
    setTimeout(this.scrollToBottom, 700);
  }

  handleChat = ({text}) => {
    const { chat } = this.props;
    chat({text});
  }
  
  render() {
    const { overlay, collapsed, chats, playerNamesById, Chat, diceRoller, className } = this.props;
    let toggle = null;
    if (overlay) toggle = (
      <Toggle rx={{collapsed}} onClick={this.handleToggle}>
        {collapsed ? '%' : '^'}
      </Toggle>
    )
    const chatComponents = [];
    let prevPlayerId = null;
    chats.forEach((chat, index) => {
      const { id, playerId, mine } = chat;
      if (playerId !== prevPlayerId) {
        chatComponents.push(
          <Header key={id + "-header"} rx={{mine}}>
            {playerNamesById[playerId]}
          </Header>
        )
      }
      prevPlayerId = playerId;
      chatComponents.push(
        <Chat key={id} newest={index === chats.length - 1} {...{mine}} {...chat}/>
      );
    })
    return (
      <Container rx={{overlay, collapsed}} className={className}>
        {toggle}
        {diceRoller}
        <Body rx={{overlay, collapsed}} className="body">
          <Conversation innerRef={this.handleRef} className="conversation">
            <ChatList className="chat-list">
              {chatComponents}
            </ChatList>
          </Conversation>
          <Divider className="divider"/>
          <Input onChat={this.handleChat} className="input"/>
        </Body>
      </Container>
    );
  }
}

export default Chatbox;