import React, { Component } from "react";
import { bool, func, arrayOf, string, object, number, shape } from "prop-types";
import rx from "resplendence";

import Chat, { chatProperties } from "./Chat";
import BaseChatbox from "common/components/Chatbox";
import DiceRoller from "./DiceRoller";

rx`
@import '~Monsterhearts/fonts';
@import '~Monsterhearts/colors';
`;

const Styling = rx(BaseChatbox)`
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
`;

class Chatbox extends Component {
  static propTypes = {
    overlay: bool.isRequired,
    collapsed: bool.isRequired,
    chats: arrayOf(shape(chatProperties)).isRequired,
    playerNames: object.isRequired,
    characterNames: object.isRequired,
    me: number.isRequired,
    stringsById: object.isRequired,
    setChatboxCollapsed: func.isRequired,
    chat: func.isRequired
  };

  handleChat = ({ text }) => {
    const { chat } = this.props;
    chat({ text });
  };

  render() {
    const { overlay, collapsed } = this.props;
    return (
      <Styling
        {...this.props}
        diceRoller={
          <DiceRoller onChat={this.handleChat} {...{ overlay, collapsed }} />
        }
        Chat={Chat}
      />
    );
  }
}

export default Chatbox;
