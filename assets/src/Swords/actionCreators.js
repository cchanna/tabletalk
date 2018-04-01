import { get } from 'common/api';
import { getPath } from 'Routing';
import { forSwords, forSocket } from 'state';

export const load = () => (dispatch, getState) => {
  const { path } = getPath(getState());
  dispatch(get(`games/${path[1]}/load`))
    .then(data => {
      dispatch(forSwords.load(data));
      dispatch(forSocket.loadEvents({
        ids: data.eventIds,
        byId: data.eventsById
      }));
    })
    .catch(err => {
      console.error(err);
    })
}

