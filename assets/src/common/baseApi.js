import * as api from './apiHelpers';
import { fromAuth } from 'state';

export const get = (url, {queries} = {}) => (dispatch, getState) => {
  const jwt = fromAuth.getJwt(getState());
  return api.get(url, {queries, jwt});
}

export const post = (url, body, {queries} = {}) => (dispatch, getState) => {
  const jwt = fromAuth.getJwt(getState());
  return api.post(url, {queries, body, jwt});
}