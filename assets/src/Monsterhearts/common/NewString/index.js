import { connect } from 'react-redux'
import NewString from './NewString';

import { createString } from '../actionCreators';
import { goBack } from 'Routing/actionCreators';

const mapStateToProps = ({monsterhearts}, {here}) => {
  let id;
  if (here[2] === 'side') {
    id = parseInt(here[3], 10);
  }
  else {
    id = parseInt(here[2], 10);
  }
  const { charactersById, strings, stringsById, unansweredSlowActions } = monsterhearts;
  
  const excludeFrom = strings
    .filter(s => stringsById[s].from === id)
    .map(s => stringsById[s].to);
  const excludeTo = strings
    .filter(s => stringsById[s].to === id && !excludeFrom.includes(stringsById[s].from))
    .map(s => stringsById[s].from)
  const characters = monsterhearts.characters
    .filter(c => c !== id && !excludeFrom.includes(c) && !excludeTo.includes(c))
    .sort((a, b) => {
      const ca = charactersById[a]; 
      const cb = charactersById[b]; 
      if (ca.mainCharacter) {
        if (cb.mainCharacter) {
          return ca.mainCharacter.playerId - cb.mainCharacter.playerId 
        }
        else {
          return -1;
        }
      }
      else if (cb.mainCharacter) return 1;
      else return ca.name.localeCompare(cb);
    })
  return {id, characters, charactersById, unansweredSlowActions};
};

const mapDispatchToProps = {createString, goBack};

export default connect(mapStateToProps, mapDispatchToProps)(NewString);