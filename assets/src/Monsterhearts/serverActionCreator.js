import actionCreator from 'utils/actionCreator';

import {
  MONSTERHEARTS_ACTION_STORE,
  MONSTERHEARTS_ACTION_STORE_SLOW,
  MONSTERHEARTS_ACTION_ANSWER,
  MONSTERHEARTS_ACTION_ANSWER_SLOW,
} from 'common/actions';
import {
  MONSTERHEARTS_CHARACTER_MAIN_CREATE,
  MONSTERHEARTS_CHARACTER_MOVE_CREATE,
  MONSTERHEARTS_CHARACTER_SIDE_CREATE,
  MONSTERHEARTS_STRING_ADD,
  MONSTERHEARTS_STRING_CREATE
} from 'common/actions';
import { setTimeout } from 'timers';

const randomString = (length, chars) => {
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}
const randomUniqueId = () => randomString(36, "abcdefghijklmnopqrstuvwxyz0123456789")

const storeUnansweredAction = actionCreator(MONSTERHEARTS_ACTION_STORE, "action");
const storeUnansweredSlowAction = actionCreator(MONSTERHEARTS_ACTION_STORE_SLOW, "action");
const answerAction = actionCreator(MONSTERHEARTS_ACTION_ANSWER, "uniqueId");
const answerSlowAction = actionCreator(MONSTERHEARTS_ACTION_ANSWER_SLOW, "uniqueId");

const resolveServerAction = action => (dispatch, getState) => {
  const { monsterhearts } = getState();
  const { unansweredActions, unansweredSlowActions } = monsterhearts;
  const { uniqueId } = action;
  if (unansweredActions[uniqueId]) {
    dispatch(answerAction({uniqueId}));
  }
  else {
    if (unansweredSlowActions[uniqueId]) {
      dispatch(answerSlowAction({uniqueId}));
    }
    dispatch(action);
  }
}

export const serverActionCreator = (...actionCreatorArgs) => (...actionArgs) => (dispatch, getState) => {
  const action = actionCreator(...actionCreatorArgs)(...actionArgs);
  action.uniqueId = randomUniqueId();
  dispatch(storeUnansweredAction({action}));
  dispatch(action);
  setTimeout(() => {
    dispatch(resolveServerAction(action));
  });
}


const randomId = () => Math.floor(Math.random() * 9999999)
const mockSlowAction = (action) => {
  switch(action.type) {
    case MONSTERHEARTS_CHARACTER_MAIN_CREATE:
      return {
        ...action,
        id: randomId(),
        name: null,
        hidden: false,
        notes: "",
        conditions: [],
        mainCharacter: {
          playerId: 58,
          playbook: action.playbook,
          harm: 0,
          experience: 0,
          hot: null,
          cold: null,
          volatile: null,
          dark: null,
          eyes: null,
          look: null,
          origin: null,
          advancements: [],
          moves: []
        }
      }
    case MONSTERHEARTS_STRING_CREATE:
      return {
        type: MONSTERHEARTS_STRING_CREATE,
        uniqueId: action.uniqueId,
        id: randomId(),
        from: action.from,
        to: action.to,
        value: 1
      }
    case MONSTERHEARTS_CHARACTER_SIDE_CREATE:
      return {
        type: MONSTERHEARTS_CHARACTER_SIDE_CREATE,
        id: randomId(),
        uniqueId: action.uniqueId,
        name: action.name,
        notes: action.notes,
        conditions: [],
        hidden: false,
        mainCharacter: null
      }
    case MONSTERHEARTS_CHARACTER_MOVE_CREATE:
      return {
        type: MONSTERHEARTS_CHARACTER_MOVE_CREATE,
        id: randomId(),
        characterId: action.characterId,
        name: action.name,
        notes: ""
      }
  }
}

export const slowServerActionCreator = (...actionCreatorArgs) => (...actionArgs) => (dispatch, getState) => {
  const action = actionCreator(...actionCreatorArgs)(...actionArgs);
  action.uniqueId = randomUniqueId();
  dispatch(storeUnansweredSlowAction({action}));
  setTimeout(() => {
    dispatch(resolveServerAction(mockSlowAction(action)));
  }, 150);
  return action.uniqueId;
};
export default serverActionCreator;