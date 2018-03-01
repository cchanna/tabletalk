import { combineReducers } from 'redux';

const START = "START";
const SUCCESS = "SUCCESS";
const FAIL = "FAIL";
const GOOGLE = "GOOGLE";
const READY = "READY";
const LOGOUT = "LOGOUT";

export const actions = {
  startLogin: START,
  setJWT: [SUCCESS, "jwt"],
  failLogin: FAIL,
  logout: LOGOUT,
  loginReady: READY,
  setGoogleJWT: [GOOGLE, "jwt"]
};

export const reducer = combineReducers({
  ready: (state = false, action) => {
    switch(action.type) {
      case READY:
        return true;
      default: 
        return state;
    }
  },

  pending: (state = false, action) => {
    switch(action.type) {
      case START: 
        return true;
      case SUCCESS:
      case FAIL: 
        return false;
      default:
        return state;
    }
  },

  googleJwt: (state = null, action) => {
    switch(action.type) {
      case GOOGLE:
        return action.jwt;
      case LOGOUT:
        return null;
      default:
        return state;
    }
  },

  jwt: (state = null, action) => {
    switch(action.type) {
      case SUCCESS: 
        return action.jwt;
      case LOGOUT:
        return null;
      default:
        return state;
    }
  },

  error: (state = false, action) => {
    switch(action.type) {
      case START:
        return false;
      case FAIL:
        return true;
      default:
        return state;
    }
  }
});


const getJwt = state => state.jwt;
const getIsLoggingIn = state => state.pending;
const getIsFailed = state => state.error;
const getGoogleJwt = state => state.googleJwt;
const getIsLoggedInWithGoogle = state => !!getGoogleJwt(state);
const getIsLoggedIn = state => !!state.jwt;
const getIsReady = state => state.ready; 

export const selectors = {
  getJwt,
  getIsFailed,
  getIsLoggingIn,
  getGoogleJwt,
  getIsLoggedInWithGoogle,
  getIsLoggedIn,
  getIsReady
};