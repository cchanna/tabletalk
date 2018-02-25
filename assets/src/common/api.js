import * as api from './baseApi';
import { getStatus } from 'Status';

const catchStatus = error => dispatch => {
  if (error.response.status === 503) {
    dispatch(getStatus());
  }
  else {
    throw error;
  }
}

export const get = (url, {queries, baseUrl = "api"} = {}) => dispatch => {
  return dispatch(api.get(`${baseUrl}/${url}`, {queries}))
    .catch(err => dispatch(catchStatus(err)));
}

export const post = (url, body, {queries, baseUrl = "api"} = {}) => dispatch => {
  return dispatch(api.post(`${baseUrl}/${url}`, {queries, body}))
    .catch(err => dispatch(catchStatus(err)));
}