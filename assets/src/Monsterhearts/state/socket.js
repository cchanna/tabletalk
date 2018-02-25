import { combineReducers } from 'redux';
import update from 'immutability-helper';
import { 
  prefixedReducer,  
  prefixActions,
  prefixTypes
} from 'utils/stateTools';

const CONNECT = "CONNECT";
const DISCONNECT = "DISCONNECT";
const QUEUE = "QUEUE";
const QUEUE_SLOW = "QUEUE_SLOW"; 
const ANSWER = "ANSWER";
const ANSWER_SLOW = "ANSWER_SLOW";
const SEND = "SEND";

const prefix = "SOCKET_";

export const actions = prefixActions(prefix, {
  connectSocket: CONNECT,
  disconnectSocket: DISCONNECT,
  answerSocketMessage: [ANSWER, "uniqueId"],
  answerSlowSocketMessage: [ANSWER_SLOW, "uniqueId"],
  sendSocketMessages: SEND
});
export const types = prefixTypes(prefix, [
  QUEUE,
  QUEUE_SLOW,
  DISCONNECT
])

export const selectors = {
  getIsSocketConnected: state => state.connected,
  getSlowActionsById: state => state.slowActionsById,
  getActionsById: state => state.actionsById,
  getSlowActionQueue: state => state.slowActionQueue,
  getActionQueue: state => state.actionQueue
}

export const reducer = prefixedReducer(prefix, combineReducers({
  connected: (state = false, action) => {
    switch(action.type) {
      case CONNECT:
        return true;
      case DISCONNECT:
        return false
      default:
        return state;
    }
  },
  actionQueue: (state = [], action) => {
    switch(action.type) {
      case QUEUE:
        return update(state, {$push: [action.action.uniqueId]});
      case SEND:
        return [];
      default:
        return state;
    }
  },
  slowActionQueue: (state = [], action) => {
    switch(action.type) {
      case QUEUE_SLOW:
        return update(state, {$push: [action.action.uniqueId]});
      case SEND:
        return [];
      default:
        return state;
    }
  },
  actionsById: (state = {}, action) => {
    switch(action.type) {
      case QUEUE: 
        return update(state, {[action.action.uniqueId]: {$set: action.action}});
      case ANSWER:
        return update(state, {$unset: [action.uniqueId]});
      default: 
        return state;
    }
  },
  slowActionsById: (state = {}, action) => {
    switch(action.type) {
      case QUEUE_SLOW: 
        return update(state, {[action.action.uniqueId]: {$set: action.action}})
      case ANSWER_SLOW: 
        return update(state, {$unset: [action.uniqueId]})
      default:
        return state;
    }
  }
}));