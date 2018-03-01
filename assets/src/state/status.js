import { combineReducers } from 'redux'; 

const SET_UP = "SET_UP";
const SET_DOWN = "SET_DOWN";

export const actions = {
  setUp: SET_UP,
  setDown: [SET_DOWN, "reason"]
};

export const reducer = combineReducers({
  up: (state = null, action) => {
    switch(action.type) {
      case SET_UP:
        return true;
      case SET_DOWN:
        return false;
      default:
        return state;
    }
  },
  message: (state = null, action) => {
    switch(action.type) {
      case SET_UP:
        return null;
      case SET_DOWN:
        return action.reason;
      default:
        return state;
    }
  }
});

const getIsUp = state => state.up;
const getMessage = state => state.message;

export const selectors = {
  getIsUp,
  getMessage
};
