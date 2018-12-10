import { combineReducers } from "redux";
import { LOAD } from "./actions";
import update from "immutability-helper";
import { socketActions, slowSocketActions } from "../socketActions";
import bonusString from "common/bonusString";

const MAIN_CREATE = "MAIN_CREATE";
const SIDE_CREATE = "SIDE_CREATE";
const SIDE_EDIT = "SIDE_EDIT";
const NAME_SET = "NAME_SET";
const LOOK_SET = "LOOK_SET";
const EYES_SET = "EYES_SET";
const ORIGIN_SET = "ORIGIN_SET";
const STATS_SET = "STATS_SET";
const NOTES_SET = "NOTES_SET";
const HARM_INCREMENT = "HARM_INCREMENT";
const HARM_DECREMENT = "HARM_DECREMENT";
const XP_INCREMENT = "XP_INCREMENT";
const XP_DECREMENT = "XP_DECREMENT";
const MOVE_CREATE = "MOVE_CREATE";
const MOVE_DELETE = "MOVE_DELETE";
const MOVE_EDIT_NOTES = "MOVE_EDIT_NOTES";
const CONDITION_CREATE = "CONDITION_CREATE";
const CONDITION_DELETE = "CONDITION_DELETE";
const ADVANCEMENT_CREATE = "ADVANCEMENT_CREATE";
const ADVANCEMENT_DELETE = "ADVANCEMENT_DELETE";
const ADVANCEMENT_STAT = "ADVANCEMENT_STAT";
const ADVANCEMENT_STAT_CANCEL = "ADVANCEMENT_STAT_CANCEL";
const DARKEST_SELF_SET = "DARKEST_SELF_SET";

export const actions = {
  addStat: [ADVANCEMENT_STAT, "id"],
  cancelAddStat: [ADVANCEMENT_STAT_CANCEL, "id"],
  ...socketActions({
    createMove: [MOVE_CREATE, "id", "name"],
    deleteMove: [MOVE_DELETE, "id", "name"],
    deleteAdvancement: [ADVANCEMENT_DELETE, "id", "advancementId"],
    editDarkestSelf: [DARKEST_SELF_SET, "id", "value"],
    incrementXP: [XP_INCREMENT, "id"],
    decrementXP: [XP_DECREMENT, "id"],
    incrementHarm: [HARM_INCREMENT, "id"],
    decrementHarm: [HARM_DECREMENT, "id"],
    setNotes: [NOTES_SET, "id", "notes"],
    setName: [NAME_SET, "id", "value"],
    setLook: [LOOK_SET, "id", "value"],
    setEyes: [EYES_SET, "id", "value"],
    setOrigin: [ORIGIN_SET, "id", "value"],
    setStats: [STATS_SET, "id", "hot", "cold", "volatile", "dark"],
    editSideCharacter: [SIDE_EDIT, "id", "name", "notes"],
    createCondition: [CONDITION_CREATE, "id", "condition"],
    deleteCondition: [CONDITION_DELETE, "id", "condition"],
    editMoveNotes: [MOVE_EDIT_NOTES, "id", "name", "notes"],
    createAdvancement: [
      ADVANCEMENT_CREATE,
      "id",
      "advancementId",
      "stat",
      "move",
      "moves"
    ]
  }),
  ...slowSocketActions({
    createCharacter: [MAIN_CREATE, "playbook"],
    createSideCharacter: [SIDE_CREATE, "name", "notes"]
  })
};

export const messages = {
  [HARM_INCREMENT]: "{character:id} suffered a harm.",
  [HARM_DECREMENT]: "{character:id} healed a harm.",
  [XP_INCREMENT]: "{character:id} marked xp.",
  [XP_DECREMENT]: "{character:id} erased an xp.",
  [MOVE_CREATE]: '{character:id} chose the move "{name}".',
  [MOVE_CREATE]: '{character:id} lost the move "{name}".',
  [DARKEST_SELF_SET]: "{character:id} edited their darkest self.",
  [NOTES_SET]: "{character:id} updated their notes.",
  [NAME_SET]: 'Set their character\'s name to "{value}".',
  [LOOK_SET]: 'Set {character:id}\'s look to "{value}".',
  [EYES_SET]: 'Set {character:id}\'s eyes to "{value}".',
  [ORIGIN_SET]: 'Set {character:id}\'s origin to "{value}".',
  [STATS_SET]:
    "Set {character:id}'s stats to Hot{bonus:hot}, Cold{bonus:cold}, Volatile{bonus:volatile}, and Dark{bonus:dark}",
  [SIDE_EDIT]: "Updated {name}.",
  [CONDITION_CREATE]: '{character:id} gained the condition "{condition}".',
  [CONDITION_DELETE]:
    '{character:id} recovered from the condition "{condition}".',
  [MOVE_EDIT_NOTES]: '{character:id} updated the notes for "{name}".',
  [ADVANCEMENT_CREATE]: "{character:id} advanced and {advancement}.",
  [MAIN_CREATE]: "Created a new {mainCharacter.playbook}.",
  [SIDE_CREATE]: 'Created the side character "{name}".'
};

export const selectors = {
  getCharactersById: state => state.byId,
  getCharacterIds: state => state.ids
};

export const reducer = combineReducers({
  ids: (state = null, action) => {
    switch (action.type) {
      case LOAD:
        return action.characters;
      case MAIN_CREATE:
      case SIDE_CREATE:
        return [...state, action.id];
      default:
        return state;
    }
  },

  byId: (state = null, action) => {
    switch (action.type) {
      case LOAD:
        return action.charactersById;

      case MAIN_CREATE:
      case SIDE_CREATE:
        return {
          ...state,
          [action.id]: {
            name: action.name,
            notes: action.notes,
            conditions: action.conditions,
            mainCharacter: action.mainCharacter
          }
        };

      case SIDE_EDIT:
        return update(state, {
          [action.id]: {
            name: { $set: action.name },
            notes: { $set: action.notes }
          }
        });

      case NAME_SET:
        return {
          ...state,
          [action.id]: {
            ...state[action.id],
            name: action.value
          }
        };

      case LOOK_SET:
        return {
          ...state,
          [action.id]: {
            ...state[action.id],
            mainCharacter: {
              ...state[action.id].mainCharacter,
              look: action.value
            }
          }
        };

      case EYES_SET:
        return {
          ...state,
          [action.id]: {
            ...state[action.id],
            mainCharacter: {
              ...state[action.id].mainCharacter,
              eyes: action.value
            }
          }
        };

      case ORIGIN_SET:
        return {
          ...state,
          [action.id]: {
            ...state[action.id],
            mainCharacter: {
              ...state[action.id].mainCharacter,
              origin: action.value
            }
          }
        };

      case STATS_SET:
        return {
          ...state,
          [action.id]: {
            ...state[action.id],
            mainCharacter: {
              ...state[action.id].mainCharacter,
              hot:
                action.hot !== undefined
                  ? action.hot
                  : state[action.id].mainCharacter.hot,
              cold:
                action.cold !== undefined
                  ? action.cold
                  : state[action.id].mainCharacter.cold,
              volatile:
                action.volatile !== undefined
                  ? action.volatile
                  : state[action.id].mainCharacter.volatile,
              dark:
                action.dark !== undefined
                  ? action.dark
                  : state[action.id].mainCharacter.dark
            }
          }
        };

      case NOTES_SET:
        return update(state, {
          [action.id]: { notes: { $set: action.notes } }
        });

      case HARM_INCREMENT:
        return update(state, {
          [action.id]: {
            mainCharacter: { harm: harm => (harm < 4 ? harm + 1 : harm) }
          }
        });
      case HARM_DECREMENT:
        return update(state, {
          [action.id]: {
            mainCharacter: { harm: harm => (harm > 0 ? harm - 1 : harm) }
          }
        });

      case XP_INCREMENT:
        return update(state, {
          [action.id]: {
            mainCharacter: {
              experience: experience =>
                experience < 5 ? experience + 1 : experience
            }
          }
        });
      case XP_DECREMENT:
        return update(state, {
          [action.id]: {
            mainCharacter: {
              experience: experience =>
                experience > 0 ? experience - 1 : experience
            }
          }
        });

      case MOVE_CREATE:
        return update(state, {
          [action.id]: { mainCharacter: { moves: { $push: [action.name] } } }
        });
      case MOVE_DELETE:
        return update(state, {
          [action.id]: {
            mainCharacter: {
              moves: moves => moves.filter(name => name !== action.name),
              moveNotesByName: { $unset: [action.name] }
            }
          }
        });

      case CONDITION_CREATE:
        return update(state, {
          [action.id]: { conditions: { $push: [action.condition] } }
        });
      case CONDITION_DELETE:
        return update(state, {
          [action.id]: {
            conditions: conditions =>
              conditions.filter(condition => condition !== action.condition)
          }
        });

      case ADVANCEMENT_CREATE: {
        const common = {
          advancements: { $push: [action.advancementId] },
          experience: { $set: 0 }
        };
        switch (action.advancementId) {
          case "grow":
            return update(state, {
              [action.id]: {
                mainCharacter: {
                  ...common,
                  moves: { $push: action.moves }
                }
              }
            });
          case "+stat":
            return update(state, {
              [action.id]: {
                mainCharacter: {
                  ...common,
                  addingStat: { $set: false },
                  [action.stat]: value => value + 1
                }
              }
            });
          case "any":
          case "self":
            return update(state, {
              [action.id]: {
                mainCharacter: {
                  ...common,
                  moves: { $push: [action.move] }
                }
              }
            });
          case "rtire":
            return update(state, {
              [action.id]: {
                mainCharacter: {
                  ...common,
                  isRetired: { $set: true }
                }
              }
            });
          default:
            return update(state, {
              [action.id]: {
                mainCharacter: common
              }
            });
        }
      }
      case ADVANCEMENT_DELETE: {
        const common = {
          advancements: advancements => {
            const index = advancements.findIndex(
              id => id === action.advancementId
            );
            if (index >= 0) {
              return advancements
                .slice(0, index)
                .concat(advancements.slice(index + 1));
            }
            return state;
          }
        };
        switch (action.advancementId) {
          case "rtire":
            return update(state, {
              [action.id]: {
                mainCharacter: {
                  ...common,
                  isRetired: { $set: false }
                }
              }
            });
          default:
            return update(state, {
              [action.id]: {
                mainCharacter: common
              }
            });
        }
      }
      case ADVANCEMENT_STAT:
        return update(state, {
          [action.id]: {
            mainCharacter: {
              addingStat: { $set: true }
            }
          }
        });
      case ADVANCEMENT_STAT_CANCEL:
        return update(state, {
          [action.id]: {
            mainCharacter: {
              addingStat: { $set: false }
            }
          }
        });

      case MOVE_EDIT_NOTES:
        return update(state, {
          [action.id]: {
            mainCharacter: {
              moveNotesByName: { [action.name]: { $set: action.notes } }
            }
          }
        });

      case DARKEST_SELF_SET:
        return update(state, {
          [action.id]: {
            mainCharacter: { darkestSelf: { $set: action.value } }
          }
        });
      default:
        return state;
    }
  }
});
