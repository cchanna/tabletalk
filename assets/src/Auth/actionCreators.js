import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_GOOGLE,
  LOGIN_READY,
  LOGOUT
} from "common/actions"

import actionCreator from 'utils/actionCreator';
import api from 'Auth/api';
import catchStatus from 'common/catchStatus';

const startLogin = actionCreator(LOGIN_START);
const setJWT = actionCreator(LOGIN_SUCCESS, "jwt");
const failLogin = actionCreator(LOGIN_FAIL);
const doLogout = actionCreator(LOGOUT);

export const login = () => (dispatch, getState) => {
  const { auth } = getState();
  const { googleJwt } = auth;
  if (googleJwt) {
    dispatch(startLogin());
    api.login("google", googleJwt)
    .then(({jwt}) => dispatch(setJWT({jwt})))
    .catch(catchStatus(dispatch))
    .catch(() => dispatch(failLogin()));
  }
}

export const loginReady = actionCreator(LOGIN_READY);

export const setGoogleJWT = actionCreator(LOGIN_GOOGLE, "jwt");

export const signout = () => (dispatch, getState) => {
  const {auth} = getState();
  dispatch(doLogout());
  if (auth.googleJwt && window.gapi) {
    window.gapi.auth2.getAuthInstance().signOut();
  }
}