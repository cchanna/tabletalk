import { get } from 'common/baseApi';
import { forStatus } from './state';

const { 
  setStatusUp,
  setStatusDown
} = forStatus;

const defaultReason = "Tabletalk is down right now. Sorry!";

export const getStatus = () => dispatch => {
  dispatch(get("status"))
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