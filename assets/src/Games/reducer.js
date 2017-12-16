import { combineReducers } from 'redux';
import {
  GAMES_START_LOADING,
  GAMES_SET_LIST,
  GAMES_ADD,
  GAMES_FLAG_RELOAD,
  GAMES_FAIL_LOADING
} from 'common/actions';

export default combineReducers({
  list: (state = null, action) => {
    switch(action.type) {
      case GAMES_START_LOADING:
        return null;
      case GAMES_SET_LIST:
        return action.list;
      default:
        return state;
    }
  },

  gamesBySlug: (state = null, action) => {
    switch(action.type) {
      case GAMES_START_LOADING:
        return null;
      case GAMES_ADD:
        return {...state, ...action.gamesBySlug}
      default:
        return state;
    }
  },

  playersById: (state = null, action) => {
    switch(action.type) {
      case GAMES_START_LOADING:
        return null;
      case GAMES_ADD:
        return {...state, ...action.playersById}
      default:
        return state;
    }
  },

  error: (state = false, action) => {
    switch(action.type) {
      case GAMES_START_LOADING:
        return false;
      case GAMES_FAIL_LOADING:
        return true;
      default:
        return state;
    }
  },

  lastLoaded: (state = null, action) => {
    switch(action.type) {
      case GAMES_SET_LIST:
        return new Date();
      case GAMES_FLAG_RELOAD:
        return null;
      default:
        return state;
    }
  }

})