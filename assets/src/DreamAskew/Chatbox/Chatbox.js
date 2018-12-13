import React, { Component } from "react";
import { bool, func, arrayOf, string, object, number, shape } from "prop-types";
import rx from "resplendence";

import Chat, { chatProperties } from "./Chat";
import BaseChatbox from "common/components/Chatbox";

rx`
@import '~DreamAskew/styles';
`;

const Styling = rx(BaseChatbox)`
  font-family: $body;
  color: $background;
  background: $foreground;
  .toggle {
    color: $background;
    background-color: $foreground;
    &.notify {
      background-color: $background;
      color: $foreground;
    }
  }
  .header {
    width: 100%;
    box-sizing: border-box;
    border-bottom: 2px solid $foreground;
    margin-bottom: 2px;
    &.mine {
      padding-left: 18px;
      &:after {
        content: "*";
        font-family: "icomoon";
        position: absolute;
        left: 0;
        top: 0;
      }
    }
  }
  .input {
    font-family: $body;
    color: $background;
    background-color: $foreground;
    &::placeholder {
      color: $background;
    }
  }
  .divider {
    border-color: $background;
    background: $background;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, .5);
    &:hover {
      background: rgba(0, 0, 0, .25);
    }
  }
`;

class Chatbox extends Component {
  static propTypes = {
    overlay: bool.isRequired,
    collapsed: bool.isRequired,
    chats: arrayOf(shape(chatProperties)).isRequired,
    setChatboxCollapsed: func.isRequired,
    chat: func.isRequired
  };

  handleChat = ({ text }) => {
    const { chat } = this.props;
    chat({ text });
  };

  render() {
    return <Styling {...this.props} Chat={Chat} />;
  }
}

export default Chatbox;
