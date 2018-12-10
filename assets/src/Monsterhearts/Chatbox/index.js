import { connect } from "react-redux";
import Chatbox from "./Chatbox";

import { forMonsterhearts, fromMonsterhearts, fromSocket } from "state";
const { setChatboxCollapsed, sendChat } = forMonsterhearts;

const mapStateToProps = (state, { overlay }) => ({
  overlay,
  collapsed: fromMonsterhearts.getIsChatboxCollapsed(state),
  playerNames: fromMonsterhearts.getPlayerNamesById(state),
  characterNames: fromMonsterhearts.getCharacterNames(state),
  chats: fromSocket.listEvents(state),
  me: fromMonsterhearts.getMe(state),
  stringsById: fromMonsterhearts.getStringsById(state)
});

const mapDispatchToProps = { setChatboxCollapsed, chat: sendChat };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chatbox);
