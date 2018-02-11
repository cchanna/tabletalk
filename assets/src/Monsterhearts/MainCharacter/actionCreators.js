import { serverActionCreator, slowServerActionCreator } from 'Monsterhearts/serverActionCreator';

import {
  MONSTERHEARTS_STRING_ADD,
  MONSTERHEARTS_STRING_CREATE,
  MONSTERHEARTS_CHARACTER_MOVE_CREATE,
  MONSTERHEARTS_CHARACTER_ADVANCEMENT_CREATE
} from 'common/actions';

export const addString = serverActionCreator(MONSTERHEARTS_STRING_ADD, "id"); 
export const createString = slowServerActionCreator(MONSTERHEARTS_STRING_CREATE, "to", "from"); 
export const createMove = serverActionCreator(MONSTERHEARTS_CHARACTER_MOVE_CREATE, "id", "name");
export const createAdvancement = serverActionCreator(MONSTERHEARTS_CHARACTER_ADVANCEMENT_CREATE, "id", "advancementId", "stat", "move");