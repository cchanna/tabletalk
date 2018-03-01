import { combineReducers } from "redux";
import { prefixedActions, prefixedReducer } from 'utils/stateTools';
import * as characters from './characters';
import * as strings from './strings';
import update from 'immutability-helper';
import * as mainSelectors from './selectors';
import { LOAD } from './actions';
import { slowSocketActions } from './socketActions';

export const name = "monsterhearts";

const CHATBOX_SET_COLLAPSED = "CHATBOX_SET_COLLAPSED";

const CHAT = "CHAT";

export const actions = {
  resolveLoad: [
    LOAD, 
    "players", "playersById", "chats", "chatsById", "me",
    "characters", "charactersById", "definitions", "stringsById", "strings", "movesById"
  ],
  setChatboxCollapsed: [CHATBOX_SET_COLLAPSED, "collapsed"],
  chat: [CHAT, "id", "insertedAt", "playerId", "talk", "roll"],
  ...slowSocketActions({
    sendChat: [CHAT, "text"],
  }),
  ...prefixedActions("STRING", strings.actions),
  ...prefixedActions("CHARACTER", characters.actions)
};

export const reducer = combineReducers({
  characters: prefixedReducer("CHARACTER", characters.reducer, [LOAD]),
  strings: prefixedReducer("STRING", strings.reducer, [LOAD]),
  loaded: (state = false, action) => {
    switch(action.type) {
      case LOAD:
        return true;
      case "SOCKET_DISCONNECT":
        return false;
      default:
        return state;
    }
  },
  chatboxCollapsed: (state = true, action) => {
    switch(action.type) {
      case CHATBOX_SET_COLLAPSED:
        return action.collapsed;
      default:
        return state;  
    }
  },
  players: (state = null, action) => {
    switch(action.type) {
      case LOAD:
        return action.players;
      default: return state;
    }
  },
  playersById: (state = null, action) => {
    switch(action.type) {
      case LOAD:
        return action.playersById;
      default: return state;
    }
  },
  chats: (state = null, action) => {
    switch(action.type) {
      case LOAD:
        return action.chats;
      case CHAT:
        return [...state, action.id];
      default: return state;
    }
  },
  chatsById: (state = null, action) => {
    switch(action.type) {
      case LOAD:
        return action.chatsById;
      case CHAT:
        return update(state, {
          [action.id]: {
            $set: {
              insertedAt: action.insertedAt,
              playerId: action.playerId,
              talk: action.talk,
              roll: action.roll
            }
          }
        })
      default: return state;
    }
  },
  me: (state = null, action) => {
    switch(action.type) {
      case LOAD:
        return action.me;
      default: return state;
    }
  },
  
  definitions: (state = null, action) => {
    switch(action.type) {
      case LOAD:
        return action.definitions;
      default: return state;
    }
  }
});



export const selectors = {
  ...mainSelectors,
}