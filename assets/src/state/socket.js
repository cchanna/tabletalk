import { combineReducers } from 'redux';
import update from 'immutability-helper';

const EVENTS_LOAD = "EVENTS_LOAD";
const CONNECT = "CONNECT";
const DISCONNECT = "DISCONNECT";
const QUEUE = "QUEUE";
const QUEUE_SLOW = "QUEUE_SLOW"; 
const ANSWER = "ANSWER";
const ANSWER_SLOW = "ANSWER_SLOW";
const HANDLE = "HANDLE";
const SEND = "SEND";

export const actions = {
  connect: CONNECT,
  disconnect: DISCONNECT,
  handle: [HANDLE, "id", "tempId", "playerId", "insertedAt", "data"],
  answer: [ANSWER, "id", "tempId", "playerId", "insertedAt", "data"],
  answerSlow: [ANSWER_SLOW, "id", "tempId", "playerId", "insertedAt", "data"],
  send: SEND,
  queueAction: [QUEUE, "tempId", "data"],
  queueSlowAction: [QUEUE_SLOW, "tempId", "data"],
  loadEvents: [EVENTS_LOAD, "ids", "byId"]
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
  actionIds: (state = [], action) => {
    switch(action.type) {
      case HANDLE:
      case ANSWER:
      case ANSWER_SLOW:
        return [...state, action.id];
      case EVENTS_LOAD:
        return action.ids;
      default:
        return state;
    }
  },
  actionsById: (state = {}, action) => {
    switch(action.type) {
      case HANDLE:
      case ANSWER:
      case ANSWER_SLOW:
        return {
          ...state,
          [action.id]: {
            id: action.id,
            playerId: action.playerId,
            insertedAt: action.insertedAt,
            data: action.data
          }
        }
      case EVENTS_LOAD:
        return action.byId
      default:
        return state;
    }
  },
  actionQueue: (state = [], action) => {
    switch(action.type) {
      case QUEUE:
        return update(state, {$push: [action.tempId]});
      case SEND:
        return [];
      default:
        return state;
    }
  },
  slowActionQueue: (state = [], action) => {
    switch(action.type) {
      case QUEUE_SLOW:
        return update(state, {$push: [action.tempId]});
      case SEND:
        return [];
      default:
        return state;
    }
  },
  queuedActionsById: (state = {}, action) => {
    switch(action.type) {
      case QUEUE: 
        return update(state, {[action.tempId]: {$set: action.data}});
      case ANSWER:
        return update(state, {$unset: [action.tempId]});
      default: 
        return state;
    }
  },
  slowActionsById: (state = {}, action) => {
    switch(action.type) {
      case QUEUE_SLOW: 
        return update(state, {[action.tempId]: {$set: action.data}})
      case ANSWER_SLOW: 
        return update(state, {$unset: [action.tempId]})
      default:
        return state;
    }
  }
});

export const selectors = {
  getIsConnected: state => state.connected,
  getSlowActionsById: state => state.slowActionsById,
  getQueuedActionsById: state => state.queuedActionsById,
  getSlowActionQueue: state => state.slowActionQueue,
  getActionQueue: state => state.actionQueue,
  listEvents: state => state.actionIds.map(id => state.actionsById[id])
}