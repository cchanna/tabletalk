import { connect } from 'react-redux'
import EditCharacter from './EditCharacter';

import { fromDreamAskew, forDreamAskew } from "state";

const { 
  getCharacter,
  getRole
} = fromDreamAskew;
const {
  setName,
  setLook1,
  setLook2,
  setPronouns,
  setGender,
  setStyles,
  setChoices1,
  setChoices2,
  setKeyRelationships
} = forDreamAskew

const mapStateToProps = (state, {id}) => {
  const character = getCharacter(state, id);
  return {
    character,
    role: getRole(state, character.role)
  }
}


const mapDispatchToProps = {
  setName,
  setLook1,
  setLook2,
  setPronouns,
  setGender,
  setStyles,
  setChoices1,
  setChoices2,
  setKeyRelationships
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCharacter);