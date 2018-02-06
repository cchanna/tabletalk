import {
  MONSTERHEARTS_CHARACTER_ADVANCEMENT_CREATE,
  MONSTERHEARTS_CHARACTER_ADVANCEMENT_DELETE,
  MONSTERHEARTS_CHARACTER_ADVANCEMENT_STAT,
  MONSTERHEARTS_CHARACTER_ADVANCEMENT_STAT_CANCEL
} from 'common/actions';

import { serverActionCreator } from 'Monsterhearts/serverActionCreator';
import actionCreator from 'utils/actionCreator';

import { createAdvancement } from '../../actionCreators';

const addStat = actionCreator(MONSTERHEARTS_CHARACTER_ADVANCEMENT_STAT, "id");
const cancelAddStat = actionCreator(MONSTERHEARTS_CHARACTER_ADVANCEMENT_STAT_CANCEL, "id");
const deleteAdv = serverActionCreator(MONSTERHEARTS_CHARACTER_ADVANCEMENT_DELETE, "id", "advancementId");

export const add = ({id, advancementId}) => {
  if (advancementId === "+stat") {
    return addStat({id});
  }
  return createAdvancement({id, advancementId});
}

export const remove = ({id, advancementId}) => (dispatch, getState) => {
  const { monsterhearts } = getState();
  const { charactersById } = monsterhearts;
  const { mainCharacter } = charactersById[id];
  const { addingStat } = mainCharacter; 
  if (addingStat && advancementId === "+stat") {
    dispatch(cancelAddStat({id}))
  }
  else {
    dispatch(deleteAdv({id, advancementId}))
  }
}