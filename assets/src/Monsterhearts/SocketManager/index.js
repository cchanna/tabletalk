import { connect as reduxConnect  } from 'react-redux'
import SocketManager from './SocketManager';
import { fromAuth } from 'Auth';

import { connect, disconnect, answer, answerSlow, send, chat } from './actionCreators';

const mapStateToProps = (state) => {
  const {path, monsterhearts} = state;
  const slug = path[1];
  const jwt = fromAuth.getJwt(state);
  const { socket } = monsterhearts;
  const { actionQueue, slowActionQueue, actionsById, slowActionsById } = socket;
  return {
    slug, jwt,
    actionQueue, slowActionQueue, actionsById, slowActionsById
  };
};

const dispatch = x => x;

const mapDispatchToProps = {chat, dispatch, connect, disconnect, answer, answerSlow, send};

export default reduxConnect(mapStateToProps, mapDispatchToProps)(SocketManager);