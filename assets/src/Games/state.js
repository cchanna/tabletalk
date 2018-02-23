import { combineReducers } from 'redux';
import { 
  prefixedReducer,  
  prefixedActions, 
  globalizeSelectors 
} from 'utils/stateTools';

const START_LOADING = "START_LOADING";
const SET_LIST = "SET_LIST";
const ADD = "ADD";
const FLAG_RELOAD = "FLAG_RELOAD";
const FAIL_LOADING = "FAIL_LOADING";

const prefix = "GAMES_";

export const forGames = prefixedActions(prefix, {
  startLoading: [START_LOADING],
  setList: [SET_LIST, "list"],
  failLoading: [FAIL_LOADING],
  flagReload: [FLAG_RELOAD],
  add: [ADD, "gamesBySlug", "playersById"]
});


const getPlayer = (state, id) => ({
  id,
  ...state.playersById[id]
});

const getGame = (state, slug) => {
  const { players, ...rest } = state.gamesBySlug[slug];
  return {
    players: players.map(id => getPlayer(state, id)),
    ...rest
  } 
}

const getGames = state => {
  if (!state.list) return null;
  return state.list.map(slug => ({
    slug,
    name: state.gamesBySlug[slug].name
  }));
}

const getIsGameLoaded = (state, id) => !!state.gamesBySlug && !!state.gamesBySlug[id];

const getIsFailed = state => state.error;

const getLastLoaded = state => state.lastLoaded;

export const fromGames = globalizeSelectors(state => state.games, {
  getGame,
  getGames,
  getIsGameLoaded,
  getIsFailed,
  getLastLoaded
});

export const reducer = prefixedReducer(prefix, combineReducers({
  list: (state = null, action) => {
    switch(action.type) {
      case START_LOADING:
        return null;
      case SET_LIST:
        return action.list;
      default:
        return state;
    }
  },

  gamesBySlug: (state = null, action) => {
    switch(action.type) {
      case START_LOADING:
        return null;
      case ADD:
        return {...state, ...action.gamesBySlug}
      default:
        return state;
    }
  },

  playersById: (state = null, action) => {
    switch(action.type) {
      case START_LOADING:
        return null;
      case ADD:
        return {...state, ...action.playersById}
      default:
        return state;
    }
  },

  error: (state = false, action) => {
    switch(action.type) {
      case START_LOADING:
        return false;
      case FAIL_LOADING:
        return true;
      default:
        return state;
    }
  },

  lastLoaded: (state = null, action) => {
    switch(action.type) {
      case SET_LIST:
        return new Date();
      case FLAG_RELOAD:
        return null;
      default:
        return state;
    }
  }
}));
