import { serverActionCreator } from 'Monsterhearts/serverActionCreator';

import {
  MONSTERHEARTS_CHARACTER_HARM_INCREMENT,
  MONSTERHEARTS_CHARACTER_HARM_DECREMENT
} from 'common/actions';

export const incrementHarm = serverActionCreator(MONSTERHEARTS_CHARACTER_HARM_INCREMENT, "id"); 
export const decrementHarm = serverActionCreator(MONSTERHEARTS_CHARACTER_HARM_DECREMENT, "id"); 
