import { slowServerActionCreator } from 'Monsterhearts/serverActionCreator';

import {
  MONSTERHEARTS_CHARACTER_MAIN_CREATE
} from "common/actions";

export const createCharacter = slowServerActionCreator(MONSTERHEARTS_CHARACTER_MAIN_CREATE, "playbook");
