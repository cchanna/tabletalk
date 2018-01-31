import { connect } from 'react-redux'
import Advancements from './Advancements';

import { add, remove } from './actionCreators';

const mapStateToProps = ({monsterhearts}, {id}) => {
  const { charactersById, playersById, definitions, me } = monsterhearts;
  const { mainCharacter } = charactersById[id];
  const { 
    advancements: selectedAdvancements, experience, playerId, playbook 
  } = mainCharacter;
  const { advancementsById, playbooksByName } = definitions;
  const { advancements: playbookAdvancements } = playbooksByName[playbook];
  const readOnly = (playerId != me) && !playersById[me].isGM;
  const advancements = playbookAdvancements.map(id => ({
    id,
    text: advancementsById[id].text.replace("{playbook}", playbook),
    selected: false
  }));
  selectedAdvancements.forEach(id => {
    const advancement = advancements.find(a => a.id === id && !a.selected) 
    if (advancement) {
      advancement.selected = true;
    }
  })
  return {
    id, readOnly,
    advancements,
    canLevel: experience >= 5,
  };
};

const mapDispatchToProps = {add, remove}

export default connect(mapStateToProps, mapDispatchToProps)(Advancements);