import { forAuth, fromAuth } from 'state';
import { get } from 'common/api';

const {
  startLogin,
  setJWT,
  failLogin,
  logout,
  loginReady,
  setGoogleJWT
} = forAuth;

export { setGoogleJWT, loginReady };

export const login = () => (dispatch, getState) => {
  const state = getState();
  const googleJwt = fromAuth.getGoogleJwt(state);
  if (googleJwt) {
    dispatch(startLogin());
    dispatch(get("login", {queries: {provider: "google", jwt: googleJwt}, baseUrl: "auth"}))
      .then(({jwt}) => dispatch(setJWT({jwt})))
      .catch(() => dispatch(failLogin()));
  }
}

export const signout = () => (dispatch, getState) => {
  const loggedInWithGoogle = fromAuth.getIsLoggedInWithGoogle(getState());
  dispatch(logout());
  if (loggedInWithGoogle && window.gapi) {
    window.gapi.auth2.getAuthInstance().signOut();
  }
}