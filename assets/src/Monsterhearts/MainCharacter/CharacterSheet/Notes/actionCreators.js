import { serverActionCreator } from 'Monsterhearts/serverActionCreator';

import {
  MONSTERHEARTS_CHARACTER_NOTES_SET
} from 'common/actions';

export const setNotes = serverActionCreator(MONSTERHEARTS_CHARACTER_NOTES_SET, "id", "notes"); 
