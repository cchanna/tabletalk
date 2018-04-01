import { connect } from 'react-redux'
import Chatbox from './Chatbox';

import { fromSocket, fromSwords, forSwords } from 'state';

const { 
  listEvents 
} = fromSocket;
const {
  getIsChatboxCollapsed,
  getPlayerNames,
  getMe,
} = fromSwords;
const {
  setChatboxCollapsed,
  chat
} = forSwords;

const mapStateToProps = (state, {overlay}) => ({
  overlay,
  chats: listEvents(state),
  me: getMe(state),
  collapsed: getIsChatboxCollapsed(state),
  playerNames: getPlayerNames(state)
});

const mapDispatchToProps = {setChatboxCollapsed, chat}

export default connect(mapStateToProps, mapDispatchToProps)(Chatbox);