import { serverActionCreator } from 'Monsterhearts/serverActionCreator';

import {
  MONSTERHEARTS_CHARACTER_MOVE_DELETE
} from 'common/actions';

export const deleteMove = serverActionCreator(MONSTERHEARTS_CHARACTER_MOVE_DELETE, "id", "name");