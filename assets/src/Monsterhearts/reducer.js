import { combineReducers } from "redux";

import {
  MONSTERHEARTS_CHATBOX_SET_COLLAPSED,
  MONSTERHEARTS_LOAD,
  MONSTERHEARTS_SOCKET_DISCONNECT,
  
  MONSTERHEARTS_CHARACTER_MAIN_CREATE,
  MONSTERHEARTS_CHARACTER_SIDE_CREATE,
  MONSTERHEARTS_CHARACTER_SIDE_EDIT,
  MONSTERHEARTS_CHARACTER_NAME_SET,
  MONSTERHEARTS_CHARACTER_LOOK_SET,
  MONSTERHEARTS_CHARACTER_EYES_SET,
  MONSTERHEARTS_CHARACTER_ORIGIN_SET,
  MONSTERHEARTS_CHARACTER_STATS_SET,
  MONSTERHEARTS_CHARACTER_NOTES_SET,
  MONSTERHEARTS_CHARACTER_HARM_INCREMENT,
  MONSTERHEARTS_CHARACTER_HARM_DECREMENT,
  MONSTERHEARTS_CHARACTER_XP_INCREMENT,
  MONSTERHEARTS_CHARACTER_XP_DECREMENT,
  MONSTERHEARTS_CHARACTER_MOVE_CREATE,
  MONSTERHEARTS_CHARACTER_MOVE_DELETE,
  MONSTERHEARTS_CHARACTER_MOVE_EDIT_NOTES,
  MONSTERHEARTS_CHARACTER_CONDITION_CREATE,
  MONSTERHEARTS_CHARACTER_CONDITION_DELETE,
  MONSTERHEARTS_CHARACTER_ADVANCEMENT_CREATE,
  MONSTERHEARTS_CHARACTER_ADVANCEMENT_DELETE,
  MONSTERHEARTS_CHARACTER_ADVANCEMENT_STAT,
  MONSTERHEARTS_CHARACTER_ADVANCEMENT_STAT_CANCEL,
  MONSTERHEARTS_STRING_ADD,
  MONSTERHEARTS_STRING_SPEND,
  MONSTERHEARTS_STRING_CREATE,
  MONSTERHEARTS_CHAT

} from "common/actions";

import socket from './SocketManager/reducer';

import update from 'immutability-helper';



export default combineReducers({
  socket,
  loaded: (state = false, action) => {
    switch(action.type) {
      case MONSTERHEARTS_LOAD:
        return true;
      case MONSTERHEARTS_SOCKET_DISCONNECT:
        return false;
      default:
        return state;
    }
  },
  chatboxCollapsed: (state = true, action) => {
    switch(action.type) {
      case MONSTERHEARTS_CHATBOX_SET_COLLAPSED:
        return action.collapsed;
      default:
        return state;  
    }
  },
  players: (state = null, action) => {
    switch(action.type) {
      case MONSTERHEARTS_LOAD:
        return action.players;
      default: return state;
    }
  },
  playersById: (state = null, action) => {
    switch(action.type) {
      case MONSTERHEARTS_LOAD:
        return action.playersById;
      default: return state;
    }
  },
  chats: (state = null, action) => {
    switch(action.type) {
      case MONSTERHEARTS_LOAD:
        return action.chats;
      case MONSTERHEARTS_CHAT:
        return [...state, action.id];
      default: return state;
    }
  },
  chatsById: (state = null, action) => {
    switch(action.type) {
      case MONSTERHEARTS_LOAD:
        return action.chatsById;
      case MONSTERHEARTS_CHAT:
        return update(state, {
          [action.id]: {
            $set: {
              insertedAt: action.insertedAt,
              playerId: action.playerId,
              talk: action.talk,
              roll: action.roll
            }
          }
        })
      default: return state;
    }
  },
  me: (state = null, action) => {
    switch(action.type) {
      case MONSTERHEARTS_LOAD:
        return action.me;
      default: return state;
    }
  },
  characters: (state = null, action) => {
    switch(action.type) {
      case MONSTERHEARTS_LOAD:
        return action.characters;
      case MONSTERHEARTS_CHARACTER_MAIN_CREATE:
      case MONSTERHEARTS_CHARACTER_SIDE_CREATE:
        return [...state, action.id]
      default: return state;
    }
  },
  charactersById: (state = null, action) => {
    switch(action.type) {
      case MONSTERHEARTS_LOAD:
        return action.charactersById;
      case MONSTERHEARTS_CHARACTER_MAIN_CREATE:
      case MONSTERHEARTS_CHARACTER_SIDE_CREATE:
        return {
          ...state,
          [action.id]: {
            name: action.name,
            notes: action.notes,
            conditions: action.conditions,
            mainCharacter: action.mainCharacter
          }
        }
      case MONSTERHEARTS_CHARACTER_SIDE_EDIT:
        return update(state, {
          [action.id]: {
            name: {$set: action.name},
            notes: {$set: action.notes}
          }
        })
      case MONSTERHEARTS_CHARACTER_NAME_SET:
        return {
          ...state,
          [action.id]: {
            ...state[action.id],
            name: action.value
          }
        }
      case MONSTERHEARTS_CHARACTER_LOOK_SET:
        return {
          ...state,
          [action.id]: {
            ...state[action.id],
            mainCharacter: {
              ...state[action.id].mainCharacter,
              look: action.value
            }
          }
        }
      case MONSTERHEARTS_CHARACTER_EYES_SET:
        return {
          ...state,
          [action.id]: {
            ...state[action.id],
            mainCharacter: {
              ...state[action.id].mainCharacter,
              eyes: action.value
            }
          }
        }
      case MONSTERHEARTS_CHARACTER_ORIGIN_SET:
        return {
          ...state,
          [action.id]: {
            ...state[action.id],
            mainCharacter: {
              ...state[action.id].mainCharacter,
              origin: action.value
            }
          }
        }
      case MONSTERHEARTS_CHARACTER_STATS_SET:
        return {
          ...state,
          [action.id]: {
            ...state[action.id],
            mainCharacter: {
              ...state[action.id].mainCharacter,
              hot: action.hot !== undefined ? action.hot : state[action.id].mainCharacter.hot,
              cold: action.cold !== undefined ? action.cold : state[action.id].mainCharacter.cold,
              volatile: action.volatile !== undefined ? action.volatile : state[action.id].mainCharacter.volatile,
              dark: action.dark !== undefined ? action.dark : state[action.id].mainCharacter.dark,
            }
          }
        }
      case MONSTERHEARTS_CHARACTER_NOTES_SET:
        return update(state, {
          [action.id]: {notes: {$set: action.notes}}
        })
      case MONSTERHEARTS_CHARACTER_HARM_INCREMENT:
        return update(state, {
          [action.id]: {mainCharacter: {harm: (harm) => 
            (harm < 4) ? (harm + 1) : harm
          }}
        })
      case MONSTERHEARTS_CHARACTER_HARM_DECREMENT:
        return update(state, {
          [action.id]: {mainCharacter: {harm: (harm) => 
            (harm > 0) ? (harm - 1) : harm
          }}
        })
      case MONSTERHEARTS_CHARACTER_XP_INCREMENT:
        return update(state, {
          [action.id]: {mainCharacter: {experience: (experience) => 
            (experience < 5) ? (experience + 1) : experience
          }}
        })
      case MONSTERHEARTS_CHARACTER_XP_DECREMENT:
        return update(state, {
          [action.id]: {mainCharacter: {experience: (experience) => 
            (experience > 0) ? (experience - 1) : experience
          }}
        })
      case MONSTERHEARTS_CHARACTER_MOVE_CREATE: 
        return update(state, {
          [action.id]: {mainCharacter: {moves: {$push: [action.name]}}}
        })
      case MONSTERHEARTS_CHARACTER_MOVE_DELETE:
        return update(state, {
          [action.id]: {
            mainCharacter: {
              moves: (moves) => moves.filter(name => name !== action.name),
              moveNotesByName: {$unset: [action.name]}
            }
          }
        })
      case MONSTERHEARTS_CHARACTER_CONDITION_CREATE: 
        return update(state, {
          [action.id]: {conditions: {$push: [action.condition]}}
        })
      case MONSTERHEARTS_CHARACTER_CONDITION_DELETE:
        return update(state, {
          [action.id]: {
            conditions: (conditions) => conditions.filter(condition => condition !== action.condition)
          }
        })
      case MONSTERHEARTS_CHARACTER_ADVANCEMENT_CREATE: {
        const common = {
          advancements: {$push: [action.advancementId]},
          experience: {$set: 0}
        }
        switch (action.advancementId) {
          case "+stat":
            return update(state, {
              [action.id]: {
                mainCharacter: {
                  ...common,
                  addingStat: {$set: false},
                  [action.stat]: value => value + 1
                },
              }
            })
          case "any":
          case "self":
            return update(state, {
              [action.id]: {
                mainCharacter: {
                  ...common,
                  moves: {$push: [action.move]}
                }
              }
            })
          case "rtire":
            return update(state, {
              [action.id]: {
                mainCharacter: {
                  ...common,
                  isRetired: {$set: true}
                },
              }
            })
          default:
            return update(state, {
              [action.id]: {
                mainCharacter: common
              }
            })
        }
      } 
      case MONSTERHEARTS_CHARACTER_ADVANCEMENT_DELETE: {
        const common = {
          advancements: advancements => {
            const index = advancements.findIndex(id => id === action.advancementId);
            if (index >= 0) {
              return advancements
                .slice(0, index)
                .concat(advancements.slice(index + 1))
            }
            return state;
          }
        }
        switch(action.advancementId) {
          case "rtire":
            return update(state, {
              [action.id]: {
                mainCharacter: {
                  ...common,
                  isRetired: {$set: false}
                }
              }
            })
          default:
            return update(state, {
              [action.id]: {
                mainCharacter: common
              }
            })
        }
      }
      case MONSTERHEARTS_CHARACTER_ADVANCEMENT_STAT:
        return update(state, {
          [action.id]: {
            mainCharacter: {
              addingStat: {$set: true}
            }
          }
        })
      case MONSTERHEARTS_CHARACTER_ADVANCEMENT_STAT_CANCEL:
        return update(state, {
          [action.id]: {
            mainCharacter: {
              addingStat: {$set: false}
            }
          }
        })
      case MONSTERHEARTS_CHARACTER_MOVE_EDIT_NOTES:
        return update(state, {
          [action.id]: {
            mainCharacter: {moveNotesByName: {[action.name]: {$set: action.notes}}}
          }
        })
      default: return state;
    }
  },
  stringsById: (state = null, action) => {
    switch(action.type) {
      case MONSTERHEARTS_LOAD:
        return action.stringsById;
      case MONSTERHEARTS_STRING_ADD: {
        const string = state[action.id];
        return {
          ...state,
          [action.id]: {
            ...string,
            value: string.value + 1
          }
        }
      }
      case MONSTERHEARTS_STRING_SPEND: {
        const string = state[action.id];
        return {
          ...state,
          [action.id]: {
            ...string,
            value: string.value - 1
          }
        }
      }
      case MONSTERHEARTS_STRING_CREATE:
        return {
          ...state,
          [action.id]: {
            to: action.to,
            from: action.from,
            value: action.value
          }
        }
      default: return state;
    }
  },
  strings: (state = null, action) => {
    switch(action.type) {
      case MONSTERHEARTS_LOAD:
        return action.strings;
      case MONSTERHEARTS_STRING_CREATE:
        return [...state, action.id];
      default: return state;
    }
  },
  definitions: (state = null, action) => {
    switch(action.type) {
      case MONSTERHEARTS_LOAD:
        return action.definitions;
      default: return state;
    }
  }
})
