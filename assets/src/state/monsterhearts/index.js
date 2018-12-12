import { combineReducers } from "redux";
import { prefixedActions, prefixedReducer } from "redux-state-tools";
import prefixedMessages from "utils/prefixedMessages";
import * as characters from "./characters";
import * as strings from "./strings";
import * as mainSelectors from "./selectors";
import { LOAD } from "./actions";
import { socketActions, slowSocketActions } from "../socketActions";
import * as chatbox from "../chatbox";
import update from "immutability-helper";

export const name = "monsterhearts";

const CHAT = "CHAT";
const CUSTOM_MOVE_EDIT = "CUSTOM_MOVE_EDIT";
const CUSTOM_MOVE_DELETE = "CUSTOM_MOVE_DELETE";

export const actions = {
  resolveLoad: [
    LOAD,
    "players",
    "playersById",
    "chats",
    "chatsById",
    "me",
    "characters",
    "charactersById",
    "definitions",
    "stringsById",
    "strings",
    "movesById",
    "custom"
  ],
  chat: [CHAT, "id", "insertedAt", "playerId", "data"],
  ...socketActions({
    deleteCustomMove: [CUSTOM_MOVE_DELETE, "name"],
    editCustomMove: [CUSTOM_MOVE_EDIT, "name", "text", "notes"]
  }),
  ...slowSocketActions({
    sendChat: [CHAT, "text"]
  }),
  ...prefixedActions("CHATBOX", chatbox.actions),
  ...prefixedActions("STRING", strings.actions),
  ...prefixedActions("CHARACTER", characters.actions)
};

export const types = {
  LOAD
};

export const messages = {
  ...prefixedMessages("CHARACTER", characters.messages),
  ...prefixedMessages("STRING", strings.messages)
};

export const reducer = combineReducers({
  characters: prefixedReducer("CHARACTER", characters.reducer, [LOAD]),
  strings: prefixedReducer("STRING", strings.reducer, [LOAD]),
  chatbox: prefixedReducer("CHATBOX", chatbox.reducer),
  loaded: (state = false, action) => {
    switch (action.type) {
      case LOAD:
        return true;
      case "SOCKET_DISCONNECT":
        return false;
      default:
        return state;
    }
  },
  players: (state = null, action) => {
    switch (action.type) {
      case LOAD:
        return action.players;
      default:
        return state;
    }
  },
  playersById: (state = null, action) => {
    switch (action.type) {
      case LOAD:
        return action.playersById;
      default:
        return state;
    }
  },
  chats: (state = [], action) => {
    switch (action.type) {
      default:
        return state;
    }
  },
  chatsById: (state = {}, action) => {
    switch (action.type) {
      default:
        return state;
    }
  },
  me: (state = null, action) => {
    switch (action.type) {
      case LOAD:
        return action.me;
      default:
        return state;
    }
  },
  custom: combineReducers({
    movesByName: (state = {}, action) => {
      switch (action.type) {
        case LOAD:
          return action.custom.movesByName;
        case CUSTOM_MOVE_EDIT:
          return update(state, {
            [action.name]: {
              $set: {
                text: action.text,
                notes: action.notes
              }
            }
          });
        case CUSTOM_MOVE_DELETE:
          return update(state, {
            $unset: [action.name]
          });
        default:
          return state;
      }
    }
  }),
  definitions: (state = null, action) => {
    switch (action.type) {
      case LOAD:
        return action.definitions;
      default:
        return state;
    }
  }
});

export const selectors = {
  ...mainSelectors
};
