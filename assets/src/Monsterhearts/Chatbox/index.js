import { connect } from 'react-redux'
import Chatbox from './Chatbox';

import { forMonsterhearts, fromMonsterhearts } from 'state';
const { setChatboxCollapsed, sendChat } = forMonsterhearts;

const mapStateToProps = (state, {overlay}) => {
  return {
    overlay,
    collapsed: fromMonsterhearts.getIsChatboxCollapsed(state),
    playerNamesById: fromMonsterhearts.getPlayerNamesById(state),
    chats: fromMonsterhearts.getChats(state),
  };
};

const mapDispatchToProps = {setChatboxCollapsed, chat: sendChat}

export default connect(mapStateToProps, mapDispatchToProps)(Chatbox);