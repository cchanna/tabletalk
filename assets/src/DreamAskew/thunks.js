import { get } from 'common/api';
import { getPath } from 'Routing';
import { forDreamAskew, forSocket } from 'state';

const { load: loadGame } = forDreamAskew;
const { loadEvents } = forSocket;

export const load = () => (dispatch, getState) => {
  const { path } = getPath(getState());
  dispatch(get(`games/${path[1]}/load`))
    .then(data => {
      dispatch(loadGame(data));
      dispatch(loadEvents({
        ids: data.eventIds,
        byId: data.eventsById
      }));
    })
    .catch(err => {
      console.error(err);
    })
}

