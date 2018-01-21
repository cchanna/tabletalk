import { connect as reduxConnect  } from 'react-redux'
import SocketManager from './SocketManager';

import { connect, disconnect, answer, answerSlow, send, chat } from './actionCreators';

const mapStateToProps = ({path, auth, monsterhearts}, ownProps) => {
  const slug = path[1];
  const { jwt } = auth;
  const { socket } = monsterhearts;
  const { actionQueue, slowActionQueue, actionsById, slowActionsById } = socket;
  return {
    slug, jwt,
    actionQueue, slowActionQueue, actionsById, slowActionsById
  };
};

const dispatch = x => x;

const mapDispatchToProps = {chat, dispatch, connect, disconnect, answer, answerSlow, send, chat};

export default reduxConnect(mapStateToProps, mapDispatchToProps)(SocketManager);