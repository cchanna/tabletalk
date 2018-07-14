import { connect } from 'react-redux'
import Chatbox from './Chatbox';

import { fromSocket, fromDreamAskew, forDreamAskew } from 'state';

const { 
  listEvents 
} = fromSocket;
const {
  getIsChatboxCollapsed,
  getPlayerNames,
  getCharacterNames,
  getCharacterPronouns,
  getMe,
} = fromDreamAskew;
const {
  setChatboxCollapsed,
  chat
} = forDreamAskew;

const mapStateToProps = (state, {overlay}) => ({
  overlay,
  chats: listEvents(state),
  me: getMe(state),
  collapsed: getIsChatboxCollapsed(state),
  playerNames: getPlayerNames(state),
  characterNames: getCharacterNames(state),
  characterPronouns: getCharacterPronouns(state)
});

const mapDispatchToProps = {setChatboxCollapsed, chat}

export default connect(mapStateToProps, mapDispatchToProps)(Chatbox);