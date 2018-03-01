import { get } from 'common/baseApi';
import { forStatus } from 'state';

const defaultReason = "Tabletalk is down right now. Sorry!";
const getStatus = () => dispatch => {
  dispatch(get("status"))
    .then(() => dispatch(forStatus.setUp()))
    .catch(error => {
      if (error.response && error.response.status === 503) {
        error.response.json()
          .then(({reason}) => dispatch(forStatus.setDown({reason})))
          .catch(() => dispatch(forStatus.setDown({reason: defaultReason})));
      }
      else {
        dispatch(forStatus.setDown({reason: defaultReason}));
      }
    });
}

export default getStatus;