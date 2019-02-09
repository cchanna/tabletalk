import React, { Component } from "react";
import { bool, func, arrayOf, string, object, number, shape } from "prop-types";
import rx from "resplendence";

import Chat, { chatProperties } from "./Chat";
import BaseChatbox from "common/components/Chatbox";

rx`
@import '~Swords/styles';
`;

const Styling = rx(BaseChatbox)`
  font-family: $body;
  color: black;
  background: white;
  .toggle {
    color: black;
    background-color: black;
    &.notify {
      background-color: white;
      color: black;
    }
  }
  .header {
    width: 100%;
    box-sizing: border-box;
    border-bottom: 2px solid black;
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
    color: black;
    background-color: white;
    &::placeholder {
      color: black;
    }
  }
  .divider {
    border-color: black;
    background: black;
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
