import { serverActionCreator } from 'Monsterhearts/serverActionCreator';

import {
  MONSTERHEARTS_CHARACTER_CONDITION_CREATE,
  MONSTERHEARTS_CHARACTER_CONDITION_DELETE
} from 'common/actions';

export const createCondition = serverActionCreator(MONSTERHEARTS_CHARACTER_CONDITION_CREATE, "id", "condition"); 
export const deleteCondition = serverActionCreator(MONSTERHEARTS_CHARACTER_CONDITION_DELETE, "id", "condition"); 
