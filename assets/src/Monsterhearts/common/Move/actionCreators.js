import { serverActionCreator } from 'Monsterhearts/serverActionCreator';

import {
  MONSTERHEARTS_CHARACTER_MOVE_EDIT_NOTES
} from 'common/actions';

export const editMoveNotes = serverActionCreator(MONSTERHEARTS_CHARACTER_MOVE_EDIT_NOTES, "id", "name", "notes");