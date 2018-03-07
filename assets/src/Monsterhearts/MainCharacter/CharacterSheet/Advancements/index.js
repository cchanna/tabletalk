import { connect } from 'react-redux'
import Advancements from './Advancements';

import { fromMonsterhearts, forMonsterhearts } from 'state';
import { goTo } from 'Routing/actionCreators';
import { getPath } from 'Routing/selectors';
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
  const state = getState();
  const { addingStat } = fromMonsterhearts.getCharacter(state, id).mainCharacter; 
  if (addingStat && advancementId === "+stat") {
    dispatch(cancelAddStat({id}))
  }
  else {
    dispatch(deleteAdvancement({id, advancementId}))
  }
}

const {
  getCharacter, 
  getReadOnly, 
  getPlaybookAdvancements, 
  listSeasonAdvancements,
  getCanGetSeasonAdvancements
} = fromMonsterhearts;

const mapStateToProps = (state, {id, depth}) => {
  const { mainCharacter } = getCharacter(state, id);
  const readOnly = getReadOnly(state, id);

  const { playbook, addingStat, experience, advancements: selectedAdvancements } = mainCharacter;
  const advancements = getPlaybookAdvancements(state, playbook)
    .map(advancement => ({
      ...advancement,
      selected: advancement.id === "+stat" && !!addingStat 
    }));

  let seasonAdvancements = null;

  if (getCanGetSeasonAdvancements(state, id)) {
    seasonAdvancements = listSeasonAdvancements(state)
      .map(advancement => ({
        ...advancement,
        selected: selectedAdvancements.includes(advancement.id)
      }))
  }

  selectedAdvancements.forEach(id => {
    const advancement = advancements.find(a => a.id === id && !a.selected) 
    if (advancement) {
      advancement.selected = true;
    }
  })
  return {
    id, playbook, readOnly, depth,
    advancements, seasonAdvancements,
    canLevel: experience >= 5 && !addingStat,
  };
};

const mapDispatchToProps = {add, remove}

export default connect(mapStateToProps, mapDispatchToProps)(Advancements);