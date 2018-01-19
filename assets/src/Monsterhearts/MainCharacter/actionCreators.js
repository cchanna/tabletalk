import { serverActionCreator, slowServerActionCreator } from 'Monsterhearts/serverActionCreator';

import {
  MONSTERHEARTS_STRING_ADD,
  MONSTERHEARTS_STRING_CREATE
} from 'common/actions';

export const addString = serverActionCreator(MONSTERHEARTS_STRING_ADD, "id"); 
export const createString = slowServerActionCreator(MONSTERHEARTS_STRING_CREATE, "to", "from"); 
