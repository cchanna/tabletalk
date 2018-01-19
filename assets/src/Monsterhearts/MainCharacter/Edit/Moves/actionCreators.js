import { serverActionCreator } from 'Monsterhearts/serverActionCreator';

import {
  MONSTERHEARTS_CHARACTER_MOVE_CREATE,
  MONSTERHEARTS_CHARACTER_MOVE_DELETE
} from 'common/actions';

export const createMove = serverActionCreator(MONSTERHEARTS_CHARACTER_MOVE_CREATE, "id", "name");
export const deleteMove = serverActionCreator(MONSTERHEARTS_CHARACTER_MOVE_DELETE, "id", "name");