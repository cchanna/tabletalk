import { combineReducers } from 'redux';
import update from 'immutability-helper';

import {
  MONSTERHEARTS_SOCKET_CONNECT,
  MONSTERHEARTS_SOCKET_DISCONNECT,
  MONSTERHEARTS_SOCKET_QUEUE,
  MONSTERHEARTS_SOCKET_QUEUE_SLOW, 
  MONSTERHEARTS_SOCKET_ANSWER,
  MONSTERHEARTS_SOCKET_ANSWER_SLOW,
  MONSTERHEARTS_SOCKET_SEND
} from 'common/actions';

export default combineReducers({
  connected: (state = false, action) => {
    switch(action.type) {
      case MONSTERHEARTS_SOCKET_CONNECT:
        return true;
      case MONSTERHEARTS_SOCKET_DISCONNECT:
        return false
      default:
        return state;
    }
  },
  actionQueue: (state = [], action) => {
    switch(action.type) {
      case MONSTERHEARTS_SOCKET_QUEUE:
        return update(state, {$push: [action.action.uniqueId]});
      case MONSTERHEARTS_SOCKET_SEND:
        return [];
      default:
        return state;
    }
  },
  slowActionQueue: (state = [], action) => {
    switch(action.type) {
      case MONSTERHEARTS_SOCKET_QUEUE_SLOW:
        return update(state, {$push: [action.action.uniqueId]});
      case MONSTERHEARTS_SOCKET_SEND:
        return [];
      default:
        return state;
    }
  },
  actionsById: (state = {}, action) => {
    switch(action.type) {
      case MONSTERHEARTS_SOCKET_QUEUE: 
        return update(state, {[action.action.uniqueId]: {$set: action.action}});
      case MONSTERHEARTS_SOCKET_ANSWER:
        return update(state, {$unset: [action.uniqueId]});
      default: 
        return state;
    }
  },
  slowActionsById: (state = {}, action) => {
    switch(action.type) {
      case MONSTERHEARTS_SOCKET_QUEUE_SLOW: 
        return update(state, {[action.action.uniqueId]: {$set: action.action}})
      case MONSTERHEARTS_SOCKET_ANSWER_SLOW: 
        return update(state, {$unset: [action.uniqueId]})
      default:
        return state;
    }
  }
})