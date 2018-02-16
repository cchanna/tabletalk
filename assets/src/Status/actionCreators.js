import {
  STATUS_SET_UP,
  STATUS_SET_DOWN
} from "common/actions"

import actionCreator from 'utils/actionCreator';
import api from './api';

const setStatusUp = actionCreator(STATUS_SET_UP);
const setStatusDown = actionCreator(STATUS_SET_DOWN, "reason");


const defaultReason = "Tabletalk is down right now. Sorry!";

export const getStatus = () => dispatch => {
  api.get()
    .then(() => dispatch(setStatusUp()))
    .catch(error => {
      if (error.response && error.response.status === 503) {
        error.response.json()
          .then(({reason}) => dispatch(setStatusDown({reason})))
          .catch(() => dispatch(setStatusDown({reason: defaultReason})));
      }
      else {
        dispatch(setStatusDown({reason: defaultReason}));
      }
    });
}