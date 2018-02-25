import { combineReducers } from "redux";
import { 
  prefixedReducer,  
  prefixActions,
  actions, 
  globalizeSelectors,
  actionCreator
} from 'utils/stateTools';
import {
  reducer as socketReducer,
  actions as socketActions,
  types as socketTypes,
  selectors as socketSelectors
} from './socket';
import {
  reducer as characterReducer,
  actions as characterActions
} from './characters';
import update from 'immutability-helper';
import * as selectors from './selectors';
import { LOAD } from './actions';

export const name = "monsterhearts";

const CHATBOX_SET_COLLAPSED = "CHATBOX_SET_COLLAPSED";
const STRING_ADD = "STRING_ADD";
const STRING_SPEND = "STRING_SPEND";
const STRING_CREATE = "STRING_CREATE";
const STRING_DELETE = "STRING_DELETE";
const CHAT = "CHAT";

const prefix = "MONSTERHEARTS_";

const randomString = (length, chars) => {
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}
const randomUniqueId = () => randomString(36, "abcdefghijklmnopqrstuvwxyz0123456789")

const serverActionCreator = (...actionCreatorArgs) => {
  const thisActionCreator = actionCreator(...actionCreatorArgs); 
  return (...actionArgs) => dispatch => {
    const action = thisActionCreator(...actionArgs);
    action.uniqueId = randomUniqueId();
    dispatch(forMonsterhearts.queueAction({action}));
    dispatch(action);
  }
}

const slowServerActionCreator = (...actionCreatorArgs) => {
  const thisActionCreator = actionCreator(...actionCreatorArgs); 
  return (...actionArgs) => dispatch => {
    const action = thisActionCreator(...actionArgs);
    action.uniqueId = randomUniqueId();
    dispatch(forMonsterhearts.queueSlowAction({action}));
    return action.uniqueId;
  };
}

const serverActions = args => actions(args, serverActionCreator);
const slowActions = args => actions(args, slowServerActionCreator);

const charactersPrefix = "CHARACTER_";

export const forMonsterhearts = {
  ...actions(prefixActions(prefix, {
    resolveLoad: [
      LOAD, 
      "players", "playersById", "chats", "chatsById", "me",
      "characters", "charactersById", "definitions", "stringsById", "strings", "movesById"
    ],
    queueAction: [socketTypes.QUEUE, "action"],
    queueSlowAction: [socketTypes.QUEUE_SLOW, "action"],
    setChatboxCollapsed: [CHATBOX_SET_COLLAPSED, "collapsed"],
    chat: [CHAT, "id", "insertedAt", "playerId", "talk", "roll"],
    ...socketActions,
    ...prefixActions(charactersPrefix, characterActions.normal)
  })),
  ...serverActions(prefixActions(prefix, {
    addString: [STRING_ADD, "id"],
    spendString: [STRING_SPEND, "id"],
    deleteString: [STRING_DELETE, "id"],
    ...prefixActions(charactersPrefix, characterActions.server)
  })),
  ...slowActions(prefixActions(prefix, {
    sendChat: [CHAT, "text"],
    createString: [STRING_CREATE, "to", "from"],
    ...prefixActions(charactersPrefix, characterActions.slow)
  }))
};

export const fromMonsterhearts = globalizeSelectors(state => state[name], {
  ...selectors,
  ...globalizeSelectors(state => state.socket, socketSelectors)
});

export const reducer = prefixedReducer(prefix, combineReducers({
  socket: socketReducer,
  characters: prefixedReducer(charactersPrefix, characterReducer, [LOAD]),
  loaded: (state = false, action) => {
    switch(action.type) {
      case LOAD:
        return true;
      case socketTypes.DISCONNECT:
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
  stringsById: (state = null, action) => {
    switch(action.type) {
      case LOAD:
        return action.stringsById;
      case STRING_ADD: {
        const string = state[action.id];
        return {
          ...state,
          [action.id]: {
            ...string,
            value: string.value + 1
          }
        }
      }
      case STRING_SPEND: {
        const string = state[action.id];
        return {
          ...state,
          [action.id]: {
            ...string,
            value: string.value - 1
          }
        }
      }
      case STRING_CREATE:
        return {
          ...state,
          [action.id]: {
            to: action.to,
            from: action.from,
            value: action.value
          }
        }
      default: return state;
    }
  },
  strings: (state = null, action) => {
    switch(action.type) {
      case LOAD:
        return action.strings;
      case STRING_CREATE:
        return [...state, action.id];
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
}));