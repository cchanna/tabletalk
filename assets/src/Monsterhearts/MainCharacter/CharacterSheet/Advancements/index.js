import { connect } from 'react-redux'
import Advancements from './Advancements';

import { add, remove } from './actionCreators';
import { getPath } from 'Routing/selectors';
import { getCharacter, getReadOnly, getPlaybookAdvancements } from 'Monsterhearts/selectors';

const mapStateToProps = (state, {id, depth}) => {
  const { mainCharacter } = getCharacter(state, id);
  const readOnly = getReadOnly(state, id);
  const { here } = getPath(state, depth);

  const { playbook, addingStat, experience, advancements: selectedAdvancements } = mainCharacter;
  const advancements = getPlaybookAdvancements(state, playbook)
    .map(advancement => ({
      ...advancement,
      selected: advancement.id === "+stat" && !!addingStat 
    }))

  selectedAdvancements.forEach(id => {
    const advancement = advancements.find(a => a.id === id && !a.selected) 
    if (advancement) {
      advancement.selected = true;
    }
  })
  return {
    id, playbook, readOnly, here,
    advancements,
    canLevel: experience >= 5 && !addingStat,
  };
};

const mapDispatchToProps = {add, remove}

export default connect(mapStateToProps, mapDispatchToProps)(Advancements);