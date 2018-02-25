import { connect } from 'react-redux'
import Advancements from './Advancements';

import { add, remove } from './actionCreators';
import { fromMonsterhearts } from '../../../state';

const {
  getCharacter, 
  getReadOnly, 
  getPlaybookAdvancements, 
  listSeasonAdvancements,
  getIsSeasonFinale
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

  if (selectedAdvancements.length >= 5 || getIsSeasonFinale(state)) {
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