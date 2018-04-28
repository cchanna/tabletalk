import { connect } from 'react-redux'
import Character from './Character';

import { fromSwords, forSwords } from 'state';

const { 
  getCharacter,
  getCharacterName,
  getMe
} = fromSwords;
const {
  setName,
  setEidolon,
  addNamed,
  removeNamed,
  updateNamed,
  setJovialFeat,
  setGlumFeat,
  setTrick,
  setNotes,
  setJovialFeatUsed,
  setGlumFeatUsed,
  setTrickUsed
} = forSwords;

const mapStateToProps = (state, {id}) => {
  const me = getMe(state);
  const { 
    playerId, name, eidolon, eidolonIsImage, allThatMatters, 
    jovialFeat, jovialFeatUsed, glumFeat, glumFeatUsed,
    trick, trickUsed, notes 
  } = getCharacter(state, id);
  return {
    id,
    name, eidolon, eidolonIsImage, allThatMatters, 
    jovialFeat, jovialFeatUsed, glumFeat, glumFeatUsed,
    trick, trickUsed, notes ,
    canEdit: me === playerId,
    displayName: getCharacterName(state, id)
  }
};

const mapDispatchToProps = {
  setName, setEidolon, addNamed, removeNamed, updateNamed,
  setJovialFeat, setGlumFeat, setTrick, setNotes,
  setJovialFeatUsed, setGlumFeatUsed, setTrickUsed
}

export default connect(mapStateToProps, mapDispatchToProps)(Character);