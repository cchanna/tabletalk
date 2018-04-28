import { combineReducers } from 'redux';
import { socketActions } from '../socketActions';
import update from 'immutability-helper';

const EIDOLON_SET = "EIDOLON_SET";
const NAME_SET = "NAME_SET";
const NAMED_ADD = "NAMED_ADD";
const NAMED_REMOVE = "NAMED_REMOVE";
const NAMED_UPDATE = "NAMED_UPDATE";
const FEAT_JOVIAL_SET = "FEAT_JOVIAL_SET";
const FEAT_JOVIAL_USED_SET = "FEAT_JOVIAL_USED_SET";
const FEAT_GLUM_SET = "FEAT_GLUM_SET";
const FEAT_GLUM_USED_SET = "FEAT_GLUM_USED_SET";
const TRICK_SET = "TRICK_SET";
const TRICK_USED_SET = "TRICK_USED_SET";
const NOTES_SET = "NOTES_SET";

export const actions = {
  ...socketActions({
    setEidolon: [EIDOLON_SET, "id", "eidolon", "eidolonIsImage"],
    setName: [NAME_SET, "id", "name"],
    addNamed: [NAMED_ADD, "id", "name"],
    removeNamed: [NAMED_REMOVE, "id", "index"],
    updateNamed: [NAMED_UPDATE, "id", "index", "name"],
    setJovialFeat: [FEAT_JOVIAL_SET, "id", "value"],
    setJovialFeatUsed: [FEAT_JOVIAL_USED_SET, "id", "value"],
    setGlumFeat: [FEAT_GLUM_SET, "id", "value"],
    setGlumFeatUsed: [FEAT_GLUM_USED_SET, "id", "value"],
    setTrick: [TRICK_SET, "id", "value"],
    setTrickUsed: [TRICK_USED_SET, "id", "value"],
    setNotes: [NOTES_SET, "id", "value"]
  })
}

export const messages = {
  [EIDOLON_SET]: "Updated their eidolon.",
  [NAME_SET]: "Changed their name to {name}.",
  [NAMED_ADD]: 'Recorded a name: "{name}".',
  [NAMED_REMOVE]: "Unnamed something.",
  [NAMED_UPDATE]: 'Changed the name for "{name}".',
  [FEAT_JOVIAL_SET]: 'Set their jovial feat heroic to "{value}".',
  [FEAT_JOVIAL_USED_SET]: '{value ? Used their jovial feat. : Un-used their jovial feat.}',
  [FEAT_GLUM_SET]: 'Set their glum feat heroic to "{value}".',
  [FEAT_GLUM_USED_SET]: '{value ? Used their glum feat. : Un-used their glum feat.}',
  [TRICK_SET]: 'Updated their trick to "{value}".',
  [TRICK_USED_SET]: '{value ? Used their trick. : Un-used their trick.}',
  [NOTES_SET]: "Updated their notes."
}



export const reducer = combineReducers({
  ids: (state = null, action) => {
    switch(action.type) {
      case "LOAD":
        return action.characterIds;
      case "PLAYER_JOIN":
        return [...state, action.character.id]
      default:
        return state;
    } 
  },
  byId: (state = null, action) => {
    switch(action.type) {
      case "LOAD":
        return action.charactersById;
      case "PLAYER_JOIN":
        return {
          ...state,
          [action.character.id]: action.character
        }
      case EIDOLON_SET:
        return update(state, {
          [action.id]: {
            eidolon: {$set: action.eidolon},
            eidolonIsImage: {$set: action.eidolonIsImage}
          }
        });
      case NAME_SET:
        return update(state, {
          [action.id]: {
            name: {$set: action.name}
          }
        });
      case NAMED_ADD:
        return update(state, {
          [action.id]: {
            allThatMatters: {$push: [action.name]}
          }
        });
      case NAMED_REMOVE:
        return update(state, {
          [action.id]: {
            allThatMatters: items => items.filter((_item, i) => i !== action.index)
          }
        });
      case NAMED_UPDATE:
        return update(state, {
          [action.id]: {
            allThatMatters: {
              [action.index]: {$set: action.name}
            }
          }
        });
      case FEAT_JOVIAL_SET:
        return update(state, {
          [action.id]: {
            jovialFeat: {$set: action.value}
          }
        });
      case FEAT_JOVIAL_USED_SET:
        return update(state, {
          [action.id]: {
            jovialFeatUsed: {$set: action.value}
          }
        })
      case FEAT_GLUM_SET:
        return update(state, {
          [action.id]: {
            glumFeat: {$set: action.value}
          }
        });
      case FEAT_GLUM_USED_SET:
        return update(state, {
          [action.id]: {
            glumFeatUsed: {$set: action.value}
          }
        })
      case TRICK_SET:
        return update(state, {
          [action.id]: {
            trick: {$set: action.value}
          }
        });
      case TRICK_USED_SET:
        return update(state, {
          [action.id]: {
            trickUsed: {$set: action.value}
          }
        })
      case NOTES_SET:
        return update(state, {
          [action.id]: {
            notes: {$set: action.value}
          }
        })
      default:
        return state;
    } 
  },
});

const getCharacter = (state, id) => state.byId[id];

export const selectors = {
  getCharacter
};