import { combineReducers } from 'redux';
import * as auth from './auth';
import * as games from './games';
import * as routing from './routing';
import * as socket from './socket';
import * as status from './status';
import * as monsterhearts from './monsterhearts';
import { prefixedReducer, prefixedSelectors, prefixedActionCreators } from 'redux-state-tools';


export const forAuth = prefixedActionCreators("AUTH", auth.actions);
export const fromAuth = prefixedSelectors("auth", auth.selectors);

export const forGames = prefixedActionCreators("GAMES", games.actions);
export const fromGames = prefixedSelectors("games", games.selectors);

export const forRouting = prefixedActionCreators("ROUTING", routing.actions);
export const fromRouting = prefixedSelectors("routing", routing.selectors);

export const forSocket = prefixedActionCreators("SOCKET", socket.actions);
export const fromSocket = prefixedSelectors("socket", socket.selectors);

export const forStatus = prefixedActionCreators("STATUS", status.actions);
export const fromStatus = prefixedSelectors("status", status.selectors);


export const forMonsterhearts = prefixedActionCreators("MONSTERHEARTS", monsterhearts.actions);
export const fromMonsterhearts = prefixedSelectors("monsterhearts", monsterhearts.selectors);

export const reducer = combineReducers({
  auth: prefixedReducer("AUTH", auth.reducer),
  routing: prefixedReducer("ROUTING", routing.reducer),
  games: prefixedReducer("GAMES", games.reducer), 
  socket: prefixedReducer("SOCKET", socket.reducer),
  status: prefixedReducer("STATUS", status.reducer), 
  monsterhearts: prefixedReducer("MONSTERHEARTS", monsterhearts.reducer, ["SOCKET_DISCONNECT"])
});
