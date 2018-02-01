import {
  MONSTERHEARTS_CHARACTER_ADVANCEMENT_CREATE
} from 'common/actions';

import { serverActionCreator } from 'Monsterhearts/serverActionCreator';

export const createAdvancement = serverActionCreator(MONSTERHEARTS_CHARACTER_ADVANCEMENT_CREATE, "id", "advancementId", "stat", "move");