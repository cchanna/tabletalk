import * as api from './apiHelpers';
import { getStatus } from 'Status/actionCreators';
import { fromAuth } from 'Auth';

const catchStatus = error => dispatch => {
  if (error.response.status === 503) {
    dispatch(getStatus());
  }
  else {
    throw error;
  }
}

export const get = (url, {queries, urlParams, baseUrl = "api"} = {}) => (dispatch, getState) => {
  const jwt = fromAuth.getJwt(getState());
  return api.get(`${baseUrl}/${url}`, {queries, urlParams, jwt})
    .catch(err => dispatch(catchStatus(err)));
}

export const post = (url, body, {queries, urlParams, baseUrl = "api"} = {}) => (dispatch, getState) => {
  const jwt = fromAuth.getJwt(getState());
  return api.post(`${baseUrl}/${url}`, {queries, urlParams, body, jwt})
    .catch(err => dispatch(catchStatus(err)));
}