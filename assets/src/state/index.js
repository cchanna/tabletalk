import { combineReducers } from "redux";
import * as auth from "./auth";
import * as games from "./games";
import * as routing from "./routing";
import * as socket from "./socket";
import * as monsterhearts from "./monsterhearts";
import * as swords from "./swords";
import * as dreamAskew from "./dreamAskew";
import {
  prefixedReducer,
  prefixedSelectors,
  prefixedTypes,
  prefixedActionCreators
} from "redux-state-tools";
import { pagedReducer, pagedSelectors } from "utils/pagedReducer";
import prefixedMessages from "utils/prefixedMessages";

export const forAuth = prefixedActionCreators("AUTH", auth.actions);
export const fromAuth = prefixedSelectors("auth", auth.selectors);

export const forGames = prefixedActionCreators("GAMES", games.actions);
export const fromGames = prefixedSelectors("games", games.selectors);

export const forRouting = prefixedActionCreators("ROUTING", routing.actions);
export const fromRouting = prefixedSelectors("routing", routing.selectors);

export const forSocket = prefixedActionCreators("SOCKET", socket.actions);
export const fromSocket = prefixedSelectors("socket", socket.selectors);

export const monsterheartsTypes = prefixedTypes(
  "MONSTERHEARTS",
  monsterhearts.types
);
export const monsterheartsMessages = prefixedMessages(
  "MONSTERHEARTS",
  monsterhearts.messages
);
export const forMonsterhearts = prefixedActionCreators(
  "MONSTERHEARTS",
  monsterhearts.actions
);
export const fromMonsterhearts = pagedSelectors(
  "game",
  monsterheartsTypes.LOAD,
  monsterhearts.selectors
);

export const dreamAskewMessages = prefixedMessages(
  "DREAM_ASKEW",
  dreamAskew.messages
);
export const forDreamAskew = prefixedActionCreators(
  "DREAM_ASKEW",
  dreamAskew.actions
);
export const fromDreamAskew = pagedSelectors(
  "game",
  "DREAM_ASKEW_LOAD",
  dreamAskew.selectors
);

export const swordsMessages = prefixedMessages("SWORDS", swords.messages);
export const forSwords = prefixedActionCreators("SWORDS", swords.actions);
export const fromSwords = pagedSelectors(
  "game",
  "SWORDS_LOAD",
  swords.selectors
);

export const reducer = combineReducers({
  auth: prefixedReducer("AUTH", auth.reducer),
  routing: prefixedReducer("ROUTING", routing.reducer),
  games: prefixedReducer("GAMES", games.reducer),
  socket: prefixedReducer("SOCKET", socket.reducer),
  game: pagedReducer({
    [monsterheartsTypes.LOAD]: prefixedReducer(
      "MONSTERHEARTS",
      monsterhearts.reducer,
      ["SOCKET_DISCONNECT"]
    ),
    SWORDS_LOAD: prefixedReducer("SWORDS", swords.reducer),
    DREAM_ASKEW_LOAD: prefixedReducer("DREAM_ASKEW", dreamAskew.reducer)
  })
});
