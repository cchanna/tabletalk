import { connect as reduxConnect  } from 'react-redux'
import SocketManager from './Socket';
import { fromAuth } from 'state';

import { getPath } from 'Routing';
import { forMonsterhearts, forSocket, fromSocket } from 'state';

const { 
  chat 
} = forMonsterhearts;
const {
  connect, 
  disconnect, 
  answer, 
  answerSlow, 
  send, 
  handle
} = forSocket;

const mapStateToProps = (state) => {
  const slug = getPath(state).path[1];
  const jwt = fromAuth.getJwt(state);
  return {
    slug, jwt,
    actionQueue: fromSocket.getActionQueue(state), 
    slowActionQueue: fromSocket.getSlowActionQueue(state), 
    actionsById: fromSocket.getQueuedActionsById(state), 
    slowActionsById: fromSocket.getSlowActionsById(state)
  };
};

const dispatch = x => x;

const mapDispatchToProps = {
  chat, 
  dispatch, 
  connect, 
  disconnect, 
  answer, 
  answerSlow, 
  send,
  handle
};

export default reduxConnect(mapStateToProps, mapDispatchToProps)(SocketManager);
