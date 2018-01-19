import { serverActionCreator } from 'Monsterhearts/serverActionCreator';

import {
  MONSTERHEARTS_STRING_SPEND,
  MONSTERHEARTS_STRING_DELETE
} from 'common/actions';

export const spendString = serverActionCreator(MONSTERHEARTS_STRING_SPEND, "id"); 
export const deleteString = serverActionCreator(MONSTERHEARTS_STRING_DELETE, "id"); 