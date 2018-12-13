import { combineReducers } from "redux";

const SUCCESS = "SUCCESS";
const LOGOUT = "LOGOUT";
const STATUS_UNKNOWN_SET = "STATUS_UNKNOWN_SET";

export const actions = {
  setJWT: [SUCCESS, "jwt"],
  logout: LOGOUT,
  setStatusUnknown: [STATUS_UNKNOWN_SET, "value"]
};

export const reducer = combineReducers({
  jwt: (state = null, action) => {
    switch (action.type) {
      case SUCCESS:
        return action.jwt;
      case LOGOUT:
        return null;
      default:
        return state;
    }
  },

  statusUnknown: (state = true, action) => {
    switch (action.type) {
      case STATUS_UNKNOWN_SET:
        return action.value;
      default:
        return state;
    }
  }
});

const getJwt = state => state.jwt;
const getIsLoggedIn = state => !!state.jwt;
const getIsStatusUnknown = state => state.statusUnknown;

export const selectors = {
  getJwt,
  getIsLoggedIn,
  getIsStatusUnknown
};
