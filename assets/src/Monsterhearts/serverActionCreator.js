import actionCreator from 'utils/actionCreator';

import {
  MONSTERHEARTS_SOCKET_QUEUE,
  MONSTERHEARTS_SOCKET_QUEUE_SLOW
} from 'common/actions';

const randomString = (length, chars) => {
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}
const randomUniqueId = () => randomString(36, "abcdefghijklmnopqrstuvwxyz0123456789")

const queueAction = actionCreator(MONSTERHEARTS_SOCKET_QUEUE, "action");
const queueSlowAction = actionCreator(MONSTERHEARTS_SOCKET_QUEUE_SLOW, "action");

export const serverActionCreator = (...actionCreatorArgs) => (...actionArgs) => dispatch => {
  const action = actionCreator(...actionCreatorArgs)(...actionArgs);
  action.uniqueId = randomUniqueId();
  dispatch(queueAction({action}));
  dispatch(action);
}

export const slowServerActionCreator = (...actionCreatorArgs) => (...actionArgs) => dispatch => {
  const action = actionCreator(...actionCreatorArgs)(...actionArgs);
  action.uniqueId = randomUniqueId();
  dispatch(queueSlowAction({action}));
  return action.uniqueId;
};
export default serverActionCreator;