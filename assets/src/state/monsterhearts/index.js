import { combineReducers } from "redux";
import { prefixedActions, prefixedReducer } from "redux-state-tools";
import prefixedMessages from "utils/prefixedMessages";
import * as characters from "./characters";
import * as strings from "./strings";
import mainSelectors from "./selectors";
import * as custom from "./custom";
import { LOAD } from "./actions";
import { slowSocketActions } from "../socketActions";
import * as chatbox from "../chatbox";

export const name = "monsterhearts";

const CHAT = "CHAT";

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
  ...slowSocketActions({
    sendChat: [CHAT, "text"]
  }),
  ...prefixedActions("CUSTOM", custom.actions),
  ...prefixedActions("CHATBOX", chatbox.actions),
  ...prefixedActions("STRING", strings.actions),
  ...prefixedActions("CHARACTER", characters.actions)
};

export const types = {
  LOAD
};

export const messages = {
  ...prefixedMessages("CUSTOM", custom.messages),
  ...prefixedMessages("CHARACTER", characters.messages),
  ...prefixedMessages("STRING", strings.messages)
};

export const reducer = combineReducers({
  characters: prefixedReducer("CHARACTER", characters.reducer, [LOAD]),
  strings: prefixedReducer("STRING", strings.reducer, [LOAD]),
  chatbox: prefixedReducer("CHATBOX", chatbox.reducer),
  custom: prefixedReducer("CUSTOM", custom.reducer, [LOAD]),
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
  definitions: (state = null, action) => {
    switch (action.type) {
      case LOAD:
        return action.definitions;
      default:
        return state;
    }
  }
});

export { mainSelectors as selectors };
