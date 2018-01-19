import { slowServerActionCreator, serverActionCreator } from 'Monsterhearts/serverActionCreator';

import {
  MONSTERHEARTS_CHARACTER_SIDE_EDIT
} from 'common/actions';

export const editSideCharacter = serverActionCreator(MONSTERHEARTS_CHARACTER_SIDE_EDIT, "id", "name", "notes"); 
