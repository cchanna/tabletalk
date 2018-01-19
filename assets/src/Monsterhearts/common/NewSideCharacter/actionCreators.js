import { slowServerActionCreator } from 'Monsterhearts/serverActionCreator';

import {
  MONSTERHEARTS_CHARACTER_SIDE_CREATE
} from 'common/actions';

export const createSideCharacter = slowServerActionCreator(MONSTERHEARTS_CHARACTER_SIDE_CREATE, "name", "notes"); 
