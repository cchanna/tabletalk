import { connect as reduxConnect  } from 'react-redux'
import SocketManager from './SocketManager';
import { fromAuth } from 'Auth';

import { getPath } from 'Routing';
import { forMonsterhearts, fromMonsterhearts } from '../state';

const { 
  connectSocket, 
  disconnectSocket, 
  answerSocketMessage, 
  answerSlowSocketMessage, 
  sendSocketMessages, 
  chat 
} = forMonsterhearts;

const mapStateToProps = (state) => {
  const slug = getPath(state).path[1];
  const jwt = fromAuth.getJwt(state);
  return {
    slug, jwt,
    actionQueue: fromMonsterhearts.getActionQueue(state), 
    slowActionQueue: fromMonsterhearts.getSlowActionQueue(state), 
    actionsById: fromMonsterhearts.getActionsById(state), 
    slowActionsById: fromMonsterhearts.getSlowActionsById(state)
  };
};

const dispatch = x => x;

const mapDispatchToProps = {
  chat, 
  dispatch, 
  connect: connectSocket, 
  disconnect: disconnectSocket, 
  answer: answerSocketMessage, 
  answerSlow: answerSlowSocketMessage, 
  send: sendSocketMessages
};

export default reduxConnect(mapStateToProps, mapDispatchToProps)(SocketManager);
