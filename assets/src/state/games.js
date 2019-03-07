import { combineReducers } from "redux";

const START_LOADING = "START_LOADING";
const SET_LIST = "SET_LIST";
const ADD = "ADD";
const FLAG_RELOAD = "FLAG_RELOAD";
const FAIL_LOADING = "FAIL_LOADING";

export const actions = {
  startLoading: [START_LOADING],
  setList: [SET_LIST, "list"],
  failLoading: [FAIL_LOADING],
  flagReload: [FLAG_RELOAD],
  add: [ADD, "gamesBySlug", "playersById"]
};

export const reducer = combineReducers({
  list: (state = null, action) => {
    switch (action.type) {
      case START_LOADING:
        return null;
      case SET_LIST:
        return action.list;
      default:
        return state;
    }
  },

  gamesBySlug: (state = {}, action) => {
    switch (action.type) {
      case START_LOADING:
        return {};
      case ADD:
        return { ...state, ...action.gamesBySlug };
      default:
        return state;
    }
  },

  playersById: (state = null, action) => {
    switch (action.type) {
      case START_LOADING:
        return null;
      case ADD:
        return { ...state, ...action.playersById };
      default:
        return state;
    }
  },

  error: (state = false, action) => {
    switch (action.type) {
      case START_LOADING:
        return false;
      case FAIL_LOADING:
        return true;
      default:
        return state;
    }
  },

  lastLoaded: (state = null, action) => {
    switch (action.type) {
      case SET_LIST:
        return new Date();
      case FLAG_RELOAD:
        return null;
      default:
        return state;
    }
  }
});

const getPlayer = (state, id) => ({
  id,
  ...state.playersById[id]
});

const getGamesBySlug = state => state.gamesBySlug;

const getGame = (state, slug) => {
  if (slug === "new") return null;
  const gamesBySlug = getGamesBySlug(state);
  if (!gamesBySlug) return null;
  const game = gamesBySlug[slug];
  if (!game) return null;
  const { players, ...rest } = gamesBySlug[slug];
  return {
    players: players.map(id => getPlayer(state, id)),
    ...rest
  };
};
const getGames = state => {
  if (!state.list) return null;
  return state.list.map(slug => ({
    slug,
    name: state.gamesBySlug[slug].name
  }));
};

const getIsGameLoaded = (state, id) =>
  !!state.gamesBySlug && !!state.gamesBySlug[id];

const getIsFailed = state => state.error;

const getLastLoaded = state => state.lastLoaded;

export const selectors = {
  getGame,
  getGamesBySlug,
  getGames,
  getIsGameLoaded,
  getIsFailed,
  getLastLoaded
};
