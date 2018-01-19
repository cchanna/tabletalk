import serverActionCreator from 'Monsterhearts/serverActionCreator';

import {
  MONSTERHEARTS_CHARACTER_NAME_SET,
  MONSTERHEARTS_CHARACTER_LOOK_SET,
  MONSTERHEARTS_CHARACTER_EYES_SET,
  MONSTERHEARTS_CHARACTER_ORIGIN_SET,
} from 'common/actions';

export const setName = serverActionCreator(MONSTERHEARTS_CHARACTER_NAME_SET, "id", "value");
export const setLook = serverActionCreator(MONSTERHEARTS_CHARACTER_LOOK_SET, "id", "value");
export const setEyes = serverActionCreator(MONSTERHEARTS_CHARACTER_EYES_SET, "id", "value");
export const setOrigin = serverActionCreator(MONSTERHEARTS_CHARACTER_ORIGIN_SET, "id", "value");