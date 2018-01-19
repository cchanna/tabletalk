import { serverActionCreator } from 'Monsterhearts/serverActionCreator';

import {
  MONSTERHEARTS_CHARACTER_XP_INCREMENT,
  MONSTERHEARTS_CHARACTER_XP_DECREMENT
} from 'common/actions';

export const incrementXP = serverActionCreator(MONSTERHEARTS_CHARACTER_XP_INCREMENT, "id"); 
export const decrementXP = serverActionCreator(MONSTERHEARTS_CHARACTER_XP_DECREMENT, "id"); 
