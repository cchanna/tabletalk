import { combineReducers } from 'redux'; 
import { 
  prefixedReducer, 
  prefixedActions, 
  globalizeSelectors 
} from 'utils/stateTools';


export const name = "status";
const prefix = "";

const SET_UP = "SET_UP";
const SET_DOWN = "SET_DOWN";

const getIsUp = state => state.up;
const getMessage = state => state.message;

export const fromStatus = globalizeSelectors(state => state[name], {
  getIsUp,
  getMessage
});

export const forStatus = prefixedActions(prefix, {
  setStatusUp: SET_UP,
  setStatusDown: [SET_DOWN, "reason"]
});

export const reducer = prefixedReducer(prefix, combineReducers({
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
        return true;
      case SET_DOWN:
        return action.reason;
      default:
        return state;
    }
  }
}))