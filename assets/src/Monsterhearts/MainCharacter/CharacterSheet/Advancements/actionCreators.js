import {
  MONSTERHEARTS_CHARACTER_ADVANCEMENT_CREATE,
  MONSTERHEARTS_CHARACTER_ADVANCEMENT_DELETE
} from 'common/actions';

import { serverActionCreator } from 'Monsterhearts/serverActionCreator';

const create = serverActionCreator(MONSTERHEARTS_CHARACTER_ADVANCEMENT_CREATE, "id", "advancementId");
export const remove = serverActionCreator(MONSTERHEARTS_CHARACTER_ADVANCEMENT_DELETE, "id", "advancementId");

export const add = ({id, advancementId}) => (dispatch, getState) => {
  dispatch(create({id, advancementId}));
}