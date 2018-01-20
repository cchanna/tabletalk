import { connect } from 'react-redux'
import Chatbox from './Chatbox';

import { setChatboxCollapsed, chat } from './actionCreators';

const mapStateToProps = ({monsterhearts}, {overlay}) => {
  const { chatboxCollapsed, playersById, chats, chatsById, me } = monsterhearts;
  return {
    overlay,
    collapsed: chatboxCollapsed,
    playersById,
    chats,
    chatsById,
    me
  };
};

const mapDispatchToProps = {setChatboxCollapsed, chat}

export default connect(mapStateToProps, mapDispatchToProps)(Chatbox);