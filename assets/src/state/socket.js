import { combineReducers } from 'redux';
import update from 'immutability-helper';

const CONNECT = "CONNECT";
const DISCONNECT = "DISCONNECT";
const QUEUE = "QUEUE";
const QUEUE_SLOW = "QUEUE_SLOW"; 
const ANSWER = "ANSWER";
const ANSWER_SLOW = "ANSWER_SLOW";
const SEND = "SEND";

export const actions = {
  connect: CONNECT,
  disconnect: DISCONNECT,
  answer: [ANSWER, "uniqueId"],
  answerSlow: [ANSWER_SLOW, "uniqueId"],
  send: SEND,
  queueAction: [QUEUE, "action"],
  queueSlowAction: [QUEUE_SLOW, "action"],
};

export const reducer = combineReducers({
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
});

export const selectors = {
  getIsConnected: state => state.connected,
  getSlowActionsById: state => state.slowActionsById,
  getActionsById: state => state.actionsById,
  getSlowActionQueue: state => state.slowActionQueue,
  getActionQueue: state => state.actionQueue
}