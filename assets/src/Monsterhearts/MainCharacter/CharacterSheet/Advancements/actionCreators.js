import { goTo } from 'Routing/actionCreators';
import { getPath } from 'Routing/selectors';
import { forMonsterhearts } from '../../../state';
const { createAdvancement, addStat, cancelAddStat, deleteAdvancement } = forMonsterhearts;

export const add = ({id, advancementId}) => (dispatch, getState) => {
  if (advancementId === "+stat") {
    dispatch(addStat({id}));
  }
  else {
    if (advancementId === "rtire") {
      const state = getState();
      const { here } = getPath(state, 2);
      dispatch(goTo([...here, "new"]));
    }
    return dispatch(createAdvancement({id, advancementId}));
  }
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
    dispatch(deleteAdvancement({id, advancementId}))
  }
}