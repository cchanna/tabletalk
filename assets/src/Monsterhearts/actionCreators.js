import { get } from 'common/api';
import { getPath } from 'Routing';
import { forMonsterhearts } from './state';

export const load = () => (dispatch, getState) => {
  const { path } = getPath(getState());
  dispatch(get(`games/${path[1]}/load`))
    .then(data => {
      dispatch(forMonsterhearts.resolveLoad(data));
    })
    .catch(err => {
      console.error(err);
    })
}

