import { getStatus } from 'Status/actionCreators';

export default dispatch => error => {
  if (error.response.status === 503) {
    dispatch(getStatus());
  }
  else {
    throw error;
  }
}